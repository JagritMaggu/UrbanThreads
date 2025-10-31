


const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart, getCart, updateCartQuantity } = require("../controllers/cart.js");
const  checkAuth = require("../middlewares/checkAuth.js");


router.post("/cart", checkAuth, addToCart);

router.delete("/cart/:productId", checkAuth, removeFromCart);

router.patch("/cart", checkAuth, updateCartQuantity)

router.get("/getcart", checkAuth, getCart);

module.exports = router;
