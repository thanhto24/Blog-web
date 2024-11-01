import React, { useState, useEffect } from 'react';
import { showPopup } from './Popup'; // Import the showPopup function

const ImageSite = ({ refreshImages }) => {
  const [images, setImages] = useState([]);
  const storedUser = localStorage.getItem('user');
  const userEmail = storedUser ? JSON.parse(storedUser).email : '';

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://my-blog-be.onrender.com/images?image_owner=${userEmail}`, {
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

  // Call fetchImages when component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Call fetchImages when refreshImages is triggered
  useEffect(() => {
    if (refreshImages) {
      fetchImages();
    }
  }, [refreshImages]);

  const handleCopyUrl = (id) => {
    const url = `https://my-blog-be.onrender.com/images/${id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        showPopup('URL copied to clipboard!', 'success');
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
        showPopup('Failed to copy URL.', 'fail');
      });
  };

  return (
    <div className="relative bg-gray-100 p-4">
      <div className="grid grid-cols-1 gap-4">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image._id}
              className="overflow-hidden rounded-md bg-white p-4 shadow"
            >
              <img
                src={`https://my-blog-be.onrender.com/images/${image._id}`}
                alt={image.image_name + '. This image created by ' + image.image_owner}
                className="mb-2 h-20 w-full cursor-pointer rounded object-cover" // Set a consistent height
                onClick={() => handleCopyUrl(image._id)}
              />
              <h3 className="mt-2 text-sm font-semibold text-gray-700">
                {image.image_name || 'N/A'}
              </h3>
              <p className="truncate text-xs text-gray-500">
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
