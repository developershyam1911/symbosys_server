import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },
    image: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("projects", projectSchema);
