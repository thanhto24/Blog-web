import React, { useState } from "react";

const ImageCreate = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Track form visibility
  const [image, setImage] = useState({
    image_name: "",
    image_description: "",
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
    const formData = new FormData();
    formData.append("image", image.image_file);
    formData.append("image_name", image.image_name || image.image_file.name);
    formData.append("image_description", image.image_description || image.image_file.name);

    try {
      const response = await fetch("http://localhost:5000/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      alert("Image uploaded successfully");
      setIsFormVisible(false); // Hide the form after successful upload
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      {/* Toggle button */}
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Upload New Image
        </button>
      )}

      {/* Image upload form (hidden by default) */}
      {isFormVisible && (
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image Name</label>
              <input
                type="text"
                name="image_name"
                value={image.image_name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter image name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="image_description"
                value={image.image_description}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter image description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                name="image_file"
                onChange={handleFileChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
                Upload
              </button>
              <button
                type="button"
                onClick={() => setIsFormVisible(false)} // Hide form on cancel
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
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
