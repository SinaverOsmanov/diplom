const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    accessToken: { type: String, required: true },
  },
  { versionKey: false }
);

export const Token = mongoose.model("tokens", TokenSchema);
