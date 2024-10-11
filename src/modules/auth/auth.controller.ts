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
  }

  async createAccount(req: Request, res: Response<APIResponse<string | null>>) {
    const { email, phoneNumber, roles, password, confirmPassword } =
      req.body as User;

    console.log(req.body);

    const existingUser = await this.userRepo.getByEmailAndPhoneNumber(
      email,
      phoneNumber!
    );

    if (existingUser) {
      console.log("Email already exists:", email);
      return res.status(409).json({
        message: "User already exists, please login",
        status: 409,
        data: null,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        status: 400,
        data: null,
      });
    }

    const hash = await this.authService.hash(password);

    const newUser = await this.userRepo.create({
      email,
      phoneNumber,
      roles,
      password: hash,
      confirmPassword,
    });

    const token = this.authService.jwtSign({
      _id: newUser._id.toString(),
      email: newUser.email!,
      phoneNumber: newUser.phoneNumber,
    } as any);

    return res.status(200).json({
      message: "ok",
      status: 200,
      data: token,
    });
  }

  async loginWithEmail(req: Request, res: Response<APIResponse<string>>) {
    try {
      const { email, password } = req.body as User;
      const existingUser = await this.userRepo.getByEmail(email);
      if (!existingUser) {
        console.log("yoyo");
        throw new Error("Invalid Email or Password");
      }

      const isMatch = this.authService.compare(
        password,
        existingUser.password!
      );

      if (!isMatch) {
        throw new Error("Invalid Email or Password");
      }

      const token = this.authService.jwtSign({
        _id: existingUser._id.toString(),
        email: existingUser.email!,
        phoneNumber: existingUser.phoneNumber,
      });

      res.status(200).json({
        message: "all good",
        data: token,
        status: 200,
      });
    } catch (error) {
      console.error();
    }
  }

  /**
   * Will implement otp for phone numbers
   */
  async loginWithPhoneNumber(req: Request, res: Response<APIResponse<string>>) {
    return res.status(200).json({
      message: "still working on this",
      status: 200,
      data: "",
    });
  }

  getCurrentUser(req: Request, res: Response<APIResponse<User | null>>) {
    /**
     * req.user because authGuard.currentUser middleware injects the user
     * to the request object
     */
    const user = (req as unknown as { user?: User }).user;

    if (!user)
      return res.status(404).json({
        message: "could not find current user",
        status: 404,
        data: null,
      });

    return res.status(200).json({
      message: "current user retrieved",
      status: 200,
      data: user,
    });
  }

  // async requestPasswordReset(req: Request, res: Response<APIResponse<string>>) {
  //   const { email } = req.body as User;
  //   const user = await this.userRepo.getByEmail(email);
  //   if (!user) return res.status(404).json({
  //     message: "User not FOund",
  //     status: 404,
  //     data: ""
  //   })
  // }
}

export { AuthController };
