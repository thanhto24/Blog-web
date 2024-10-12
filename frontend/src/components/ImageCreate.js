import React, { useState } from 'react';

const ImageCreate = ({
  isFormVisible,
  setIsFormVisible,
  handleRefreshImages,
}) => {
  const [image, setImage] = useState({
    image_name: '',
    image_description: '',
    image_file: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setImage({ ...image, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage({ ...image, image_file: file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const storedUser = localStorage.getItem('user');
    const userEmail = storedUser ? JSON.parse(storedUser).email : '';

    const formData = new FormData();
    formData.append('image', image.image_file);
    formData.append('image_name', image.image_name || image.image_file.name);
    formData.append(
      'image_description',
      image.image_description || image.image_file.name
    );
    formData.append('image_owner', userEmail); // Hardcoded user ID

    try {
      const response = await fetch('http://localhost:5000/images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      alert('Image uploaded successfully');
      setIsFormVisible(false); // Hide the form after successful upload
      handleRefreshImages(); // Call to refresh images
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      {/* Image upload form (hidden by default) */}
      {isFormVisible && (
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image Name
              </label>
              <input
                type="text"
                name="image_name"
                value={image.image_name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter image name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                name="image_description"
                value={image.image_description}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter image description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Your New Image
              </label>
              <input
                type="file"
                name="image_file"
                onChange={handleFileChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="rounded-md bg-green-500 px-4 py-2 text-white transition duration-200 hover:bg-green-600"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)} // Hide form on cancel
                className="rounded-md bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ImageCreate;
