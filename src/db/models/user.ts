import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
      default: "",
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    roles: {
      type: [String],
      enum: ["ADMIN", "EMPLOYEE", "EMPLOYER"],
      default: ["EMPLOYEE"],
    },

    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
      require: true,
    },
    verificationStatus: {
      type: String,
      enum: ["UNVERIFIED", "PENDING", "VERIFIED", "REJECTED"],
      default: "UNVERIFIED",
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    skills: {
      default: [String],
    },
    language: {
      default: [String],
    },
    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    resume: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
  },
  {}
);

export const UserModel = model("user", userSchema);

