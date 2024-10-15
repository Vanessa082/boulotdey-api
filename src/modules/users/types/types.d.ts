import { UserModel } from "../../../db/models/user";

type UserRoles = "ADMIN" | "EMPLOYEE" | "EMPLOYER";
type UserVerificationStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
type EmployerType = "PERSONAL"|"BUSINESS"|"COMPANY";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  roles: UserRoles[];
  employerType: EmployerType[],
  password: string;
  confirmPassword: string;
  veificationStatus: UserVerificationStatus;
  createAt?: Date | string;
  updatedAt?: Date | string;
}

export type { User, UserRoles, UserVerificationStatus, EmployerType};
