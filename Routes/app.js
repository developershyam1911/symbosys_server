import express from "express";
import cors from "cors";
import globalErrorHandling from "../middlewares/globalErrorHandling.js";
import contactRoute from "./contactRoute.js";
import productRoute from "./productRoute.js";
import serviceRoute from "./serviceRoute.js";
import jobRoute from "./jobRoute.js";
import blogRoute from "./blogRoute.js";
import dotenv from "dotenv";
import sliderRoute from "./sliderRoute.js";
import projectRoute from "./projectRoute.js";
import aboutRoute from "./aboutRoute.js";
import careerRoute from "./careerRoute.js";
import { JobPost } from "../Model/jobPostModel.js";
const app = express();
dotenv.config();
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.json({ limit: "10mb" })); // Increase the JSON request limit to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Increase the URL-encoded request limit
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
//routing
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/slider", sliderRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/about", aboutRoute);
app.use("/api/v1/career", careerRoute);
app.use("/api/v1/jobPost", JobPost);

// global error handling
app.use(globalErrorHandling);

export default app;
