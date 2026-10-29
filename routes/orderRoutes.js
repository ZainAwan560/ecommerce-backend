const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. POST - Naya order E-commerce website se database mein save karne ke liye
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET - Admin Dashboard ke liye saare orders fetch karne ke liye
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Naye orders top par aayenge
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
