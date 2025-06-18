from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import cv2
import numpy as np
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://localhost:3000", "http://192.168.0.4:3000", "https://cartoonifyapp.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def cartoonize(byte_image, format="jpeg"):
    file_bytes = np.asarray(bytearray(byte_image), dtype=np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Apply Gaussian blur to smooth the image
    blurred = cv2.GaussianBlur(img, (5, 5), 0)
    gray = cv2.cvtColor(blurred, cv2.COLOR_BGR2GRAY)
                          
    # Edge detection
    edges = cv2.Laplacian(gray, cv2.CV_8U, ksize=5)
    edges_inv = cv2.bitwise_not(edges)
    edges_color = cv2.cvtColor(edges_inv, cv2.COLOR_GRAY2RGB)

    # Combine rgb images and rgb colour edges
    cartoon = cv2.bitwise_and(img, edges_color)

    ext = f".{format}"
    success, encoded = cv2.imencode(ext, cartoon)
    if not success:
        raise RuntimeError("Encoding image failed")
    
    return io.BytesIO(encoded.tobytes())

@app.post("/cartoon")
async def cartoon_endpoints(
    file: UploadFile = File(...), 
    format: str = Query("jpeg", enum=["jpeg", "png", "webp"])
    ):

    image = await file.read()
    result = cartoonize(image, format)
    return StreamingResponse(result, media_type=f"image/{format}")

# uvicorn main:app --reload