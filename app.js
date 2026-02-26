// app.js
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/wallet.routes");
const transactionRoutes = require("./routes/transaction.routes");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Digital Wallet API Running" });
});

module.exports = app;
