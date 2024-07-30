/*
    ## User Collection
        1. firstName 
        2. lastName
        3. username ( firstName + lastName) 
        4. email ⇒ ( unique )
        5. password
        6. recoveryEmail ⇒ (not unique)
        7. DOB (date of birth, must be date format 2023-12-4)
        8. mobileNumber ⇒ (unique)
        9. role ⇒ (User, Company_HR )
        10. status (online, offline)
*/

import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    userName: {
      type: String,
      default: function () {
        return this.firstName + " " + this.lastName;
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    recoveryEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "company_HR"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = model("User", userSchema);

export default User;
