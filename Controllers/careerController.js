import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Career } from "../Model/careetModel.js";

const createCareer = async (req, res, next) => {
  // Check if About document already exists
  const existingAbout = await Career.findOne();
  if (existingAbout) {
    return next(
      createHttpError(400, "Career section already exists. Please update it.")
    );
  }
  const { name, description } = req.body;
  console.log(req.body);
  if (!name) {
    return next(createHttpError(400, "title & description  is required"));
  }
  try {
    const career = await Career.create({
      name,
      description,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, career, "career Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "career Addition  error"));
  }
};
const updateCareer = async (req, res, next) => {
  const career_id = req.params.career_id;
  if (!career_id) {
    return next(createHttpError(400, "Career id is missing"));
  }
  const { name, description } = req.body;
  if (!name) {
    return next(createHttpError(400, "title is required"));
  }
  try {
    const career = await Career.findOneAndUpdate(
      { _id: career_id },
      {
        name,
        description,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, career, "career Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "career Addition  error"));
  }
};
const getCareer = async (req, res, next) => {
  try {
    const career = await Career.find();
    return res
      .status(201)
      .json(new ApiResponse(200, career, "career get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "career getting  error"));
  }
};
const getSingleCareer = async (req, res, next) => {
  const career_id = req.params.career_id;
  if (!career_id) {
    return next(createHttpError(400, "career id is missing"));
  }
  try {
    const singleCareer = await Career.findOne({ _id: career_id });
    if (!singleCareer) {
      return next(createHttpError(404, "single Career not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleCareer, "single Career getting successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Career delted error"));
  }
};
const deleteCareer = async (req, res, next) => {
  const career_id = req.params.career_id;
  if (!career_id) {
    return next(createHttpError(400, "Career id is missing"));
  }
  try {
    const singleCareer = await Career.findOne({ _id: career_id });
    if (!singleCareer) {
      return next(createHttpError(404, "single Career not getting"));
    }
    await Career.deleteOne({ _id: career_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, career_id, "single Career deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Career delted error"));
  }
};
export { getCareer, deleteCareer, createCareer, updateCareer, getSingleCareer };
