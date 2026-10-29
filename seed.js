const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const dummyProducts = [
  { 
    name: "T-shirt with Tape Details", price: 120, rating: 4.5, 
    image: "cloth1", category: "T-shirts", colors: ["black", "white"], sizes: ["Small", "Medium", "Large"], stock: 25 
  },
  { 
    name: "Skinny Fit Jeans", price: 240, oldPrice: 260, discount: 20, rating: 3.5, 
    image: "cloth2", category: "Jeans", colors: ["blue", "black"], sizes: ["Large"], stock: 15 
  },
  { 
    name: "Checkered Shirt", price: 180, rating: 4.5, 
    image: "cloth3", category: "Shirts", colors: ["red", "blue"], sizes: ["Medium", "Large"], stock: 12 
  },
  { 
    name: "Sleeve Striped T-shirt", price: 130, oldPrice: 160, discount: 30, rating: 4.5, 
    image: "cloth4", category: "T-shirts", colors: ["orange", "black"], sizes: ["Small", "Large"], stock: 18 
  },
  { 
    name: "Vertical Striped Shirt", price: 212, oldPrice: 232, discount: 20, rating: 5.0, 
    image: "cloth5", category: "Shirts", colors: ["green", "white"], sizes: ["Small", "Medium", "Large"], stock: 10 
  },
  { 
    name: "Courage Graphic T-shirt", price: 145, rating: 4.0, 
    image: "cloth6", category: "T-shirts", colors: ["orange", "black"], sizes: ["Medium", "Large"], stock: 20 
  },
  { 
    name: "Loose Fit Bermuda Shorts", price: 80, rating: 3.0, 
    image: "cloth7", category: "Shorts", colors: ["blue", "grey"], sizes: ["Medium", "Large"], stock: 14 
  },
  { 
    name: "Faded Skinny Jeans", price: 210, rating: 4.5, 
    image: "cloth8", category: "Jeans", colors: ["black", "blue"], sizes: ["Large", "X-Large"], stock: 16 
  },
  { 
    name: "Gradient Graphic T-shirt", price: 145, rating: 3.5, 
    image: "cloth9", category: "T-shirts", colors: ["green", "brown"], sizes: ["Small", "Large"], stock: 15 
  },
  { 
    name: "Polo with Contrast Trims", price: 135, rating: 4.0, 
    image: "cloth10", category: "T-shirts", colors: ["blue", "white"], sizes: ["Medium", "Large"], stock: 22 
  },
  { 
    name: "Club T-shirt", price: 110, rating: 4.5, 
    image: "cloth11", category: "T-shirts", colors: ["black", "grey"], sizes: ["Small", "Medium"], stock: 19 
  },
  { 
    name: "Black Striped T-shirt", price: 120, oldPrice: 150, discount: 30, rating: 5.0, 
    image: "cloth12", category: "T-shirts", colors: ["navy", "black"], sizes: ["Medium", "X-Large"], stock: 20 
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Database connected! Purana data saaf ho raha hai...');
    await Product.deleteMany({});
    
    console.log('Naye 12 Products insert ho rahe hain...');
    await Product.insertMany(dummyProducts);
    
    console.log('Data successfully upload ho gaya! 🎉 (12 products created)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
