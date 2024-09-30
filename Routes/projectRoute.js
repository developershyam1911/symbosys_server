import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
import {
  createProject,
  deleteProject,
  getProjects,
  getsingleProject,
  updateProject,
} from "../Controllers/projectController.js";
// import authonticate from "../middlewares/authonticate.js";
const projectRoute = express.Router();

projectRoute.post(
  "/",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createProject
);
projectRoute.patch(
  "/:project_id",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProject
);
projectRoute.delete(
  "/:project_id",
  // authonticate,
  deleteProject
);
projectRoute.get("/", getProjects);
projectRoute.get("/:project_id", getsingleProject);

export default projectRoute;
