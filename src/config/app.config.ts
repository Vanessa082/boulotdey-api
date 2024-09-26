import { config } from "dotenv";

config();

export const PORT = process.env.PORT!;

export const NODE_ENV = (process.env.NODE_ENV as "prod" | "dev") || "prod";

export const JWT_CONFIG = {
  expiration_time: "process.env.JWT_EXPIRATION_TIME",
  secrete: "process.env.JWT_SECRETE",
};

export const SALT_ROUNDS = process.env.SALT_ROUNDS!