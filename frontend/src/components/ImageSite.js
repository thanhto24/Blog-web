import React, { useState, useEffect } from 'react';

const ImageSite = () => {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://localhost:5000/images', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h1>Uploaded Images</h1>
      {images.length > 0 ? (
        <ul>
          {images.map((image) => (
            <li key={image._id}>
              <h3>Name: {image.image_name || 'N/A'}</h3>
              <p>Description: {image.image_description || 'N/A'}</p>
              <img
                src={`data:image/jpeg;base64,${image.image_data}`} // Directly using the Base64 string
                alt={image.image_name}
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
};

export default ImageSite;
