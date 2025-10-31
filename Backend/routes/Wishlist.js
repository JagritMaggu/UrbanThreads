const express = require("express");
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlist.js");
const  checkAuth = require("../middlewares/checkAuth.js");

router.post("/wishlist", checkAuth, addToWishlist);


router.delete("/wishlist/:productId", checkAuth, removeFromWishlist);


router.get("/getWishlist",  checkAuth, getWishlist);

module.exports = router;
