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
    return next(createHttpError(400, "All fields are required"));
  }

  // Check if image file is present
  const imageLocalpath = req.files?.image?.[0]?.path;
  if (!imageLocalpath) {
    return next(createHttpError(400, "Image is required"));
  }

  try {
    // Create a new resource with the local image path
    const resource = await Resource.create({
      title,
      email,
      mobno,
      description,
      tech,
      image: imageLocalpath, // Store the local path of the image
    });

    return res
      .status(201)
      .json(new ApiResponse(200, resource, "Resource is added successfully"));
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "Error adding resource"));
  }
};

const updateresource = async (req, res, next) => {
  const { title, email, mobno, description, tech } = req.body;
  if (!title || !mobno) {
    return next(createHttpError(400, "All fields are required"));
  }

  const resource_id = req.params.resource_id;
  if (!resource_id) {
    return next(createHttpError(400, "Resource ID is missing"));
  }

  const singleresource = await Resource.findOne({ _id: resource_id });
  if (!singleresource) {
    return next(createHttpError(400, "Resource not found"));
  }

  let imageUrl = singleresource.image;

  // Check if a new image is being uploaded
  if (req.files?.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      return next(createHttpError(400, "Image is required"));
    }

    // Optionally, you can delete the old image from the local directory here if needed
    // Use fs.unlink() to remove the old image
    // fs.unlinkSync(singleresource.image);

    // Update the image URL to the new image path
    imageUrl = imageLocalpath;
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
        image: imageUrl, // Update with the local path of the new image
      },
      { new: true }
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedsingleresource,
          "Resource updated successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "Error updating resource"));
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
