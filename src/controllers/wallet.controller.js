const walletService = require("../services/wallet.service");

const getWalletDetails = async (req, res) => {
  try {
    const wallet = await walletService.getWalletByUserId({ userId: req.user.id });
    return res.status(200).json({
      message: "Wallet fetched successfully",
      data: wallet,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch wallet",
    });
  }
};

const getWalletBalance = async (req, res) => {
  try {
    const balance = await walletService.getWalletBalanceByUserId({
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "Wallet balance fetched successfully",
      data: balance,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch wallet balance",
    });
  }
};

module.exports = {
  getWalletDetails,
  getWalletBalance,
};

