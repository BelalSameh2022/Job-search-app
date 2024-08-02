import joi from "joi";

const addJobSchema = joi.object({
  jobTitle: joi.string().required(),
  jobLocation: joi.string().required().valid("onsite", "remotely", "hybrid"),
  workingTime: joi.string().required().valid("part-time", "full-time"),
  seniorityLevel: joi
    .string()
    .required()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"),
  jobDescription: joi.string().required(),
  technicalSkills: joi.array().items(joi.string()).required(),
  softSkills: joi.array().items(joi.string()).required(),
  //   addedBy: joi.string().hex().length(24).required(),
});

const updateJobSchema = joi.object({
  jobTitle: joi.string(),
  jobLocation: joi.string().valid("onsite", "remotely", "hybrid"),
  workingTime: joi.string().valid("part-time", "full-time"),
  seniorityLevel: joi
    .string()
    .valid("Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"),
  jobDescription: joi.string(),
  technicalSkills: joi.array().items(joi.string()),
  softSkills: joi.array().items(joi.string()),
  //   addedBy: joi.string().hex().length(24),
});

const applyToJobSchema = joi.object({
  technicalSkills: joi.array().items(joi.string()).required(),
  softSkills: joi.array().items(joi.string()).required(),
  userResume: joi.string().required(),
});

export { addJobSchema, updateJobSchema, applyToJobSchema };
