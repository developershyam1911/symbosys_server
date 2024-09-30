import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Slider } from "../Model/sliderModel.js";
const createSlider = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const imageLocalpath = req.files.image[0].path;
  if (!imageLocalpath) {
    return next(createHttpError(400, "image is required"));
  }
  const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const slider = await Slider.create({
      title,
      description,
      image: image.url,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, slider, "slider is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "slider Add Error"));
  }
};

const updateSlider = async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const slider_id = req.params.slider_id;
  if (!slider_id) {
    return next(createHttpError(400, "slider Id is missing"));
  }
  const singleSlider = await Slider.findOne({ _id: slider_id });
  if (!singleSlider) {
    return next(createHttpError(400, "Single Slider is not getting"));
  }
  let imageUrl = singleSlider.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      return next(createHttpError(400, "image is required"));
    }
    if (singleSlider.image) {
      const oldFilePublicId = singleSlider.image.split("/").pop().split(".")[0];
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
    const updatedSingleSlider = await Slider.findOneAndUpdate(
      { _id: slider_id },
      {
        title,
        description,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedSingleSlider,
          "Slider is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "Slider Update Error"));
  }
};
const getSliders = async (req, res, next) => {
  try {
    const allSliders = await Slider.find();
    if (!allSliders) {
      return next(createHttpError(400, "All Slider is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, allSliders, "All Slider getting successfully")
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "all Slider not getting"));
  }
};
const getSingleSlider = async (req, res, next) => {
  const slider_id = req.params.slider_id;
  try {
    const singleSlider = await Slider.findOne({ _id: slider_id });
    if (!singleSlider) {
      return next(createHttpError(400, "single Slider is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, singleSlider, "single Slider getting successfully")
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "single Slider not getting"));
  }
};
const deleteSlider = async (req, res, next) => {
  const slider_id = req.params.slider_id;
  try {
    const singleSlider = await Slider.findOne({ _id: slider_id });
    if (!singleSlider) {
      return next(createHttpError(404, "single Slider not getting"));
    }
    await Slider.deleteOne({ _id: slider_id });
    //file delete on cloudinary
    const filePublicId = singleSlider.image.split("/").pop().split(".")[0];
    console.log("image public id", filePublicId);
    await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, slider_id, "single Slider deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Slider delted error"));
  }
};

export {
  createSlider,
  updateSlider,
  getSliders,
  getSingleSlider,
  deleteSlider,
};
