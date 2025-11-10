// Vercel serverless function entry point
const app = require('../server/index');

// Export as serverless function handler
module.exports = (req, res) => {
  return app(req, res);
};

