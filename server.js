// server.js
require("dotenv").config();
const app = require("./app");
const { initDb } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await initDb();
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to Supabase Postgres:", err.message);
    process.exit(1);
  }
};

startServer();
