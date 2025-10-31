const { Cart } = require("../models/Cart");
const { Product } = require("../models/Products");

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const item = cart.items.find(
        (i) => i.product.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    await Cart.updateOne(
      { user: userId, "items.product": productId },
      { $set: { "items.$.quantity": quantity } }
    );

    res.json({ message: "Quantity updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    await Cart.updateOne(
      { user: userId },
      { $pull: { items: { product: productId } } }
    );

    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    const total = cart.items.reduce(
      (sum, i) => sum + i.product.price * i.quantity,
      0
    );

    res.json({ items: cart.items, total });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addToCart, removeFromCart, getCart, updateCartQuantity };
