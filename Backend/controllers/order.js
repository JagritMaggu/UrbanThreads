const {Order} = require("../models/Order");
const {Cart} = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { paymentMethod } = req.body;
   
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await Order.create({
      user: userId,
      items: orderItems,
      totalAmount:total,
      paymentMethod
    });

    await Cart.deleteOne({ user: userId });

    res.json({ message: "Order placed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


    const deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.id;

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Prevent deleting after shipped/delivered
    if (order.orderStatus === "SHIPPED" || order.orderStatus === "DELIVERED") {
      return res.status(400).json({ message: "Cannot delete delivered/shipped order" });
    }

    await Order.deleteOne({ _id: orderId });

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { placeOrder, getMyOrders, deleteOrder };
