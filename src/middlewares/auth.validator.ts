import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const createAccountSchema = Joi.object({
  email: Joi.string().email().required(),
  roles: Joi.array()
    .items(Joi.string().valid("ADMIN", "EMPLOYEE", "EMPLOYER"))
    .default(["EMPLOYEE"]),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Confirm Password must match Password" }),
  verificationStatus: Joi.string().valid("UNVERIFIED", "PENDING", "VERIFIED", "REJECTED").default("UNVERIFIED"),
  phoneNumber: Joi.string()
    .pattern(/^6\d{8}$/)
    .message("Phone number must start with '6' followed by exactly 8 digits"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

class AuthValidator {
  validateCreateAccount(req: Request, res: Response, next: NextFunction) {
    const { error, value } = createAccountSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }

  validateLoginWithEmail(req: Request, res: Response, next: NextFunction) {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }
}

export default AuthValidator;
