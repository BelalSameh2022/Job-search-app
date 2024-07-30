import { Router } from "express";
import * as UC from "./user.controllers.js";
import { checkIfUser } from "../../middlewares/checkIfUser.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";

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

export default userRouter;
