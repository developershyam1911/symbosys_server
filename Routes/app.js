import express from "express";
import cors from "cors";
import globalErrorHandling from "../middlewares/globalErrorHandling.js";
import contactRoute from "./contactRoute.js";
import productRoute from "./productRoute.js";
import serviceRoute from "./serviceRoute.js";
import jobRoute from "./jobRoute.js";
import blogRoute from "./blogRoute.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
//routing
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/blog", blogRoute);

// global error handling
app.use(globalErrorHandling);

export default app;
