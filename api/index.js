// Vercel serverless function entry point
const mongoose = require('mongoose');
const app = require('../server/index');

// Export as serverless function handler
module.exports = async (req, res) => {
  // Ensure MongoDB is connected before handling request
  try {
    if (mongoose.connection.readyState !== 1) {
      // Connect to MongoDB if not already connected
      const config = require('../server/config/environment').config;
      await mongoose.connect(config.database.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB connected in serverless function');
    }
    
    // Handle the request with Express
    return app(req, res);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    res.status(500).json({ 
      error: 'Database connection failed', 
      message: error.message 
    });
  }
};

