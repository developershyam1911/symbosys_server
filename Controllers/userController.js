import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../Model/userModel.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(createHttpError(400, "All field is Required"));
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User Alread Exists");
      next(error);
    }
  } catch (err) {
    console.log(err);
    return next(createHttpError(500, "error is finding user"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  let newUser;
  try {
    newUser = User.create({
      name,
      email,
      password: hashPassword,
    });
  } catch (err) {
    console.log("data add on error:", err);
    return next(createHttpError(500, "user creating error"));
  }
  // let token;
  // try {
  //   token = jwt.sign({ sub: newUser._id }, process.env.ACCCESS_TOKEN_SECRET, {
  //     expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return next(createHttpError(500, "access tokent gentrating error"));
  // }
  return res
    .status(201)
    .json(new ApiResponse(200, "User Registered Successfully"));
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createHttpError(400, "All fileds are requireds"));
  }
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return next(createHttpError(404, "User Not Found"));
    }
    const comparePassword = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!comparePassword) {
      return next(createHttpError(400, "Password is not matched"));
    }
    let token;
    try {
      token = jwt.sign(
        { sub: currentUser._id },
        process.env.ACCCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
    } catch (err) {
      console.log(err);
      return next(createHttpError(500, "access tokent gentrating error"));
    }
    const data = { currentUser, token };
    console.log("login token", token);
    res.status(201).json(new ApiResponse(200, data, "User Login Scussefully"));
  } catch (err) {
    console.log(err);
    return next(createHttpError(400, "Login user error"));
  }
};

export { registerUser, loginUser };
