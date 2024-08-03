import { Router } from "express";
import * as JC from "./job.controllers.js";
import * as JV from "./job.validations.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { extensions, localUpload } from "../../utils/upload.js";
import { checkIfApplied } from "../../middlewares/checkIfExists.middleware.js";
import { role } from "../../utils/role.js";

const jobRouter = Router();

jobRouter
  .route("/")
  .post(validate(JV.addJobSchema), auth(role.companyHR), JC.addJob)
  .get(auth(role.companyHR || role.user), JC.getJobs);

jobRouter
  .route("/:jobId")
  .put(validate(JV.updateJobSchema), auth(role.companyHR), JC.updateJob)
  .delete(auth(role.companyHR), JC.deleteJob);

jobRouter.get(
  "/withCompanyInfo",
  auth(role.companyHR || role.user),
  JC.getJobsWithCompanyInfo
);

jobRouter.get(
  "/company/:hrId",
  auth(role.companyHR || role.user),
  JC.getJobsForSpecificCompany
);

jobRouter.post(
  "/apply/:jobId",
  localUpload(extensions.pdf, "applicants").single("userResume"),
  validate(JV.applyToJobSchema),
  auth(role.user),
  checkIfApplied,
  JC.applyToJob
);

jobRouter.get(
  "/applicants/:jobId",
  auth(role.companyHR),
  JC.generateApplicantsSheet
);

export default jobRouter;
