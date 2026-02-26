// app.js
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Digital Wallet API Running" });
});

module.exports = app;
