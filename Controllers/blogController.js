import createHttpError from "http-errors";
import { Blog } from "../Model/blogModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import convertToLSlug from "../utils/genrateSlug.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
const createBlog = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const imageLocalpath = req.files.image[0].path;
  if (!imageLocalpath) {
    return next(createHttpError(400, "image is required"));
  }
  const blogSlug = await convertToLSlug(title);
  const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const blog = await Blog.create({
      title,
      description,
      image: image.url,
      slug: blogSlug,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, blog, "Blog is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "Blog Add Error"));
  }
};

const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const blogId = req.params.blogId;
  if (!blogId) {
    return next(createHttpError(400, "Blog Id is missing"));
  }
  const singleBlog = await Blog.findOne({ _id: blogId });
  if (!singleBlog) {
    return next(createHttpError(400, "Single Blog is not getting"));
  }
  let imageUrl = singleBlog.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      return next(createHttpError(400, "image is required"));
    }
    if (singleBlog.image) {
      const oldFilePublicId = singleBlog.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(oldFilePublicId);
    }
    const image = await uploadOnCloudinary(imageLocalpath);
    if (!image.url) {
      return next(
        createHttpError(400, "Error while uploading image to Cloudinary")
      );
    }
    imageUrl = image.url;
  }
  const updatedSlug = convertToLSlug(title);
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId },
      {
        title,
        description,
        image: imageUrl,
        slug: updatedSlug,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, updatedBlog, "Blog is Updated Successfully"));
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "Blog Update Error"));
  }
};
const getBlogs = async (req, res, next) => {
  try {
    const allBlogs = await Blog.find();
    if (!allBlogs) {
      return next(createHttpError(400, "All Blog is not getting"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, allBlogs, "All Blog getting successfully"));
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "all Blog not getting"));
  }
};
const getSingleBlog = async (req, res, next) => {
  const blogId = req.params.blogId;
  try {
    const singleBlog = await Blog.findOne({ _id: blogId });
    if (!singleBlog) {
      return next(createHttpError(400, "single Blog is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleBlog, "single Blog getting successfully")
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "single Blog not getting"));
  }
};
const deleteBlog = async (req, res, next) => {
  const blogId = req.params.blogId;
  try {
    const singleBlog = await Blog.findOne({ _id: blogId });
    if (!singleBlog) {
      return next(createHttpError(404, "single Blog not getting"));
    }
    await Blog.deleteOne({ _id: blogId });
    //file delete on cloudinary
    const filePublicId = singleBlog.image.split("/").pop().split(".")[0];
    console.log("image public id", filePublicId);
    await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(new ApiResponse(200, blogId, "single Blog deleted successfully"));
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Blog delted error"));
  }
};

export { createBlog, updateBlog, getBlogs, getSingleBlog, deleteBlog };
