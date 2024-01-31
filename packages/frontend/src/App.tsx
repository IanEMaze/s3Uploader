import React, { useState } from 'react';
import './App.css';

function App() {
  const API_URL = import.meta.env.VITE_API_URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [response, setresponse] = useState<string | ''>('');
  const [textColor, setTextColor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setresponse('');
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    // Display the selected image
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  const getLoadingImgStyle = (isLoading: boolean) => {
    return {
      display: isLoading ? 'block' : 'none',
      width: '30px',
      margin: '0 auto',
    };
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setTextColor('red');
      setresponse('Please select a file.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);

    // Extract filename from the selected file
    const filename = selectedFile.name;

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          // Pass the filename as a custom header
          'X-Filename': filename,
        },
      });

      if (response.ok) {
        setLoading(false);
        setTextColor('#3FF96F');
        setresponse('Image uploaded successfully!');
        setImageUrl(null);
      } else {
        setLoading(false);
        setTextColor('red');
        setresponse('Failed to upload file.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      setTextColor('red');
      setresponse('An error occurred while uploading the file.');
    }
  };

  return (
    <>
      
      <h1>S3 Image Uploader</h1>
        <div id='main-content'>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
        <div>
          <img id='loading-img' src='./img/loading.gif' style={getLoadingImgStyle(loading)}></img>
          {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '500px',margin:'10px', borderRadius: '2%', border: '2px solid white' }} />}
        </div>
        <br></br>
        <p id="resultText" style={{ color: textColor }}>{response}</p>
      </div>
    </>
  );
}

export default App;
