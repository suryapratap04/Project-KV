const express = require("express");
const router = express.Router();

const { addToCart, removeFromCart, getCart } = require("../controller/Cart");

router.post("/add", addToCart);
router.delete("/remove", removeFromCart);
router.get("/getAll", getCart);

module.exports = router;
