const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// 1. GET - Saare products database se laane ke liye (Website aur Admin dono ke liye)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. POST - Naya product add karne ke liye (Admin Dashboard ke liye)
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. PUT - Product ko Update (Edit) karne ke liye
router.put('/:id', async (req, res) => {
  try {
    let query = { _id: req.params.id };
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      query = { image: `cloth${req.params.id}` };
    }
    const updatedProduct = await Product.findOneAndUpdate(
      query, 
      req.body, 
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. DELETE - Product delete karne ke liye (Admin Dashboard ke liye)
router.delete('/:id', async (req, res) => {
  try {
    let query = { _id: req.params.id };
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      query = { image: `cloth${req.params.id}` };
    }
    await Product.findOneAndDelete(query);
    res.json({ message: 'Product delete ho gaya!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. GET - Ek Single Product fetch karne ke liye (Details page ke liye)
router.get('/:id', async (req, res) => {
  try {
    let product = null;
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      product = await Product.findById(req.params.id);
    }
    if (!product) {
      product = await Product.findOne({ image: `cloth${req.params.id}` });
    }
    if (!product) {
      const numericId = parseInt(req.params.id, 10);
      if (!isNaN(numericId) && numericId > 0) {
        const all = await Product.find().limit(numericId);
        if (all.length >= numericId) {
          product = all[numericId - 1];
        }
      }
    }
    if (!product) return res.status(404).json({ message: 'Product nahi mila' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
