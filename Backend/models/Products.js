const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: ["apparel", "footwear"],
        default: "apparel"
    }
})

const Product = model("Product", productSchema);

module.exports = { Product };
