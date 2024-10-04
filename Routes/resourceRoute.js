// import express from "express";
// import { upload } from "../middlewares/multerMiddlware.js";
// import {
//   createresource,
//   deleteresource,
//   getresources,
//   getsingleresource,
//   updateresource,
// } from "../Controllers/resouceController.js";
// // import authonticate from "../middlewares/authonticate.js";
// const resourceRoute = express.Router();

// resourceRoute.post(
//   "/",
//   // authonticate,
//   upload.fields([{ name: "image", maxCount: 1 }]),
//   createresource
// );
// resourceRoute.patch(
//   "/:resource_id",
//   // authonticate,
//   upload.fields([{ name: "image", maxCount: 1 }]),
//   updateresource
// );
// resourceRoute.delete(
//   "/:resource_id",
//   // authonticate,
//   deleteresource
// );
// resourceRoute.get("/", getresources);
// resourceRoute.get("/:resource_id", getsingleresource);

// export default resourceRoute;

import express from "express";
import { upload } from "../middlewares/multerMiddlware.js"; // Image upload middleware
// Zip file upload middleware
import {
  createresource,
  deleteresource,
  getresources,
  getsingleresource,
  updateresource,
} from "../Controllers/resouceController.js";
import { uploadZip } from "../middlewares/zipStorage.js";
const resourceRoute = express.Router();

// Route for image uploads
resourceRoute.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createresource
);

// Route for ZIP file uploads
resourceRoute.post(
  "/upload-zip",
  uploadZip.single("zipfile"), // Middleware for uploading a single ZIP file
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "ZIP file is required" });
      }
      return res
        .status(200)
        .json({ message: "ZIP file uploaded successfully", file });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error uploading ZIP file" });
    }
  }
);

// Other routes
resourceRoute.patch(
  "/:resource_id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateresource
);
resourceRoute.delete("/:resource_id", deleteresource);
resourceRoute.get("/", getresources);
resourceRoute.get("/:resource_id", getsingleresource);

export default resourceRoute;
