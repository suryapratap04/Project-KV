const express = require("express");
const router = express.Router();

const { createOrder, getOrder, updateOrder } = require("../controller/Orders");

router.post("/create", createOrder);
router.get("/get", getOrder);
router.put("/update/:id", updateOrder);

module.exports = router;
