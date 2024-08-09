const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, total } = req.body;
    const order = new Order({ userId, items, total });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get orders for a user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.query.userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};