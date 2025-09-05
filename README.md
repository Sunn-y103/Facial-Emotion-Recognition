# Emotion Detection using Deep Learning 🎭

A deep learning–based **real-time emotion detection system** built with **TensorFlow, OpenCV, NumPy, and Flask**.  
It can detect human emotions from webcam video and display the predicted label live on screen or through a web interface.

---

## 📂 Project Structure
.
├── app.py # Flask app for running emotion detection in browser
├── predict.py # Standalone script for real-time webcam prediction
├── train.py # Training script for CNN model
├── requirements.txt # Dependencies
├── templates/
│ └── index.html # Frontend for Flask app
└── .gitignore

## ✨ Features
- Real-time face detection using OpenCV Haar Cascade  
- Emotion classification into 7 categories:
  - Surprise  
  - Fear  
  - Disgust  
  - Happiness  
  - Sadness  
  - Anger  
  - Neutral
- Two ways to run predictions:
  - **Flask Web App** (`app.py`) → view results in browser  
  - **Standalone Script** (`predict.py`) → view results in OpenCV window  

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
2. Create and activate a virtual environment (recommended):
   python -m venv venv
   source venv/bin/activate    # Linux/Mac
   venv\Scripts\activate       # Windows
3. Install Dependencies:
   pip install -r requirements.txt

📥 Download Pre-trained Model

Since the trained model (emotion_model.h5) is larger than 100MB, it is not included in this repo.
👉 You can download the pre-trained model here:
https://huggingface.co/Sunny6727/facialmodel1/resolve/main/emotion_model.h5

After downloading, place the file in the project root folder: 
emotion_model.h5

🎥 Running Predictions
Option 1: Flask Web App
Run this command:
python app.py
-Open your browser at http://127.0.0.1:5000/
-You’ll see live webcam predictions streamed via Flask.

Option 2: Standalone Script
Run this command on terminal:
python predict.py
-An OpenCV window will open.
-Press q to quit.

🏋️ Training Your Own Model (Optional)
If you want to train the model yourself:
1. Prepare your dataset in the following structure:
   DATASET/
├── train/
│   ├── 1/  # Surprise
│   ├── 2/  # Fear
│   ├── 3/  # Disgust
│   ├── 4/  # Happiness
│   ├── 5/  # Sadness
│   ├── 6/  # Anger
│   └── 7/  # Neutral
└── test/
    ├── 1/
    ├── 2/
    ...
2. Run:
   -python train.py
3. The trained model will be saved as:
   -emotion_model.h5

📦 Requirements
See requirements.txt for dependencies.
Main libraries:
Flask
TensorFlow
NumPy
OpenCV

🚀 Future Improvements
-Add support for multiple faces simultaneously
-Deploy on cloud (Render, Heroku, etc.)
-Improve accuracy with transfer learning (e.g., MobileNet, ResNet)
