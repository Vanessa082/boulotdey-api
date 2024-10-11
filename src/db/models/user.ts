import mongoose, { Schema, model, SchemaOptions } from "mongoose";

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

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: { type: String, enum: ["Independent", "Full-Time", "Part-Time", "Apprenticeship", "Casual", "Temporary"], required: true },
  deadline: { type: Date, required: true },
  personsNeeded: { type: Number, required: true, min: 1 },
  salaryRange: { type: String, enum: ["100,000 - 200,000 FCFA", "200,000 - 400,000 FCFA", "400,000 - 600,000 FCFA", "600,000+ FCFA"], required: true },
  negotiable: { type: Boolean, default: false },
  experienceRequired: { type: String, enum: ["0-2 years", "2-5 years", "5+ years"], required: true },
  education: { type: String },
  benefits: { type: [String] },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  category: { type: String, enum: ["Hospitality", "Trade Artisan", "Personal or Domestic", "Entertainment", "Security", "Transport", "Other"], required: true },
  skills: { type: [String] },
  otherSkills: { type: String },
  jobImage: { type: String },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: true });

export const UserModel = model("user", userSchema);
export const JobModel = model("job", jobSchema);
