/*
    ## Company Collection
        1. companyName ⇒ ( unique )
        2. description (Like what are the actual activities and services provided by the company ? )
        3. industry ( Like Mental Health care )
        4. address
        5. numberOfEmployees ( must be range such as 11-20 employee)
        6. companyEmail ⇒ ( unique )
        7. companyHR ( userId )
*/

import { model, Schema, Types } from "mongoose";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfEmployees: {
      type: Number,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    companyHR: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Company = model("Company", companySchema);

export default Company;
