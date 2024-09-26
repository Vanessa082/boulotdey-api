import { UserModel } from "../../../db/models/user";

type UserRoles = "ADMIN" | "EMPLOYEE" | "EMPLOYER"

interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: UserRoles;
  password: String;
  createAt?: Date | string;
  updatedAt?: Date | string;
}

export type {
  User,
  UserRoles
}

