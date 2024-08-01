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

export { addJobSchema };
