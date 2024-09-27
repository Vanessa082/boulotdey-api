import { Schema, model } from "mongoose";
import type { Document } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

// type _User = typeof userSchema.pathType;

export const UserModel = model("user", userSchema);

// const a: Schema<typeof UserModel> = {

// }

async () => {
  const user = await UserModel.create({
    lastName: "Edmund",
    firstName: "Rash",
    email: "rash@gmail.com",
  });
  // const data = await UserModel.findOne({
  //   email: "rash@gmail.com",
  // });

  // const _ = data?.toJSON();

  // _.
};
