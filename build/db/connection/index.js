"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
const connectToDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.DB_STRING, {
            autoIndex: true,
        });
        console.log("\nDB connected to Atlas\n");
    }
    catch (error) {
        console.error("Failed to connect to Atlas", error);
    }
};
exports.connectToDB = connectToDB;
