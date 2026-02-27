const transactionService = require("../services/transaction.service");

const deposit = async (req, res) => {
  try {
    const result = await transactionService.deposit({
      userId: req.user.id,
      amount: req.body.amount,
    });

    return res.status(200).json({
      message: "Deposit successful",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Deposit failed",
    });
  }
};

const withdraw = async (req, res) => {
  try {
    const result = await transactionService.withdraw({
      userId: req.user.id,
      amount: req.body.amount,
    });

    return res.status(200).json({
      message: "Withdrawal successful",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Withdrawal failed",
    });
  }
};

const transfer = async (req, res) => {
  try {
    const result = await transactionService.transfer({
      userId: req.user.id,
      toWalletId: req.body.toWalletId,
      amount: req.body.amount,
    });

    return res.status(200).json({
      message: "Transfer successful",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Transfer failed",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const result = await transactionService.getHistory({
      userId: req.user.id,
      page: req.query.page,
      limit: req.query.limit,
    });

    return res.status(200).json({
      message: "Transaction history fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Failed to fetch transaction history",
    });
  }
};

module.exports = {
  deposit,
  withdraw,
  transfer,
  getHistory,
};

