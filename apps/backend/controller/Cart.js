const Cart = require("../models/Cart");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId });
    }
    const { productId } = req.body;
    cart.products.push(productId);
    await cart.save();
    return res.status(200).json({
      success: true,
      data: cart,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot add product to cart",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const cart = await Cart.findOne({ user: userId }).populate("products");
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: cart,
      message: "Cart fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch cart",
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const { productId } = req.body;
    cart.products = cart.products.filter((product) => product != productId);
    await cart.save();
    return res.status(200).json({
      success: true,
      data: cart,
      message: "Remove From Cart successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot remove product from cart",
    });
  }
};
