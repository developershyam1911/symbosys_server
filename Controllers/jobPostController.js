import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JobPost } from "../Model/jobPostModel.js";

const createJobPost = async (req, res, next) => {
  const { degination, qualification, pepol, description } = req.body;
  if (!degination || !qualification || !pepol || !description) {
    return next(createHttpError(400, "All filed is required"));
  }
  try {
    const job = await JobPost.create({
      degination,
      qualification,
      pepol,
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
    const job = await JobPost.find();
    return res
      .status(201)
      .json(new ApiResponse(200, job, "job get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "job getting  error"));
  }
};
const updateJobPost = async (req, res, next) => {
  const job_id = req.params.job_id;
  if (!job_id) {
    return next(createHttpError(400, "JobPost id is missing"));
  }
  const { name, description } = req.body;
  if (!name) {
    return next(createHttpError(400, "title is required"));
  }
  try {
    const JobPost = await JobPost.findOneAndUpdate(
      { _id: job_id },
      {
        degination,
        qualification,
        pepol,
        description,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, JobPost, "JobPost Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "JobPost Addition  error"));
  }
};
const getSingleJob = async (req, res, next) => {
  const job_id = req.params.job_id;
  if (!job_id) {
    return next(createHttpError(400, "JobPost id is missing"));
  }
  try {
    const singleJobPost = await JobPost.findOne({ _id: job_id });
    if (!singleJobPost) {
      return next(createHttpError(404, "single JobPost not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleJobPost,
          "single JobPost getting successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "JobPost delted error"));
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
export { createJobPost, getJob, deleteaJob, getSingleJob, updateJobPost };
