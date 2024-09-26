import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
} from "../Controllers/contactController.js";
const contactRoute = express.Router();

contactRoute.post("/", createContact);
contactRoute.delete("/:user_id", deleteContact);
contactRoute.get("/", getContact);

export default contactRoute;
