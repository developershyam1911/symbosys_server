import express from "express";
import {
  createService,
  deleteService,
  getService,
  getSingleService,
  updateService,
} from "../Controllers/serviceController.js";
import authonticate from "../middlewares/authonticate.js";

const contactRoute = express.Router();

contactRoute.post("/", authonticate, createService);
contactRoute.patch("/:service_id", authonticate, updateService);
contactRoute.delete("/:service_id", authonticate, deleteService);
contactRoute.get("/", getService);
contactRoute.get("/:service_id", getSingleService);

export default contactRoute;
