// services/imageService.js
const Image = require("../models/Image");
const mongoose = require("mongoose");

const uploadImage = async (data) => {
  const { image_hashed, image_name, image_description, image_root } = data;
  const newImage = new Image({
    image_hashed,
    image_name,
    image_description,
    image_root,
  });
  return await newImage.save();
};

const getImageById = async (id) => {
  const image = await Image.findById(id);
  if (!image) {
    throw new Error("Image not found");
  }
  const imageWithBase64 = {
    ...image._doc,
    image_data: image.image_data ? image.image_data.toString("base64") : null, // Check for null
  };
  return imageWithBase64;
};

const getAllImagesInRoot = async (root) => {
  return await Image.find();
};

const getAllImages = async () => {
  return await Image.find();
};

const deleteImage = async (id) => {
  const result = await Image.findByIdAndDelete(id);
  if (!result) {
    throw new Error("Image not found");
  }
  return result;
};

module.exports = {
  uploadImage,
  getImageById,
  getAllImagesInRoot,
  getAllImages,
  deleteImage,
};
