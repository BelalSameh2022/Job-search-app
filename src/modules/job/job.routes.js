import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import * as JC from "./job.controllers.js";
import * as JV from "./job.validations.js";

const jobRouter = Router();

jobRouter.post("/", validate(JV.addJobSchema), auth("company_HR"), JC.addJob);

export default jobRouter;
