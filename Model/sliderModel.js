import mongoose from "mongoose";

const sliderSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Slider = mongoose.model("slider_content", sliderSchema);
