const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectionString = process.env.MONGODB_URI;

if (!connectionString) {
  throw new Error("MONGODB_URI is not set in the environment");
}

const initDb = async () => {
  await mongoose.connect(connectionString);
  logger.info("MongoDB connection established");
};

module.exports = {
  mongoose,
  initDb,
};

