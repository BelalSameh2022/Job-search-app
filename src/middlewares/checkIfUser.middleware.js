import { AppError } from "../utils/error.js";
import User from "../../database/models/user.model.js";

export const checkIfUser = async (req, res, next) => {
  const { email, mobileNumber } = req.body;
  const user = await User.findOne({ email, mobileNumber });
  if (user)
    next(
      new AppError(
        "User already exists: change your email or mobile number",
        409
      )
    );
  next();
};
