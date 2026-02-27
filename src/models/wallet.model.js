const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    balance: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "NGN",
      uppercase: true,
      trim: true,
      maxlength: 3,
    },
  },
  {
    timestamps: true,
  },
);

walletSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    userId: this.user,
    balance: this.balance,
    currency: this.currency,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("Wallet", walletSchema);

