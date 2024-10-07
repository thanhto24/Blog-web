const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    image_data: { type: Buffer, required: true }, // Store image as a buffer
    image_name: { type: String, required: true },
    image_description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
