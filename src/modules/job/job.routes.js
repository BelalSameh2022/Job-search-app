import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import * as JC from "./job.controllers.js";
import * as JV from "./job.validations.js";

const jobRouter = Router();

jobRouter
  .route("/")
  .post(validate(JV.addJobSchema), auth("company_HR"), JC.addJob)
  .get(auth("company_HR" || "user"), JC.getJobs);

jobRouter
  .route("/:jobId")
  .put(validate(JV.updateJobSchema), auth("company_HR"), JC.updateJob)
  .delete(auth("company_HR"), JC.deleteJob);

jobRouter.get(
  "/withCompanyInfo",
  auth("company_HR" || "user"),
  JC.getJobsWithCompanyInfo
);

jobRouter.get(
  "/:hrId",
  auth("company_HR" || "user"),
  JC.getJobsForSpecificCompany
);

jobRouter.post(
  "applyTo/:jobId",
  validate(JV.applyToJobSchema),
  auth("user"),
  JC.applyToJob
);

export default jobRouter;
