import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Resource } from "../Model/resourceModel.js";

const createresource = async (req, res, next) => {
  const { title, email, mobno, description, tech } = req.body;
  if (!title || !mobno) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const imageLocalpath = req.files.image[0].path;
  if (!imageLocalpath) {
    return next(createHttpError(400, "image is required"));
  }
  const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const resource = await Resource.create({
      title,
      email,
      mobno,
      description,
      tech,
      image: image.url,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, resource, "resource is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "resource Add Error"));
  }
};

const updateresource = async (req, res, next) => {
  const { title, email, mobno, description, tech } = req.body;
  if (!title || !mobno) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const resource_id = req.params.resource_id;
  if (!resource_id) {
    return next(createHttpError(400, "resource Id is missing"));
  }
  const singleresource = await Resource.findOne({ _id: resource_id });
  if (!singleresource) {
    return next(createHttpError(400, "Single resource is not getting"));
  }
  let imageUrl = Resource.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      return next(createHttpError(400, "image is required"));
    }
    if (Resource.image) {
      const oldFilePublicId = Resource.image.split("/").pop().split(".")[0];
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
  try {
    const updatedsingleresource = await Resource.findOneAndUpdate(
      { _id: resource_id },
      {
        title,
        email,
        mobno,
        description,
        tech,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedsingleresource,
          "resource is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "resource Update Error"));
  }
};
const getresources = async (req, res, next) => {
  try {
    const allresource = await Resource.find();
    if (!allresource) {
      return next(createHttpError(400, "All resource is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, allresource, "All resource getting successfully")
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "all resource not getting"));
  }
};
const getsingleresource = async (req, res, next) => {
  const resource_id = req.params.resource_id;
  try {
    const singleresource = await Resource.findOne({ _id: resource_id });
    if (!singleresource) {
      return next(createHttpError(400, "single resource is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleresource,
          "single resource getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "single resource not getting"));
  }
};
const deleteresource = async (req, res, next) => {
  const resource_id = req.params.resource_id;
  try {
    const singleresource = await Resource.findOne({ _id: resource_id });
    if (!singleresource) {
      return next(createHttpError(404, "single resource not getting"));
    }
    await Resource.deleteOne({ _id: resource_id });
    //file delete on cloudinary
    // const filePublicId = Resource.image.split("/").pop().split(".")[0];
    // console.log("image public id", filePublicId);
    // await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          resource_id,
          "single resource deleted successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "resource delted error"));
  }
};

export {
  createresource,
  updateresource,
  getresources,
  getsingleresource,
  deleteresource,
};
