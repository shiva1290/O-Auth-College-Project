// Vercel serverless function entry point
const app = require('../server/index');

// Export as serverless function handler
module.exports = async (req, res) => {
  // Handle the request with Express
  return app(req, res);
};

