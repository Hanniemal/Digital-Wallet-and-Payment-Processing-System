const { randomUUID } = require("crypto");
const mongoose = require("mongoose");
const Wallet = require("../models/wallet.model");
const Transaction = require("../models/transaction.model");

const parseAmount = (amount) => {
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    const error = new Error("amount must be a number greater than 0");
    error.statusCode = 400;
    throw error;
  }
  return Number(parsed.toFixed(2));
};

const parsePositiveInt = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return null;
  }
  return parsed;
};

const runWithTransaction = async (handler) => {
  const session = await mongoose.startSession();
  try {
    let result;
    await session.withTransaction(async () => {
      result = await handler(session);
    });
    return result;
  } finally {
    await session.endSession();
  }
};

const deposit = async ({ userId, amount }) => {
  const parsedAmount = parseAmount(amount);

  return runWithTransaction(async (session) => {
    const wallet = await Wallet.findOne({ user: userId }).session(session);
    if (!wallet) {
      const error = new Error("Wallet not found");
      error.statusCode = 404;
      throw error;
    }

    wallet.balance += parsedAmount;
    await wallet.save({ session });

    const transaction = await Transaction.create(
      [
        {
          type: "deposit",
          amount: parsedAmount,
          fromWallet: null,
          toWallet: wallet._id,
          initiatedBy: userId,
          reference: `DEP-${Date.now()}-${randomUUID()}`,
        },
      ],
      { session },
    );

    return {
      transaction: transaction[0].toPublicJSON(),
      wallet: wallet.toPublicJSON(),
    };
  });
};

const withdraw = async ({ userId, amount }) => {
  const parsedAmount = parseAmount(amount);

  return runWithTransaction(async (session) => {
    const wallet = await Wallet.findOne({ user: userId }).session(session);
    if (!wallet) {
      const error = new Error("Wallet not found");
      error.statusCode = 404;
      throw error;
    }

    if (wallet.balance < parsedAmount) {
      const error = new Error("Insufficient wallet balance");
      error.statusCode = 400;
      throw error;
    }

    wallet.balance -= parsedAmount;
    await wallet.save({ session });

    const transaction = await Transaction.create(
      [
        {
          type: "withdraw",
          amount: parsedAmount,
          fromWallet: wallet._id,
          toWallet: null,
          initiatedBy: userId,
          reference: `WDR-${Date.now()}-${randomUUID()}`,
        },
      ],
      { session },
    );

    return {
      transaction: transaction[0].toPublicJSON(),
      wallet: wallet.toPublicJSON(),
    };
  });
};

const transfer = async ({ userId, toWalletId, amount }) => {
  const parsedAmount = parseAmount(amount);

  if (!mongoose.Types.ObjectId.isValid(toWalletId)) {
    const error = new Error("Invalid recipient wallet id");
    error.statusCode = 400;
    throw error;
  }

  return runWithTransaction(async (session) => {
    const senderWallet = await Wallet.findOne({ user: userId }).session(session);
    if (!senderWallet) {
      const error = new Error("Sender wallet not found");
      error.statusCode = 404;
      throw error;
    }

    if (senderWallet._id.toString() === toWalletId) {
      const error = new Error("Cannot transfer to the same wallet");
      error.statusCode = 400;
      throw error;
    }

    const recipientWallet = await Wallet.findById(toWalletId).session(session);
    if (!recipientWallet) {
      const error = new Error("Recipient wallet not found");
      error.statusCode = 404;
      throw error;
    }

    if (senderWallet.currency !== recipientWallet.currency) {
      const error = new Error("Wallet currency mismatch");
      error.statusCode = 400;
      throw error;
    }

    if (senderWallet.balance < parsedAmount) {
      const error = new Error("Insufficient wallet balance");
      error.statusCode = 400;
      throw error;
    }

    senderWallet.balance -= parsedAmount;
    recipientWallet.balance += parsedAmount;

    await senderWallet.save({ session });
    await recipientWallet.save({ session });

    const transaction = await Transaction.create(
      [
        {
          type: "transfer",
          amount: parsedAmount,
          fromWallet: senderWallet._id,
          toWallet: recipientWallet._id,
          initiatedBy: userId,
          reference: `TRF-${Date.now()}-${randomUUID()}`,
        },
      ],
      { session },
    );

    return {
      transaction: transaction[0].toPublicJSON(),
      senderWallet: senderWallet.toPublicJSON(),
      recipientWallet: recipientWallet.toPublicJSON(),
    };
  });
};

const getHistory = async ({ userId, page, limit }) => {
  const parsedPage = parsePositiveInt(page, 1);
  const parsedLimit = parsePositiveInt(limit, 20);

  if (!parsedPage || !parsedLimit) {
    const error = new Error("page and limit must be positive integers");
    error.statusCode = 400;
    throw error;
  }

  const wallet = await Wallet.findOne({ user: userId }).select("_id");
  if (!wallet) {
    const error = new Error("Wallet not found");
    error.statusCode = 404;
    throw error;
  }

  const filter = {
    $or: [{ fromWallet: wallet._id }, { toWallet: wallet._id }],
  };

  const skip = (parsedPage - 1) * parsedLimit;

  const [transactions, totalItems] = await Promise.all([
    Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit),
    Transaction.countDocuments(filter),
  ]);

  return {
    items: transactions.map((txn) => txn.toPublicJSON()),
    pagination: {
      page: parsedPage,
      limit: parsedLimit,
      totalItems,
      totalPages: Math.ceil(totalItems / parsedLimit) || 1,
    },
  };
};

module.exports = {
  deposit,
  withdraw,
  transfer,
  getHistory,
};

