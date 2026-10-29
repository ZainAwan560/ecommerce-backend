const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use('/uploads', express.static('uploads'));

// Serverless MongoDB Connection Handler (For Vercel)
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://zahafay987_db_user:1juej0lMlaPiefnB@cluster0.22lwlk2.mongodb.net/';
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log('MongoDB se connection successful ho gaya! ✅');
  } catch (err) {
    console.log('MongoDB connection error ❌:', err);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// Basic Route (Check karne ke liye)
app.get('/', (req, res) => {
  res.send('E-commerce Backend Server Chal Raha Hai! 🚀 (Vercel Ready)');
});

// Server Start (Local development ke liye)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server port ${PORT} par chal raha hai! 🌐`);
  });
}

// Vercel serverless ke liye export
module.exports = app;
