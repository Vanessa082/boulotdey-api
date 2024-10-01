import type { Express } from "express";
import express from "express";
import cors from "cors";

import { APP_CONFIG, } from "./config";
import { authRouter, userRouter } from "./routes";
import { connectToDB } from "./db/connection";
import { AuthGuard } from "./modules/auth/auth.guard";

const authGuard = new AuthGuard();

const app: Express = express();

app.use(cors({
  origin: process.env.FRONT_END_URL
}));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", authGuard.currentUser.bind(authGuard), userRouter);

app.get("/health", (_, res) => {
  const date = new Date();
  res.status(200).json({
    message: "🚀 server up and running 🚀",
    time: `${date.toDateString()} | ${date.toLocaleTimeString()}`,
  });
});

app.get("*", (_, res) => {
  res.status(404).json({ message: "Route not found" });
});

connectToDB().finally(() => {
  app.listen(APP_CONFIG.port, () => {
    
    // UserModel.deleteMany({ role: "EMPLOYEE" })
    //   .then(console.log)
    //   .then(() => console.log("all users deleted"));

    console.log(
      `[Server]: running at ${APP_CONFIG.node_env === "dev" ? "http://localhost:" : ""}${APP_CONFIG.port}\n`
    );
  });
});
