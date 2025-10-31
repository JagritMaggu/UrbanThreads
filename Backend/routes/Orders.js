const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders, deleteOrder } = require("../controllers/order.js");
const  checkAuth = require("../middlewares/checkAuth.js");

router.post("/orders", checkAuth, placeOrder);

router.get("/getOrders", checkAuth, getMyOrders);

router.delete("/orders/:id", checkAuth, deleteOrder);
module.exports = router;
