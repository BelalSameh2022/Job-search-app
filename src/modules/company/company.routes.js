import { Router } from "express";
import * as CC from "./company.controllers.js";
import * as CV from "./company.validations.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { checkIfCompany } from "../../middlewares/checkIfExists.middleware.js";

const companyRouter = Router();

companyRouter.post(
  "/",
  validate(CV.addCompanySchema),
  auth("company_HR"),
  checkIfCompany,
  CC.addCompany
);

export default companyRouter;
