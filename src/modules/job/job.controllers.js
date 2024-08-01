/*
    ## Jobs APIs
        1. Add Job 
            - apply authorization with the role ( Company_HR )
        2. Update Job
            - apply authorization with the role ( Company_HR )
        3. Delete Job
            - apply authorization with the role ( Company_HR )
        4. Get all Jobs with their company’s information.
            - apply authorization with the role ( User , Company_HR )
        5. Get all Jobs for a specific company.
            - apply authorization with the role ( User , Company_HR )
            - send the company name in the query and get this company jobs.
        6. Get all Jobs that match the following filters 
            - allow user to filter with workingTime , jobLocation , seniorityLevel and jobTitle,technicalSkills
            - one or more of them should applied
            **Example** : if the user selects the   
            **workingTime** is **part-time** and the **jobLocation** is **onsite** 
            , we need to return all jobs that match these conditions
            - apply authorization with the role ( User , Company_HR )
        7. Apply to Job
            - This API will add a new document in the application Collections with the new data
            - apply authorization with the role ( User )
*/

import { AppError, asyncErrorHandler } from "../../utils/error.js";
import Job from "../../../database/models/job.model.js";

const addJob = asyncErrorHandler(async (req, res) => {
  const job = await Job.create({ ...req.body, addedBy: req.user.userId });
  if (!job) throw new AppError("Job addition failed", 400);

  res.status(201).json({ message: "success", job });
});

const updateJob = asyncErrorHandler(async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.jobId, addedBy: req.user.userId },
    req.body,
    { new: true }
  );
  if (!job) throw new AppError("Job not found", 404);

  res.status(200).json({ message: "success", job });
});

const deleteJob = asyncErrorHandler(async (req, res) => {
  const job = await Job.findOneAndDelete({
    _id: req.params.jobId,
    addedBy: req.user.userId,
  });
  if (!job) throw new AppError("Job not found", 404);

  res.status(200).json({ message: "success", job });
});

const getJobsWithCompanyInfo = asyncErrorHandler(async (req, res) => {
  const jobs = await Job.find({}).populate("addedBy").populate("company");

  res.status(200).json({ message: "success", jobs });
});

const getJobsForSpecificCompany = asyncErrorHandler(async (req, res) => {
  const jobs = await Job.find({ addedBy: req.params.hrId })
    .populate("addedBy", "userName email")
    .populate("company", "companyName companyEmail");

  res.status(200).json({ message: "success", jobs });
});

export {
  addJob,
  updateJob,
  deleteJob,
  getJobsWithCompanyInfo,
  getJobsForSpecificCompany,
};
