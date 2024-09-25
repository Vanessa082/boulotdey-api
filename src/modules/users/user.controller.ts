import { Request, Response } from "express";
import { APIResponse } from "../../interfaces/app";
import { UserRepo } from "./user.repo";

interface User {
  name: string;
};

class UserController {
  private userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }

  async getAll(req: Request, res: Response<APIResponse<User[]>>) {
    try {
      return res.status(200).json({
        message: "users retrieved",
        status: 200,
        data: (await this.userRepo.getAll()) as unknown as User[],
      });
    } catch (error) { }
  };

  async getOne(req: Request, res: Response<APIResponse<User[]>>) {
    try {
    } catch (error) { }
  };
}

export { UserController };
