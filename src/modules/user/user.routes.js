import { Router } from "express";
import * as UC from "./user.controllers.js";
import * as UV from "./user.validations.js";
import { checkIfUser } from "../../middlewares/checkIfUser.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";

const userRouter = Router();

userRouter.post("/signup", checkIfUser, UC.signUp);
userRouter.post("/signin", UC.signIn);
userRouter.put("/updateAccount", auth("user"), checkIfUser, UC.updateAccount);
userRouter.delete("/deleteAccount", auth("user"), UC.deleteAccount);
userRouter.get("/getAccountData", auth("user"), UC.getAccountData);
userRouter.get(
  "/getAccountDataForAnotherUser/:anotherId",
  auth("user"),
  UC.getAccountDataForAnotherUser
);
userRouter.patch(
  "/updatePassword",
  validate(UV.updatePasswordSchema),
  auth("user"),
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

export default userRouter;
