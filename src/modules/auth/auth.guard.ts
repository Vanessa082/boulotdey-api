import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../../interfaces/app";
import { AuthService } from "./auth.service";
import { UserRepo } from "../users/user.repo";
import { User } from "../users/types/types";
import { AppUtilities } from "../../utils/app.utilities";

class AuthGuard {
  private authService: AuthService;
  private userRepo: UserRepo;
  private appUtilities: AppUtilities;

  constructor() {
    this.authService = new AuthService();
    this.userRepo = new UserRepo();
    this.appUtilities = new AppUtilities();
  }

  async currentUser(req: Request, res: Response<APIResponse<string>>, next: NextFunction) {
    const token = req.headers?.authorization?.split(" ").pop() as string;
    if (token) {
      const userPayload = this.authService.jwtVerify(token);

      if (userPayload) {
        const dbUser = await this.userRepo.getByEmail(userPayload.email);

        (req as unknown as { user: any }).user = this.appUtilities.removeObjKeys(dbUser!, ["password"]);
      }
    };

    next();
  }
}

export { AuthGuard };
