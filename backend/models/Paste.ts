import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      maxlength: 100000,
    },

    language: {
      type: String,
      default: "text",
    },

    expiresAt: {
      type: Date,
      default: null,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

pasteSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const Paste = mongoose.model("Paste", pasteSchema);

export default Paste;