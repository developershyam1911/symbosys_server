import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../Model/jobModel.js";

const createJob = async (req, res, next) => {
  const { name, email, mobileno, jobtitle, description } = req.body;
  if (!name || !email || !mobileno || !jobtitle || !description) {
    return next(createHttpError(400, "All filed is required"));
  }
  try {
    const job = await Job.create({
      name,
      email,
      mobileno,
      jobtitle,
      description,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, job, "job Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "job Addition  error"));
  }
};

const getJob = async (req, res, next) => {
  try {
    const job = await Job.find();
    return res
      .status(201)
      .json(new ApiResponse(200, job, "job get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "job getting  error"));
  }
};

const deleteaJob = async (req, res, next) => {
  const job_id = req.params.job_id;
  if (!job_id) {
    return next(createHttpError(400, "job_id is missing"));
  }
  try {
    const singleJob = await Job.findOne({ _id: job_id });
    if (!singleJob) {
      return next(createHttpError(404, "single job not getting"));
    }
    await Job.deleteOne({ _id: job_id });
    return res
      .status(200)
      .json(new ApiResponse(200, job_id, "single job deleted successfully"));
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "job delted error"));
  }
};
export { createJob, getJob, deleteaJob };
