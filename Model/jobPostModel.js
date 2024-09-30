import mongoose, { Schema } from "mongoose";
const JobPostScheam = mongoose.Schema(
  {
    degination: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    pepol: {
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

export const JobPost = mongoose.model("jobPost", JobPostScheam);
