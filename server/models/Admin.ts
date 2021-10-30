const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    appointment: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { versionKey: false }
);

export const Admin = mongoose.model("admins", AdminSchema);
