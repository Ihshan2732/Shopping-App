const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);
