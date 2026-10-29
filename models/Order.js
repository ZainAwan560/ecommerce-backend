const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.Mixed,
  productId: mongoose.Schema.Types.Mixed,
  name: String,
  price: Number,
  quantity: Number,
  color: String,
  size: String,
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: { type: String, default: "+92 300 1234567" },
  address: { type: String, default: "Karachi, Pakistan" },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
