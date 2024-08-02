/*
    ## Application Collection
        1. jobId ( the Job Id )
        2. userId ( the applier Id )
        3. userTechSkills ( array of the applier technical Skills )
        4. userSoftSkills ( array of the applier soft Skills )
        5. userResume ( must be pdf , upload this pdf on cloudinary )
*/

import { model, Schema, Types } from "mongoose";

const applicationSchema = new Schema(
  {
    jobId: {
      type: Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    userTechSkills: {
      type: [String],
      required: true,
    },
    userSoftSkills: {
      type: [String],
      required: true,
    },
    userResume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Application = model("Application", applicationSchema);

export default Application;
