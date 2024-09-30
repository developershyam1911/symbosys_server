import express from "express";
import { upload } from "../middlewares/multerMiddlware.js";
import {
  createSlider,
  deleteSlider,
  getSingleSlider,
  getSliders,
  updateSlider,
} from "../Controllers/sliderController.js";
// import authonticate from "../middlewares/authonticate.js";
const sliderRoute = express.Router();

sliderRoute.post(
  "/",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createSlider
);
sliderRoute.patch(
  "/:slider_id",
  // authonticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateSlider
);
sliderRoute.delete(
  "/:slider_id",
  // authonticate,
  deleteSlider
);
sliderRoute.get("/", getSliders);
sliderRoute.get("/:slider_id", getSingleSlider);

export default sliderRoute;
