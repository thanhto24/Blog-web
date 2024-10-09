import React, { useState, useEffect } from 'react';
import { showPopup } from './Popup'; // Import the showPopup function

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
      showPopup('Failed to fetch images.', 'fail');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCopyUrl = (id) => {
    const url = `http://localhost:5000/images/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        // Show success message using the showPopup function
        showPopup('URL copied to clipboard!', 'success');
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
        // Show error message using the showPopup function
        showPopup('Failed to copy URL.', 'fail');
      });
  };

  return (
    <div className="relative bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="rounded-md bg-white p-4 shadow">
              <img
                src={`http://localhost:5000/images/${image._id}`}
                alt={image.image_name}
                className="h-30 w-full cursor-pointer rounded object-cover"
                onClick={() => handleCopyUrl(image._id)}
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-700">
                {image.image_name || 'N/A'}
              </h3>
              <p className="text-xs text-gray-500">
                {image.image_description || 'No description'}
              </p>
              <button
                onClick={() => handleCopyUrl(image._id)}
                className="mt-2 w-full rounded bg-blue-500 px-2 py-1 text-xs text-white transition duration-200 hover:bg-blue-600"
              >
                Copy URL
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images found</p>
        )}
      </div>
    </div>
  );
};

export default ImageSite;
