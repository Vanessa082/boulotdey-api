import { Schema, model, SchemaOptions } from "mongoose";

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
    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE", "EMPLOYER"],
      default: "EMPLOYEE",
    },
    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true
  },
);

export const UserModel = model("user", userSchema);
