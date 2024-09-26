import convertToLSlug from "../utils/genrateSlug.js";
import createHttpError from "http-errors";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../Model/productModel.js";

const createProduct = async (req, res, next) => {
  const { name, description } = req.body;
  console.log(req.body);
  if (!name) {
    return next(createHttpError(400, "name & description  is required"));
  }
  const productSlug = await convertToLSlug(name);
  try {
    const product = await Product.create({
      name,
      description,
      slug: productSlug,
    });
    return res
      .status(201)
      .json(new ApiResponse(200, product, "product Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "product Addition  error"));
  }
};
const updateProduct = async (req, res, next) => {
  const product_id = req.params.product_id;
  if (!product_id) {
    return next(createHttpError(400, "Product id is missing"));
  }
  const { name, description } = req.body;
  if (!name) {
    return next(createHttpError(400, "name is required"));
  }
  const productSlug = await convertToLSlug(name);
  try {
    const product = await Product.findOneAndUpdate(
      { _id: product_id },
      {
        name,
        description,
        slug: productSlug,
      },
      { new: true }
    );
    return res
      .status(201)
      .json(new ApiResponse(200, product, "Product Add Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "Product Addition  error"));
  }
};
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    return res
      .status(201)
      .json(new ApiResponse(200, product, "Product get Successfully"));
  } catch (err) {
    console.log(err, " errr");
    return next(createHttpError(400, "Product getting  error"));
  }
};
const getSingleProduct = async (req, res, next) => {
  const product_id = req.params.product_id;
  if (!product_id) {
    return next(createHttpError(400, "product id is missing"));
  }
  try {
    const singleProduct = await Product.findOne({ _id: product_id });
    if (!singleProduct) {
      return next(createHttpError(404, "single Product not getting"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          singleProduct,
          "single product getting successfully"
        )
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "Product delted error"));
  }
};
const deleteProduct = async (req, res, next) => {
  const product_id = req.params.product_id;
  if (!product_id) {
    return next(createHttpError(400, "product id is missing"));
  }
  try {
    const singleProduct = await Product.findOne({ _id: product_id });
    if (!singleProduct) {
      return next(createHttpError(404, "single Product not getting"));
    }
    await Product.deleteOne({ _id: product_id });
    return res
      .status(200)
      .json(
        new ApiResponse(200, product_id, "single product deleted successfully")
      );
  } catch (err) {
    console.log(err, "delete errr");
    return next(createHttpError(400, "product delted error"));
  }
};
export {
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  getSingleProduct,
};
