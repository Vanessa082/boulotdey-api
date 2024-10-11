import { config } from "dotenv";

config();

export const APP_CONFIG = {
  port: process.env.PORT!,
  node_env: (process.env.NODE_ENV as "prod" | "dev") || "prod",
  front_end_url: process.env.FRONT_END_URL!,
};

export const JWT_CONFIG = {
  expiration_time: process.env.JWT_EXPIRATION_TIME!,
  secrete: process.env.JWT_SECRETE!,
};

export const SALT_ROUNDS = process.env.SALT_ROUNDS!;
