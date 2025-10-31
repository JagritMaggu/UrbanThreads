const express = require("express");
const router = express.Router();
const {Product} = require("../models/Products")

router.get("/products", async(req, res)=>{
    try {
        const products = await Product.find()
         res.json(products)
    } catch (error) {
         res.status(400).json({message:error.message});
        
    }
})

module.exports = router