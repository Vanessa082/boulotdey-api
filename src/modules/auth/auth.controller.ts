import { Request, Response } from "express";
import { APIResponse } from "../../interfaces/app";
import { UserRepo } from "../users/user.repo";

class AuthController {
  private userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }

  login(req: Request, res: Response<APIResponse<string>>) {
    try {
      const token = "jwt stuff after login user in";

      res.status(200).json({
        message: "all good",
        data: token,
        status: 200,
      });
    } catch (error) {
      //
    }
  };

  async createAccount(
    req: Request,
    res: Response<APIResponse<any>>
  ) {
    const { firstName, email } = req.body as { firstName: string; email: string; };

    const newUser = await this.userRepo.create({ firstName, email, lastName: "" })

    return res.json({
      message: "ok",
      status: 200,
      data: newUser
    });

    try {
      const token = "jwt stuff after saving user to db";

      res.status(200).json({
        message: "all good",
        data: token,
        status: 200,
      });
    } catch (error) {
      //
    }
  };
}

export { AuthController };
