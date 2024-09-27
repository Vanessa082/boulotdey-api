import { Request, Response } from "express";
import { APIResponse } from "../../interfaces/app";
import { UserRepo } from "../users/user.repo";
import { AuthService } from "./auth.service";
import type { User } from "../users/types/types.d";
class AuthController {
  private userRepo: UserRepo;
  private authService: AuthService;

  constructor() {
    this.userRepo = new UserRepo();
    this.authService = new AuthService();
  };

  async loginWithEmail(req: Request, res: Response<APIResponse<string>>) {
    try {
      const { email, password } = req.body as User;
      const existingUser = await this.userRepo.getByEmail(email);

      if (!existingUser) {
        throw new Error("Invalid Email or Password");
      }

      const isMatch = this.authService.compare(password, existingUser.password!);

      if (!isMatch) {
        throw new Error("Invalid Email or Password")
      }

      const token = this.authService.jwtSign({
        _id: existingUser._id.toString(),
        email: existingUser.email!,
        phoneNumber: existingUser.phoneNumber
      })

      res.status(200).json({
        message: "all good",
        data: token,
        status: 200,
      });
    } catch (error) {
      console.error()
    }
  };

  async loginWithPhoneNumber(req: Request, res: Response<APIResponse<string>>) {
    return res.status(200).json({
      message: "still working on this",
      status: 200,
      data: "",
    });
  }

  async createAccount(
    req: Request,
    res: Response<APIResponse<string | null>>
  ) {
    const { firstName, lastName, email, phoneNumber, role, password } = req.body as User;
    const existingUser = await this.userRepo.getByEmailAndPhoneNumber(email, phoneNumber!);

    if (existingUser) {
      return res.status(401).json({
        message: "User already exists, please login",
        status: 401,
        data: null
      });
    }

    const hash = await this.authService.hash(password);

    const newUser = await this.userRepo.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password: hash
    });

    const token = this.authService.jwtSign({
      _id: newUser._id.toString(),
      email: newUser.email!,
      phoneNumber: newUser.phoneNumber
    });

    return res.json({
      message: "ok",
      status: 200,
      data: token,
    });
  };
}

export { AuthController };
