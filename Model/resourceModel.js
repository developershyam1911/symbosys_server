import mongoose from "mongoose";

const resourceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    mobno: {
      type: String,
      required: [true, "mobno is required"],
    },
    tech: {
      type: String,
      required: [true, "tech is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Resource = mongoose.model("resources", resourceSchema);
