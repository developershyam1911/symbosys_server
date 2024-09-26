import mongoose, { Schema } from "mongoose";

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("services", serviceSchema);
