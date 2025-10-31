const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
});

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [orderItemSchema],

  totalAmount: {
    type: Number,
    required: true
  },




  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD"
  },

  orderStatus: {
    type: String,
    enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
    default: "PENDING"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Order = model("Order", orderSchema);
module.exports = {Order}
