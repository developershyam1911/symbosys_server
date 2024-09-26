import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
// import authonticate from "../middlewares/authonticate.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
} from "../Controllers/blogController.js";
const blogRoute = express.Router();

blogRoute.post(
  "/",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createBlog
);
blogRoute.patch(
  "/:blogId",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateBlog
);
blogRoute.delete(
  "/:blogId",
  // authonticate,
  deleteBlog
);
blogRoute.get("/", getBlogs);
blogRoute.get("/:blogId", getSingleBlog);

export default blogRoute;
