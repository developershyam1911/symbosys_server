import mongoose, { Schema } from "mongoose";

const careerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Career = mongoose.model("career", careerSchema);
