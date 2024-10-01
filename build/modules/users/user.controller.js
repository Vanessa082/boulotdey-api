"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_repo_1 = require("./user.repo");
class UserController {
    userRepo;
    constructor() {
        this.userRepo = new user_repo_1.UserRepo();
    }
    async getAll(req, res) {
        try {
            const users = (await this.userRepo.getAll());
            return res.status(200).json({
                message: "users retrieved",
                status: 200,
                data: {
                    total: users.length,
                    users,
                },
            });
        }
        catch (error) { }
    }
    async getOne(req, res) {
        try {
        }
        catch (error) { }
    }
}
exports.UserController = UserController;
