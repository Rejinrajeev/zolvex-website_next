const app = require("../server/src/app");
const { connectDB } = require("../server/src/database/connect");

module.exports = async (req, res) => {
  // Ensure DB connection is initialized
  await connectDB();
  return app(req, res);
};
