const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const cartItem = new CartItem({ userId, productId, quantity });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    res.status(200).json({ message: 'Cart item removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
