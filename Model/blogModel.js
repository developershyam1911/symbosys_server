import mongoose from "mongoose";

// default: 'Untitled'
// index: true
// enum: ['Option1', 'Option2', 'Option3']
// minlength: 5,
//     maxlength: 100
//     match: /^[a-zA-Z0-9 ]*$/
//     lowercase: true
//     trim: true

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "title is required"],
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    blog_category: {
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

export const Blog = mongoose.model("blog", blogSchema);
