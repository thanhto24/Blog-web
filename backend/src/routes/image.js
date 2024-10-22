const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image");

// // Create a image
// router.post('/', imageController.uploadImage);

const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const Image = require("../models/Image");

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({
      image_data: req.file.buffer, // Save the buffer data
      image_name: req.body.image_name,
      image_description: req.body.image_description,
      image_owner: req.body.image_owner,
    });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to retrieve all images
router.get("/", async (req, res) => {
  const image_owner = req.query.image_owner;
  // console.log("image_owner", image_owner);
  try {
    const images = await Image.find({ image_owner: image_owner });

    // Map over images and convert binary data to Base64
    const imagesWithBase64 = images.map((image) => ({
      ...image._doc,
      image_data: image.image_data ? image.image_data.toString("base64") : null, // Check for null
    }));

    res.json(imagesWithBase64);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image || !image.image_data) {
      return res.status(404).send("Image not found");
    }

    // Thiết lập tiêu đề để chỉ định kiểu dữ liệu
    res.set("Content-Type", "image/jpeg"); // Hoặc kiểu dữ liệu tương ứng
    res.send(image.image_data); // Gửi dữ liệu hình ảnh trực tiếp
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete a image
router.delete("/:id", imageController.deleteImage);

module.exports = router;
