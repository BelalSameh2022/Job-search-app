import { Router } from "express";
import * as CC from "./company.controllers.js";
import * as CV from "./company.validations.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { checkIfCompany } from "../../middlewares/checkIfExists.middleware.js";
import { role } from "../../utils/role.js";

const companyRouter = Router();

companyRouter.post(
  "/addCompany",
  validate(CV.addCompanySchema),
  auth(role.companyHR),
  checkIfCompany,
  CC.addCompany
);

companyRouter.put(
  "/updateCompany/:companyId",
  validate(CV.updateCompanySchema),
  auth(role.companyHR),
  checkIfCompany,
  CC.updateCompany
);

companyRouter.delete(
  "/deleteCompany/:companyId",
  auth(role.companyHR),
  CC.deleteCompany
);

companyRouter.get("/getCompany/:companyId", auth(role.companyHR), CC.getCompany);

companyRouter.get(
  "/",
  auth(role.companyHR || role.user),
  CC.SearchCompanyWithName
);

companyRouter.get(
  "/getApplicationsForJob/:jobId",
  auth(role.companyHR),
  CC.getApplicationsForJob
);

export default companyRouter;
