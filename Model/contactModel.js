import mongoose, { Schema } from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("contact", contactSchema);
