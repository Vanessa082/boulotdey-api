"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
        default: "",
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["ADMIN", "EMPLOYEE", "EMPLOYER"],
        default: "EMPLOYEE",
    },
    password: {
        type: String,
        require: true,
    },
    confirmPassword: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_1.model)("user", userSchema);
