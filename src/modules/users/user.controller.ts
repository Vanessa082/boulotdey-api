import { Request, Response } from "express";
import { APIResponse } from "../../interfaces/app";
import { UserRepo } from "./user.repo";
import { User, UserRoles } from "./types/types";
import mongoose from "mongoose";
class UserController {
  private userRepo: UserRepo;

  constructor() {
    this.userRepo = new UserRepo();
  }

  async getAll(
    req: Request,
    res: Response<APIResponse<{ total: number; users: User[] }>>
  ) {
    try {
      const users = (await this.userRepo.getAll()) as unknown as User[];

      return res.status(200).json({
        message: "users retrieved",
        status: 200,
        data: {
          total: users.length,
          users,
        },
      });
    } catch (error) {
      return res.status(400).json({
        message: (error as { message: string }).message,
        status: 400,
        data: null,
      });
    }
  }

  async getOne(req: Request, res: Response<APIResponse<User[]>>) {
    try {
    } catch (error) {}
  }

  async updateUser(req: Request, res: Response<APIResponse<Partial<User>>>) {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid user ID format",
        status: 400,
        data: null,
      });
    }
    const update: Partial<User> = req.body;

    const user = await this.userRepo.getOne(id);

    try {
      if (!user) {
        return res.status(401).json({
          message: "Invalid user",
          status: 401,
          data: null,
        });
      }

      if (update.roles) {
        const validRoles: UserRoles[] = ["ADMIN", "EMPLOYEE", "EMPLOYER"];
        update.roles = update.roles.filter((role) => validRoles.includes(role));
      }

      const updateUser = await this.userRepo.updateOne(id, update);

      res.json({
        message: "User updated successfully",
        status: 200,
        data: updateUser,
      });
    } catch (error) {}
  }
}

export { UserController };
