import cv2
import numpy as np
import tensorflow as tf

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

cap = cv2.VideoCapture(0)  # 0 = default webcam

while True:
    ret, frame = cap.read()
    if not ret:
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        roi = frame[y:y+h, x:x+w]   # crop face
        roi_resized = cv2.resize(roi, IMG_SIZE)  # resize
        roi_normalized = roi_resized.astype("float32") / 255.0
        roi_expanded = np.expand_dims(roi_normalized, axis=0)  # (1,224,224,3)

        # Predict emotion
        preds = model.predict(roi_expanded)
        emotion_index = np.argmax(preds[0])
        emotion_label = class_names[emotion_index]

        # Draw rectangle & label
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(frame, emotion_label, (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    cv2.imshow("Emotion Detection", frame)

    # Press 'q' to quit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release() 
cv2.destroyAllWindows()
