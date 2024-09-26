import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
} from "../Controllers/productController.js";
// import authonticate from "../middlewares/authonticate.js";
const contactRoute = express.Router();

contactRoute.post(
  "/",
  //  authonticate,
  createProduct
);
contactRoute.patch(
  "/:product_id",
  //  authonticate,
  updateProduct
);
contactRoute.delete(
  "/:product_id",
  // authonticate,
  deleteProduct
);
contactRoute.get("/", getProduct);
contactRoute.get("/:product_id", getSingleProduct);

export default contactRoute;
