import express from "express";
import {
  createAbout,
  deleteAbout,
  getAbout,
  updateAbout,
} from "../Controllers/aboutController.js";

// import authonticate from "../middlewares/authonticate.js";

const aboutRoute = express.Router();

aboutRoute.post(
  "/",
  // authonticate,
  createAbout
);
aboutRoute.patch(
  "/:about_id",
  // authonticate,
  updateAbout
);
aboutRoute.delete(
  "/:about_id",
  //  authonticate,
  deleteAbout
);
aboutRoute.get("/", getAbout);

export default aboutRoute;
