import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Project } from "../Model/projectModel.js";

const createProject = async (req, res, next) => {
  const { title, sub_title } = req.body;
  if (!title || !sub_title) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const imageLocalpath = req.files.image[0].path;
  if (!imageLocalpath) {
    return next(createHttpError(400, "image is required"));
  }
  const image = await uploadOnCloudinary(imageLocalpath);
  try {
    const project = await Project.create({
      title,
      sub_title,
      image: image.url,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, project, "project is Added Successfully"));
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "project Add Error"));
  }
};

const updateProject = async (req, res, next) => {
  const { title, sub_title } = req.body;
  if (!title || !sub_title) {
    return next(createHttpError(400, "All fileds is required"));
  }
  const project_id = req.params.project_id;
  if (!project_id) {
    return next(createHttpError(400, "Project Id is missing"));
  }
  const singleProject = await Project.findOne({ _id: project_id });
  if (!singleProject) {
    return next(createHttpError(400, "Single Project is not getting"));
  }
  let imageUrl = singleProject.image;
  if (req.files.image) {
    const imageLocalpath = req.files.image[0].path;
    if (!imageLocalpath) {
      return next(createHttpError(400, "image is required"));
    }
    if (singleProject.image) {
      const oldFilePublicId = singleProject.image
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
  try {
    const updatedsingleProject = await Project.findOneAndUpdate(
      { _id: project_id },
      {
        title,
        sub_title,
        image: imageUrl,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          updatedsingleProject,
          "project is Updated Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    return next(createHttpError(400, "project Update Error"));
  }
};
const getProjects = async (req, res, next) => {
  try {
    const allProject = await Project.find();
    if (!allProject) {
      return next(createHttpError(400, "All Project is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, allProject, "All Project getting successfully")
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "all Project not getting"));
  }
};
const getsingleProject = async (req, res, next) => {
  const project_id = req.params.project_id;
  try {
    const singleProject = await Project.findOne({ _id: project_id });
    if (!singleProject) {
      return next(createHttpError(400, "single Project is not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleProject,
          "single Project getting successfully"
        )
      );
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "single Project not getting"));
  }
};
const deleteProject = async (req, res, next) => {
  const project_id = req.params.project_id;
  try {
    const singleProject = await Project.findOne({ _id: project_id });
    if (!singleProject) {
      return next(createHttpError(404, "single Project not getting"));
    }
    await Project.deleteOne({ _id: project_id });
    //file delete on cloudinary
    const filePublicId = singleProject.image.split("/").pop().split(".")[0];
    console.log("image public id", filePublicId);
    await deleteFromCloudinary(filePublicId);
    return res
      .status(200)
      .json(
        new ApiResponse(200, project_id, "single Project deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Project delted error"));
  }
};

export {
  createProject,
  updateProject,
  getProjects,
  getsingleProject,
  deleteProject,
};
