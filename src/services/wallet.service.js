const Wallet = require("../models/wallet.model");

const createWalletForUser = async ({ userId, currency = "NGN" }) => {
  const existingWallet = await Wallet.findOne({ user: userId });
  if (existingWallet) {
    const error = new Error("Wallet already exists for this user");
    error.statusCode = 409;
    throw error;
  }

  const wallet = await Wallet.create({
    user: userId,
    balance: 0,
    currency: String(currency).toUpperCase(),
  });

  return wallet;
};

const getWalletByUserId = async ({ userId }) => {
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    const error = new Error("Wallet not found");
    error.statusCode = 404;
    throw error;
  }

  return wallet.toPublicJSON();
};

const getWalletBalanceByUserId = async ({ userId }) => {
  const wallet = await Wallet.findOne({ user: userId }).select("balance currency");
  if (!wallet) {
    const error = new Error("Wallet not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    balance: wallet.balance,
    currency: wallet.currency,
  };
};

module.exports = {
  createWalletForUser,
  getWalletByUserId,
  getWalletBalanceByUserId,
};

