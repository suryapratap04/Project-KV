const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  ratingCount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  otherImages: [
    {
      type: String,
    },
  ],
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  topSelling: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
