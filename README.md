# 🎨 Cartoon Filter Web App

A simple yet stylish web application that transforms your photos into cartoon-style images using computer vision techniques.

![Cartoon Demo](./assets/logo.png)

## ✨ Features

- 📷 Upload your own photo  
- 🌀 Applies **Gaussian blur + edge detection** to cartoonify images  
- 🎇 Firework animation on result generation  
- 🌫️ Glassmorphism UI with smooth interactions  
- 📥 Download cartoon image in **PNG / JPEG / WEBP**

## 🛠️ Tech Stack

| Frontend     | Backend    | Others         |
|--------------|------------|----------------|
| React        | FastAPI    | OpenCV (cv2)   |
| Axios        | Python     | CSS Animations |

## 🚀 How to Run the Project

```bash
# 1. Clone the project and navigate inside
git clone https://github.com/your-repo/cartoon-app.git
cd cartoon-app

# 2. Start the backend
cd backend
pip install fastapi uvicorn opencv-python python-multipart
uvicorn main:app --reload

# 3. Open a new terminal for frontend (same root folder)
cd ../frontend
npm install
npm start
