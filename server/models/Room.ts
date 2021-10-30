const mongoose = require("mongoose");
import { ObjectId } from "mongodb";

const RoomSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    quality: { type: String, required: true },
    photoId: { type: mongoose.Schema.ObjectId || null, ref: "Image" },
    roomNumber: { type: Number, required: true },
    reserved: { type: mongoose.Schema.ObjectId || null, ref: "User" },
  },
  { versionKey: false }
);

export const Room = mongoose.model("rooms", RoomSchema);
