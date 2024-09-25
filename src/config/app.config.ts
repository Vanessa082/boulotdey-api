import { config } from "dotenv";

config();

export const PORT = process.env.PORT!;

export const NODE_ENV = (process.env.NODE_ENV as "prod" | "dev") || "prod";

export const JWT_CONFIG = {
  expiration_time: "",
  secrete: "",
};
