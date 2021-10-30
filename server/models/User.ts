const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { versionKey: false }
);

export const User = mongoose.model("users", UserSchema);
