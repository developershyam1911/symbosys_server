import express from "express";
import {
  createCareer,
  deleteCareer,
  getCareer,
  getSingleCareer,
  updateCareer,
} from "../Controllers/careerController.js";

// import authonticate from "../middlewares/authonticate.js";
const careerRoute = express.Router();

careerRoute.post(
  "/",
  //  authonticate,
  createCareer
);
careerRoute.patch(
  "/:career_id",
  //  authonticate,
  updateCareer
);
careerRoute.delete(
  "/:career_id",
  // authonticate,
  deleteCareer
);
careerRoute.get("/", getCareer);
careerRoute.get("/:career_id", getSingleCareer);

export default careerRoute;
