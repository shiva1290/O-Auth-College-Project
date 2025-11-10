// Vercel serverless function entry point
const app = require('../server/index');
const { connectDB } = require('../server/index');

// Ensure MongoDB is connected before handling requests
let connectionPromise = null;

const handler = async (req, res) => {
  try {
    // Ensure connection is established (uses cached connection if available)
    if (!connectionPromise) {
      connectionPromise = connectDB();
    }
    await connectionPromise;
    
    // Handle the request
    return app(req, res);
  } catch (error) {
    console.error('❌ Serverless handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = handler;

