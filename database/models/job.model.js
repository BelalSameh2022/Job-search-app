/*
    ## Job Collection
        1. jobTitle ( Like **NodeJs back-end developer** )
        2. jobLocation ( **onsite, remotely, hybrid** )
        3. workingTime ( **part-time , full-time** )
        4. seniorityLevel ( enum of **Junior, Mid-Level, Senior,Team-Lead, CTO** )
        5. jobDescription ( identify what is the job and what i will do i accepted )
        6. technicalSkills ( array of skills, like  **nodejs  , typescript** ,…)
        7. softSkills (array of Skills , like **time management , team worker,**.. )
        8. addedBy( what is the **companyHrId** who is added this job)
*/

import { model, Schema, Types } from "mongoose";

const jobSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    jobLocation: {
      type: String,
      required: true,
      enum: ["onsite", "remotely", "hybrid"],
    },
    workingTime: {
      type: String,
      required: true,
      enum: ["part-time", "full-time"],
    },
    seniorityLevel: {
      type: String,
      required: true,
      enum: ["Junior", "Mid-Level", "Senior", "Team-Lead", "CTO"],
    },
    jobDescription: {
      type: String,
      required: true,
    },
    technicalSkills: {
      type: [String],
      required: true,
    },
    softSkills: {
      type: [String],
      required: true,
    },
    addedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.virtual("company", {
  ref: "Company",
  localField: "addedBy",
  foreignField: "companyHR",
});

const Job = model("Job", jobSchema);

export default Job;
