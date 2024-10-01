"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SALT_ROUNDS = exports.JWT_CONFIG = exports.APP_CONFIG = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.APP_CONFIG = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV || "prod",
    front_end_url: process.env.FRONT_END_URL
};
exports.JWT_CONFIG = {
    expiration_time: process.env.JWT_EXPIRATION_TIME,
    secrete: process.env.JWT_SECRETE,
};
exports.SALT_ROUNDS = process.env.SALT_ROUNDS;
