import joi from "joi";

const signUpSchema = joi.object({
  firstName: joi.string().required().alphanum(),
  lastName: joi.string().required().alphanum(),
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}&/),
  mobileNumber: joi.string().required(),
  recoveryEmail: joi.string().required().email(),
  dateOfBirth: joi
    .string()
    .required()
    .pattern(/^[0-9]{4}-([1-9]|10|11|12)-([0-2][0-9]|30|31)$/),
});

const signInSchema = joi.object({
  identifier: joi.string().required(),
  password: joi
    .string()
    .required()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}&/),
});

export { signUpSchema, signInSchema };
