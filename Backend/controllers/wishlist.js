const {Wishlist} = require("../models/Wishlist");

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    await Wishlist.updateOne(
      { user: userId },
      { $addToSet: {  products:productId } },
      { upsert: true }
    );

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    await Wishlist.updateOne(
      { user: userId },
      { $pull: { products: productId } }
    );

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
  .populate("products", "name price image _id");

res.json({
  items: wishlist?.products || []
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addToWishlist, removeFromWishlist, getWishlist };
