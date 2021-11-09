const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.ObjectId,
    image: { type: String, required: true },
  },

  { versionKey: false }
);

export const Image = mongoose.model("images", imageSchema);
