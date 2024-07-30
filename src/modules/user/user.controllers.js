/*
    ## User APIs
        1. Sign Up
        2. Sign In
            - Sign In using  (email or recoveryEmail or mobileNumber)  and password
            - don’t forget to update the status to online after SignIn
        3. update account.
            - you can update ( email , mobileNumber , recoveryEmail , DOB , lastName , firstName)
            - if user update the email , mobileNumber make sure that the new data doesn’t conflict with any existing data in your  database
            - User must be loggedIn
            - only the owner of the account can update his account data
        4. Delete account
            - only the owner of the account can delete his account data
            - User must be loggedIn
        5. Get user account data 
            - only the owner of the account can get his account data
            - User must be loggedIn
        6. Get profile data for another user 
            - send the userId in params or query
        7. Update password 
        8. Forget password (make sure of your data security specially the OTP and the newPassword )
        9. Get all accounts associated to a specific recovery Email
*/

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, asyncErrorHandler } from "../../utils/error.js";
import User from "../../../database/models/user.model.js";

const signUp = asyncErrorHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    recoveryEmail,
    dateOfBirth,
    role,
    status,
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password, +process.env.saltRounds);

  const user = await User.create({
    firstName,
    lastName,
    userName: firstName + " " + lastName,
    email,
    password: hashedPassword,
    mobileNumber,
    recoveryEmail,
    dateOfBirth,
    role,
    status,
  });
  res.status(201).json({ message: "success", user });
});

const signIn = asyncErrorHandler(async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [
      { email: identifier },
      { recoveryEmail: identifier },
      { mobileNumber: identifier },
    ],
  });
  if (!user || !bcrypt.compareSync(password, user.password))
    throw new AppError("Invalid credentials", 401);

  user.status = "online";
  await user.save();

  jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) throw new AppError(err.message, 400);

      res.status(200).json({ message: "success", token });
    }
  );
});

const updateAccount = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    recoveryEmail,
    dateOfBirth,
  } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: userId, status: "online" },
    {
      firstName,
      lastName,
      userName: firstName + " " + lastName,
      email,
      mobileNumber,
      recoveryEmail,
      dateOfBirth,
    },
    { new: true }
  );
  if (!user) throw new AppError("User is not found", 404);

  res.status(200).json({ message: "success", user });
});

const deleteAccount = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOneAndDelete({ _id: userId, status: "online" });
  if (!user) throw new AppError("User is not found", 404);

  res.status(200).json({ message: "success", user });
});

const getAccountData = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId, status: "online" });
  if (!user) throw new AppError("User is not found", 404);

  res.status(200).json({ message: "success", user });
});

const getAccountDataForAnotherUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;
  const { anotherId } = req.params;

  const user = await User.findOne({ _id: userId, status: "online" });
  if (!user) throw new AppError("Unauthorized", 401);

  const data = await User.findById(anotherId);
  if (!data) throw new AppError("User is not found", 404);

  res.status(200).json({ message: "success", data });
});

const updatePassword = asyncErrorHandler(async (req, res) => {
  const { userId } = req.user;
  const { newPassword } = req.body;

  const hashedPassword = bcrypt.hashSync(newPassword, +process.env.saltRounds);

  const user = await User.findOneAndUpdate(
    { _id: userId, status: "online" },
    { password: hashedPassword },
    { new: true }
  );
  if (!user) throw new AppError("User is not found", 404);

  res.status(200).json({ message: "success", user });
});

export {
  signUp,
  signIn,
  updateAccount,
  deleteAccount,
  getAccountData,
  getAccountDataForAnotherUser,
  updatePassword,
};
