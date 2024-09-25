import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["ADMIN", "EMPLOYEE", "EMPLOYER"],
    default: "EMPLOYEE",
  }
}, {
  timestamps: true,
});

export const UserModel = model("user", userSchema);

(async () => {
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
});