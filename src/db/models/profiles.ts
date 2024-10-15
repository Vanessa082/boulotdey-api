import { model, Schema } from "mongoose";

const profileSchema = new Schema(
  {
    userId: {
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
    coverLetter: {
      type: String,
      default: "",
    },
  },
  {}
);

export const ProfileModel = model("profile", profileSchema);
