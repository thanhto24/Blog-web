import React, { useState } from "react";

const ImageCreate = () => {
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
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="image_name"
            value={image.image_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="image_description"
            value={image.image_description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input type="file" name="image_file" onChange={handleFileChange} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageCreate;
