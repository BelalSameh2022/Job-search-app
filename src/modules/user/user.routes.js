import { Router } from "express";
import * as UC from "./user.controllers.js";
import * as UV from "./user.validations.js";
import { checkIfUser } from "../../middlewares/checkIfExists.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { role } from "../../utils/role.js";

const userRouter = Router();

userRouter.post("/signup", validate(UV.signUpSchema), checkIfUser, UC.signUp);
userRouter.post("/signin", validate(UV.signInSchema), UC.signIn);
userRouter.put(
  "/updateAccount",
  validate(UV.updateAccountSchema),
  auth(role.user || role.companyHR),
  checkIfUser,
  UC.updateAccount
);
userRouter.delete(
  "/deleteAccount",
  auth(role.user || role.companyHR),
  UC.deleteAccount
);
userRouter.get("/", auth(role.user || role.companyHR), UC.getAccount);
userRouter.get(
  "/getAnotherAccount/:anotherId",
  auth(role.user || role.companyHR),
  UC.getAnotherAccount
);
userRouter.patch(
  "/updatePassword",
  validate(UV.updatePasswordSchema),
  auth(role.user || role.companyHR),
  UC.updatePassword
);
userRouter.patch(
  "/forgetPassword",
  validate(UV.forgetPasswordSchema),
  UC.forgetPassword
);
userRouter.patch("/confirmOtp", validate(UV.confirmOtpSchema), UC.confirmOtp);
userRouter.patch(
  "/resetPassword",
  validate(UV.resetPasswordSchema),
  UC.resetPassword
);
userRouter.get("/getAccountsByRecoveryEmail", UC.getAccountsByRecoveryEmail);

export default userRouter;
