import { AppError } from "../utils/error.js";
import User from "../../database/models/user.model.js";
import Company from "../../database/models/company.model.js";
import Application from "../../database/models/application.model.js";

const checkIfUser = async (req, res, next) => {
  const { email, mobileNumber } = req.body;
  const user = await User.findOne({ $or: [{ email }, { mobileNumber }] });
  if (user)
    next(
      new AppError(
        "User already exists: change your email or mobile number",
        409
      )
    );
  next();
};

const checkIfCompany = async (req, res, next) => {
  const { companyName, companyEmail } = req.body;
  const company = await Company.findOne({ $or: [{ companyName }, { companyEmail }] });
  if (company)
    next(
      new AppError(
        "Company already exists: change your company name or email",
        409
      )
    );
  next();
};

const checkIfApplied = async (req, res, next) => {
  const { jobId } = req.params;
  const { userId } = req.user;
  
  const application = await Application.findOne({ jobId, userId });
  console.log(application);
  if (application)
    next(
      new AppError(
        "You're already applied",
        409
      )
    );
  next();
};

export { checkIfUser, checkIfCompany, checkIfApplied };
