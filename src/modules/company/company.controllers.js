/*
    # Company APIs
        1. Add company 
            - apply authorization with role ( Company_HR )
        2. Update company data
            - only the company owner can update the data
            - apply authorization with role (  Company_HR )
        3. Delete company data
            - only the company owner can delete the data
            - apply authorization with role ( Company_HR)
        4. Get company data 
            - send the companyId in params to get the desired company data
            - return all jobs related to this company
            - apply authorization with role ( Company_HR)
        5. Search for a company with a name. 
            - apply authorization with the role ( Company_HR and User)
        6. Get all applications for specific Job
            - each company Owner can take a look at the applications for his jobs only, he has no access to other companies’ application
            - return each application with the user data, not the userId
            - apply authorization with role (  Company_HR )
*/

import { AppError, asyncErrorHandler } from "../../utils/error.js";
import User from "../../../database/models/user.model.js";
import Company from "../../../database/models/company.model.js";

const addCompany = asyncErrorHandler(async (req, res) => {
  const loggedUser = await User.findOne({
    _id: req.user.userId,
    status: "online",
  });
  if (!loggedUser) throw new AppError("You have to login first", 401);

  const {
    companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
  } = req.body;

  const company = await Company.create({
    companyName,
    description,
    industry,
    address,
    numberOfEmployees,
    companyEmail,
    companyHR: loggedUser._id,
  });
  if (!company) throw new AppError("Company addition failed", 400);

  res.status(201).json({ message: "success", company });
});

const updateCompany = asyncErrorHandler(async (req, res) => {
  const company = await Company.create(req.body);
  if (!company) throw new AppError("Company not found", 404);
  res.status(200).json({ message: "success", company });
});
const deleteCompany = asyncErrorHandler(async (req, res) => {
  const company = await Company.create(req.body);
  if (!company) throw new AppError("Company not found", 404);
  res.status(200).json({ message: "success", company });
});
const getCompany = asyncErrorHandler(async (req, res) => {
  const company = await Company.find();
  if (!company) throw new AppError("Company not found", 404);
  res.status(200).json({ message: "success", company });
});
const SearchCompanyWithName = asyncErrorHandler(async (req, res) => {
  const company = await Company.find();
  if (!company) throw new AppError("Company not found", 404);
  res.status(200).json({ message: "success", company });
});
const getApplicationsByJob = asyncErrorHandler(async (req, res) => {
  const company = await Company.find();
  if (!company) throw new AppError("Company not found", 404);
  res.status(200).json({ message: "success", company });
});

export {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompany,
  SearchCompanyWithName,
  getApplicationsByJob,
};
