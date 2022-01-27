const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

export const Token = mongoose.model("tokens", TokenSchema);
