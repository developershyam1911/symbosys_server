import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
import {
  createresource,
  deleteresource,
  getresources,
  getsingleresource,
  updateresource,
} from "../Controllers/resouceController.js";
// import authonticate from "../middlewares/authonticate.js";
const resourceRoute = express.Router();

resourceRoute.post(
  "/",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createresource
);
resourceRoute.patch(
  "/:resource_id",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateresource
);
resourceRoute.delete(
  "/:resource_id",
  // authonticate,
  deleteresource
);
resourceRoute.get("/", getresources);
resourceRoute.get("/:resource_id", getsingleresource);

export default resourceRoute;
