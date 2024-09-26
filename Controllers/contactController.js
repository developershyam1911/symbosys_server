import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../Model/contactModel.js";

const createContact = async (req, res, next) => {
  const { name, email, message, project } = req.body;
  console.log(req.body);
  if (!name || !message) {
    return next(createHttpError(400, "name is required"));
  }
  try {
    const brand = await Contact.create({
      name,
      email,
      message,
      project,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, brand, "contact Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "Brand Addition  error"));
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.find();
    return res
      .status(201)
      .json(new ApiResponse(200, contact, "Contact get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "Brand getting  error"));
  }
};

const deleteContact = async (req, res, next) => {
  const user_id = req.params.user_id;
  if (!user_id) {
    return next(createHttpError(400, "user_id is missing"));
  }
  try {
    const singleContact = await Contact.findOne({ _id: user_id });
    if (!singleContact) {
      return next(createHttpError(404, "single enquiry not getting"));
    }
    await Contact.deleteOne({ _id: user_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, user_id, "single enquiry deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "enquiry delted error"));
  }
};
export { deleteContact, createContact, getContact };
