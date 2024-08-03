import joi from "joi";

const signUpSchema = joi.object({
  firstName: joi.string().required().alphanum().min(3).max(20),
  lastName: joi.string().required().alphanum().min(3).max(20),
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  mobileNumber: joi
    .string()
    .required()
    .pattern(/^(\+20|0020|0)?1[0125]\d{8}$/),
  recoveryEmail: joi.string().required().email(),
  dateOfBirth: joi
    .string()
    .required()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .message("Date must be on format yyyy-mm-dd"),
  role: joi.string().valid("User", "Company_HR"),
});

const signInSchema = joi.object({
  identifier: joi.string().required(),
  password: joi
    .string()
    .required()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
});

const updateAccountSchema = joi.object({
  firstName: joi.string().alphanum().min(3).max(20),
  lastName: joi.string().alphanum().min(3).max(20),
  email: joi.string().email(),
  mobileNumber: joi.string().pattern(/^(\+20|0020|0)?1[0125]\d{8}$/),
  recoveryEmail: joi.string().email(),
  dateOfBirth: joi
    .string()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .message("Date must be on format yyyy-mm-dd"),
});

const updatePasswordSchema = joi.object({
  newPassword: joi
    .string()
    .required()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  confirmNewPassword: joi.valid(joi.ref("newPassword")).required(),
});

const forgetPasswordSchema = joi.object({
  identifier: joi.string().required(),
});

const confirmOtpSchema = joi.object({
  OTP: joi.string().required().length(5),
});

const resetPasswordSchema = joi.object({
  identifier: joi.string().required(),
  newPassword: joi
    .string()
    .required()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/),
  confirmNewPassword: joi.valid(joi.ref("newPassword")).required(),
});

export {
  signUpSchema,
  signInSchema,
  updateAccountSchema,
  updatePasswordSchema,
  forgetPasswordSchema,
  confirmOtpSchema,
  resetPasswordSchema,
};
