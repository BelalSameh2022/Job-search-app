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
            - allow user to filter with workingTime , jobLocation , seniorityLevel and jobTitle, technicalSkills
            - one or more of them should applied
            **Example** : if the user selects the   
            **workingTime** is **part-time** and the **jobLocation** is **onsite** 
            , we need to return all jobs that match these conditions
            - apply authorization with the role ( User , Company_HR )
        7. Apply to Job
            - This API will add a new document in the application Collections with the new data
            - apply authorization with the role ( User )
            
    ## Bonus Points
        1. Add an endpoint that collects the applications for a specific company on a specific day and creates an **Excel sheet** with this data
*/

import slugify from "slugify";
import Job from "../../../database/models/job.model.js";
import Application from "../../../database/models/application.model.js";
import { AppError, asyncErrorHandler } from "../../utils/error.js";
import { createExcelSheet } from "../../utils/excel.js";

const addJob = asyncErrorHandler(async (req, res) => {
  const job = await Job.create({ ...req.body, addedBy: req.user.userId });
  if (!job) throw new AppError("fail", 400);

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

const getJobs = asyncErrorHandler(async (req, res) => {
  const {
    workingTime,
    jobLocation,
    seniorityLevel,
    jobTitle,
    technicalSkills,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};
  if (workingTime) filter.workingTime = workingTime;
  if (jobLocation) filter.jobLocation = jobLocation;
  if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
  if (jobTitle) filter.jobTitle = jobTitle;
  if (technicalSkills)
    filter.technicalSkills = { $in: technicalSkills.split(",") };

  const jobs = await Job.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({ message: "success", jobs });
});

const applyToJob = asyncErrorHandler(async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.user;

  const application = await Application.create({
    ...req.body,
    jobId,
    userId,
    userResume: req.file.path,
  });
  if (!application) throw new AppError("fail", 400);

  res.status(201).json({ message: "success", application });
});

const generateApplicantsSheet = asyncErrorHandler(async (req, res) => {
  const { date = new Date() } = req.query;
  const job = await Job.findOne({
    addedBy: req.user.userId,
    _id: req.params.jobId,
  });
  if (!job) throw new AppError("Job not found", 404);

  const targetDate = new Date(date);
  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  const applications = await Application.find({
    jobId: job._id,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate("userId", "userName email mobileNumber")
    .populate("jobId", "jobTitle");
  if (applications.length === 0)
    throw new AppError("There are no applicants for this job yet", 404);

  // Prepare data for Excel
  const data = applications.map((app) => ({
    Job: app.jobId.jobTitle,
    Name: app.userId.userName,
    Email: app.userId.email,
    Tech_Skills: app.userTechSkills.join(", "),
    Soft_Skills: app.userSoftSkills.join(", "),
    Resume: app.userResume,
    appliedAt: app.createdAt.toISOString().split("T")[0],
  }));

  createExcelSheet(data, "Applicants", slugify(job.jobTitle));

  res.status(200).json({ message: "success", applications });
});

export {
  addJob,
  updateJob,
  deleteJob,
  getJobsWithCompanyInfo,
  getJobsForSpecificCompany,
  getJobs,
  applyToJob,
  generateApplicantsSheet,
};
