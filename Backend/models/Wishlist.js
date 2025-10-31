
const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const wishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
});

const Wishlist = model("Wishlist", wishlistSchema);

  module.exports = {Wishlist};
