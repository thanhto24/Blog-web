const imageService = require("../services/image");

const uploadImage = async (req, res) => {
  try {
    const image = await imageService.uploadImage(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const image = await imageService.getImageById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const image = await imageService.deleteImage(req.params.id);
    res.status(200).json(image);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getAllImagesInRoot = async (req, res) => {
  try {
    const images = await imageService.getAllImagesInRoot(req.params.root);
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  uploadImage,
  getImageById,
  getAllImages,
  deleteImage,
  getAllImagesInRoot,
};
