import convertToLSlug from "../utils/genrateSlug.js";
import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../Model/serviceModel.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";
const createService = async (req, res, next) => {
  const { name, description } = req.body;
  console.log(req.body);
  if (!name) {
    return next(createHttpError(400, "name & description  is required"));
  }
  const imageLocalpath = req.files.image[0].path;
  if (!imageLocalpath) {
    return next(createHttpError(400, "image is required"));
  }
  const image = await uploadOnCloudinary(imageLocalpath);

  const serviceSlug = await convertToLSlug(name);
  try {
    const service = await Service.create({
      name,
      description,
      slug: serviceSlug,
      image: image?.url,
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
  const { name, description } = req.body;
  if (!name || !description) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const service_id = req.params.service_id;
  if (!service_id) {
    return next(createHttpError(400, "Service Id is missing"));
  }
  const singleService = await Service.findOne({ _id: service_id });
  if (!singleService) {
    return next(createHttpError(400, "Single Service is not getting"));
  }
  let imageUrl = singleService.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      return next(createHttpError(400, "image is required"));
    }
    if (singleService.image) {
      const oldFilePublicId = singleService.image
        .split("/")
        .pop()
        .split(".")[0];
      await deleteFromCloudinary(oldFilePublicId);
    }
    const image = await uploadOnCloudinary(imageLocalpath);
    if (!image.url) {
      return next(
        createHttpError(400, "Error while uploading image to Cloudinary")
      );
    }
    imageUrl = image.url;
  }
  const serviceSlug = await convertToLSlug(name);
  try {
    const updatedsingleService = await Service.findOneAndUpdate(
      { _id: service_id },
      {
        name,
        description,
        image: imageUrl,
        slug: serviceSlug,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedsingleService,
          "Service is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "Service Update Error"));
  }
};
const getSingleService = async (req, res, next) => {
  const service_id = req.params.service_id;
  if (!service_id) {
    return next(createHttpError(400, "service id is missing"));
  }
  try {
    // const singleService = await Service.findOne({ _id: service_id });
    // if (!singleService) {
    //   return next(createHttpError(404, "single service not getting"));
    // }
    let singleService;
    if (mongoose.Types.ObjectId.isValid(service_id)) {
      singleService = await Service.findById(service_id);
    }
    if (!singleService) {
      singleService = await Service.findOne({ slug: service_id });
    }
    if (!singleService) {
      return next(createHttpError(404, "Service not found"));
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
    //file delete on cloudinary
    const filePublicId = singleService.image.split("/").pop().split(".")[0];
    console.log("image public id", filePublicId);
    await deleteFromCloudinary(filePublicId);
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
