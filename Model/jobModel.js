import mongoose, { Schema } from "mongoose";
const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
      required: true,
    },
    jobtitle: {
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

export const Job = mongoose.model("job", jobSchema);
