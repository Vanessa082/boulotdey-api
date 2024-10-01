"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const auth_service_1 = require("./auth.service");
const user_repo_1 = require("../users/user.repo");
const app_utilities_1 = require("../../utils/app.utilities");
class AuthGuard {
    authService;
    userRepo;
    appUtilities;
    constructor() {
        this.authService = new auth_service_1.AuthService();
        this.userRepo = new user_repo_1.UserRepo();
        this.appUtilities = new app_utilities_1.AppUtilities();
    }
    async currentUser(req, res, next) {
        const token = req.headers?.authorization?.split(" ").pop();
        if (token) {
            const userPayload = this.authService.jwtVerify(token);
            if (userPayload) {
                const dbUser = await this.userRepo.getByEmail(userPayload.email);
                req.user = this.appUtilities.removeObjKeys(dbUser, ["password"]);
            }
        }
        ;
        next();
    }
}
exports.AuthGuard = AuthGuard;
