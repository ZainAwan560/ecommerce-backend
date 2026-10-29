const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Ye line add ki hai
const Product = require('../models/Product');

// 1. GET - Saare products database se laane ke liye (Website aur Admin dono ke liye)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
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
// 5. PUT - Product ko Update (Edit) karne ke liye
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // naya updated data wapas bhejne ke liye
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 3. DELETE - Product delete karne ke liye (Admin Dashboard ke liye)
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product delete ho gaya!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. GET - Ek Single Product fetch karne ke liye (Details page ke liye)
router.get('/:id', async (req, res) => {
  try {
    // Ye check karega ke ID MongoDB wali hai ya purani fake ID hai
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Invalid ID format' });
    }
    
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product nahi mila' });
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;