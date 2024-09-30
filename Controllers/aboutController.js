import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { About } from "../Model/aboutModel.js";

// Create About - Only allows one record
const createAbout = async (req, res, next) => {
  const { main_about, mission, vision, core_value } = req.body;

  // Check if About document already exists
  const existingAbout = await About.findOne();
  if (existingAbout) {
    return next(
      createHttpError(400, "About section already exists. Please update it.")
    );
  }

  // Check if all fields are provided
  if (!main_about || !mission || !vision || !core_value) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    // Create new About document
    const about = await About.create({
      main_about,
      mission,
      vision,
      core_value,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, about, "About added successfully"));
  } catch (err) {
    console.log(err, "Error creating About");
    return next(createHttpError(400, "Error creating About section"));
  }
};

// Update About
const updateAbout = async (req, res, next) => {
  const about_id = req.params.about_id;

  // Check if about_id is provided
  if (!about_id) {
    return next(createHttpError(400, "About ID is missing"));
  }

  const { main_about, mission, vision, core_value } = req.body;

  // Check if all fields are provided
  if (!main_about || !mission || !vision || !core_value) {
    return next(createHttpError(400, "All fields are required"));
  }

  try {
    // Find and update the About document
    const about = await About.findOneAndUpdate(
      { _id: about_id },
      {
        main_about,
        mission,
        vision,
        core_value,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, about, "About updated successfully"));
  } catch (err) {
    console.log(err, "Error updating About");
    return next(createHttpError(400, "Error updating About section"));
  }
};

// Get About
const getAbout = async (req, res, next) => {
  try {
    const about = await About.find();
    return res
      .status(201)
      .json(new ApiResponse(200, about, "About fetched successfully"));
  } catch (err) {
    console.log(err, "Error fetching About");
    return next(createHttpError(400, "Error fetching About section"));
  }
};

// Delete About
const deleteAbout = async (req, res, next) => {
  const about_id = req.params.about_id;

  // Check if about_id is provided
  if (!about_id) {
    return next(createHttpError(400, "About ID is missing"));
  }

  try {
    // Find the About document
    const singleAbout = await About.findOne({ _id: about_id });
    if (!singleAbout) {
      return next(createHttpError(404, "About section not found"));
    }

    // Delete the About document
    await About.deleteOne({ _id: about_id });
    return res
      .status(200)
      .json(new ApiResponse(200, about_id, "About deleted successfully"));
  } catch (err) {
    console.log(err, "Error deleting About");
    return next(createHttpError(400, "Error deleting About section"));
  }
};

export { getAbout, deleteAbout, createAbout, updateAbout };
