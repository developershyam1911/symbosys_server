import mongoose, { Schema } from "mongoose";

const aboutSchema = mongoose.Schema(
  {
    main_about: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
    },
    vision: {
      type: String,
      required: true,
    },
    core_value: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const About = mongoose.model("about", aboutSchema);
