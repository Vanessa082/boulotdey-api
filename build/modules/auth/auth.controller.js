"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_repo_1 = require("../users/user.repo");
const auth_service_1 = require("./auth.service");
class AuthController {
    userRepo;
    authService;
    constructor() {
        this.userRepo = new user_repo_1.UserRepo();
        this.authService = new auth_service_1.AuthService();
    }
    ;
    async createAccount(req, res) {
        const { firstName, lastName, email, phoneNumber, role, password, confirmPassword } = req.body;
        const existingUser = await this.userRepo.getByEmailAndPhoneNumber(email, phoneNumber);
        if (existingUser) {
            return res.status(401).json({
                message: "User already exists, please login",
                status: 401,
                data: null
            });
        }
        if (password !== confirmPassword) {
            return res.status(401).json({
                message: "Passwords do not match",
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
            password: hash,
            confirmPassword
        });
        const token = this.authService.jwtSign({
            _id: newUser._id.toString(),
            email: newUser.email,
            phoneNumber: newUser.phoneNumber
        });
        return res.status(200).json({
            message: "ok",
            status: 200,
            data: token,
        });
    }
    ;
    async loginWithEmail(req, res) {
        try {
            const { email, password } = req.body;
            const existingUser = await this.userRepo.getByEmail(email);
            if (!existingUser) {
                throw new Error("Invalid Email or Password");
            }
            const isMatch = this.authService.compare(password, existingUser.password);
            if (!isMatch) {
                throw new Error("Invalid Email or Password");
            }
            const token = this.authService.jwtSign({
                _id: existingUser._id.toString(),
                email: existingUser.email,
                phoneNumber: existingUser.phoneNumber
            });
            res.status(200).json({
                message: "all good",
                data: token,
                status: 200,
            });
        }
        catch (error) {
            console.error();
        }
    }
    ;
    /**
     * Will implement otp for phone numbers
    */
    async loginWithPhoneNumber(req, res) {
        return res.status(200).json({
            message: "still working on this",
            status: 200,
            data: "",
        });
    }
    getCurrentUser(req, res) {
        /**
         * req.user because authGuard.currentUser middleware injects the user
         * to the request object
        */
        const user = req.user;
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
}
exports.AuthController = AuthController;
