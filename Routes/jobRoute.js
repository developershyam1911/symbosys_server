import express from "express";
import { createJob, deleteaJob, getJob } from "../Controllers/jobController.js";

const contactRoute = express.Router();

contactRoute.post("/", createJob);
contactRoute.delete("/:job_id", deleteaJob);
contactRoute.get("/", getJob);

export default contactRoute;
