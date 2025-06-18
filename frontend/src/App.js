import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [cartoonImageUrl, setCartoonImageUrl] = useState(null);
  const [firework, setFirework] = useState(false);
  const [format, setFormat] = useState("png");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setCartoonImageUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    const response = await axios.post(
      ` http://127.0.0.1:8000/cartoon?format=${format}`, 
      formData, 
      {responseType: "blob",}
    );

    const cartoonBlob = new Blob([response.data], { type: `image/${format}` });
    const cartoonURL = URL.createObjectURL(cartoonBlob);
    setCartoonImageUrl(cartoonURL);

    // Show firework briefly
    setFirework(true);
    setTimeout(() => setFirework(false), 1500);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cartoonImageUrl;
    link.download = `cartoonified.${format}`;
    link.click();
  };

  return (
    
    <div className="app">
      {firework && <div className="firework"></div>}

      <div className="card title-card">
        <h2>🎨 Cartoonify Your Photo</h2>
        <img src={logo} alt="Logo" style={{ width: 300, height: 450}} />
      </div>

      <div className="card image-card">
        <h3>Original Image</h3>
        {originalImageUrl && <img src={originalImageUrl} alt="Original" />}
      </div>

      <div className="card image-card">
        <h3>Cartoon Image</h3>
        {cartoonImageUrl && (
          <>
            <img src={cartoonImageUrl} alt="Cartoon" />
            <div className="download-area">
              <select value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
              <button className="download-btn" onClick={handleDownload}>
                ⬇ Download
              </button>
            </div>
          </>
        )}
      </div>

      <div className="card action-card">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-btn" onClick={handleUpload} disabled={!selectedImage}>
          🚀 Upload & Cartoonify
        </button>
      </div>
    </div>
  );
}

export default App;

// npm start