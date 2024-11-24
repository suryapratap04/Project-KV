const Product = require("../models/Product");
const uploadImageToCloudinary = require("../utils/upload");
require("dotenv").config();


exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, discount, category } = req.body;
    const image = req.file.image;
    const Image = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
    const product = await Product.create({
      title,
      description,
      price,
      image: Image.secure_url,
      discount,
      category,
    });
    return res.status(200).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot create product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const { title, description, price, image, discount, category, topSelling } =
      req.body;
    const product = await Product.findById(prodId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        title,
        description,
        price,
        image,
        discount,
        category,
        topSelling,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot update product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete product",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({
      success: true,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get products",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot get product",
    });
  }
};
