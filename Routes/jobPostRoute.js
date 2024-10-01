import express from "express";
import {
  createJobPost,
  deleteaJob,
  getJob,
  getSingleJob,
  updateJobPost,
} from "../Controllers/jobPostController.js";

// import authonticate from "../middlewares/authonticate.js";
const jobPostRoute = express.Router();

jobPostRoute.post(
  "/",
  //  authonticate,
  createJobPost
);
jobPostRoute.patch(
  "/:job_id",
  //  authonticate,
  updateJobPost
);
jobPostRoute.delete(
  "/:job_id",
  // authonticate,
  deleteaJob
);
jobPostRoute.get("/", getJob);
jobPostRoute.get("/:job_id", getSingleJob);

export default jobPostRoute;
