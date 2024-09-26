import convertToLSlug from "../utils/genrateSlug.js";
import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../Model/serviceModel.js";

const createService = async (req, res, next) => {
  const { name, description } = req.body;
  console.log(req.body);
  if (!name) {
    return next(createHttpError(400, "name & description  is required"));
  }
  const serviceSlug = await convertToLSlug(name);
  try {
    const service = await Service.create({
      name,
      description,
      slug: serviceSlug,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, service, "service Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "service Addition  error"));
  }
};
const updateService = async (req, res, next) => {
  const service_id = req.params.service_id;
  if (!service_id) {
    return next(createHttpError(400, "service_id is missing"));
  }
  const { name, description } = req.body;
  if (!name) {
    return next(createHttpError(400, "name is required"));
  }
  const serviceSlug = await convertToLSlug(name);
  try {
    const service = await Service.findOneAndUpdate(
      { _id: service_id },
      {
        name,
        description,
        slug: serviceSlug,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, service, "service Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "service Addition  error"));
  }
};
const getService = async (req, res, next) => {
  try {
    const service = await Service.find();
    return res
      .status(201)
      .json(new ApiResponse(200, service, "service get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "service getting  error"));
  }
};
const getSingleService = async (req, res, next) => {
  const service_id = req.params.service_id;
  if (!service_id) {
    return next(createHttpError(400, "service id is missing"));
  }
  try {
    const singleService = await Service.findOne({ _id: service_id });
    if (!singleService) {
      return next(createHttpError(404, "single service not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleService,
          "single service getting successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "service delted error"));
  }
};
const deleteService = async (req, res, next) => {
  const service_id = req.params.service_id;
  if (!service_id) {
    return next(createHttpError(400, "service id is missing"));
  }
  try {
    const singleService = await Service.findOne({ _id: service_id });
    if (!singleService) {
      return next(createHttpError(404, "single service not getting"));
    }
    await Service.deleteOne({ _id: service_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, service_id, "single service deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "service delted error"));
  }
};
export {
  getService,
  deleteService,
  createService,
  updateService,
  getSingleService,
};
