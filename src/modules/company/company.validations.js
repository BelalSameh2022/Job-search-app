import joi from "joi";

const addCompanySchema = joi.object({
  companyName: joi.string().required().alphanum().min(3).max(20),
  description: joi.string().required(),
  industry: joi.string().required().min(3).max(50),
  address: joi.string().required().min(3).max(50),
  numberOfEmployees: joi.string().required().example("11-20"),
  companyEmail: joi.string().required().email(),
//   companyHR: joi.string().hex().length(24).required(),
});

export { addCompanySchema };
