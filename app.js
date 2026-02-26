// app.js
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Digital Wallet API Running" });
});

module.exports = app;