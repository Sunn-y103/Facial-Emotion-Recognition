from flask import Flask, render_template, Response
import cv2
import numpy as np
import tensorflow as tf

app = Flask(__name__)

model = tf.keras.models.load_model("emotion_model.h5")

class_names = {
    0: "Surprise",
    1: "Fear",
    2: "Disgust",
    3: "Happiness",
    4: "Sadness",
    5: "Anger",
    6: "Neutral"
}

IMG_SIZE = (224, 224)

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
cap = cv2.VideoCapture(0)  # default webcam


def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            roi = frame[y:y+h, x:x+w]
            roi_resized = cv2.resize(roi, IMG_SIZE)
            roi_normalized = roi_resized.astype("float32") / 255.0
            roi_expanded = np.expand_dims(roi_normalized, axis=0)

            preds = model.predict(roi_expanded)
            emotion_index = np.argmax(preds[0])
            emotion_label = class_names[emotion_index]

            # Draw rectangle around face (optional, minimal)
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

            # Draw emotion label above the face
            label_y = y - 10 if y - 10 > 10 else y + 10
            cv2.putText(frame, emotion_label, (x, label_y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

        # Encode frame to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    app.run(debug=True)
