import joi from "joi";

const addCompanySchema = joi.object({
  companyName: joi.string().required().pattern(/^[a-zA-Z0-9 ]{3,20}$/),
  description: joi.string().required(),
  industry: joi.string().required().min(3).max(50),
  address: joi.string().required().min(3).max(50),
  numberOfEmployees: joi.string().required().pattern(/^\d{2}-\d{2}$/),
  companyEmail: joi.string().required().email(),
//   companyHR: joi.string().hex().length(24).required(),
});

const updateCompanySchema = joi.object({
  companyName: joi.string().pattern(/^[a-zA-Z0-9 ]{3,20}$/),
  description: joi.string(),
  industry: joi.string().min(3).max(50),
  address: joi.string().min(3).max(50),
  numberOfEmployees: joi.string().pattern(/^\d{2}-\d{2}$/),
  companyEmail: joi.string().email(),
//   companyHR: joi.string().hex().length(24),
});

export { addCompanySchema, updateCompanySchema };
