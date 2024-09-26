import type { Express } from "express";
import express from "express";
import cors from "cors";

import { NODE_ENV, PORT } from "./config";
import { authRouter, userRouter } from "./routes";
import { connectToDB } from "./db/connection";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.get("/health",(_,res) => {
  const date = new Date;
  res.status(200).json({
    message: "🚀 server up and running 🚀",
    time: `${date.toDateString} | ${date.toLocaleDateString}` 
  })
})

app.get("*", (_, res) => {
  res.status(404).json({ message: "Route not found" });
});

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `[Server]: running at ${NODE_ENV === "dev" ? "http://localhost:" : ""}${PORT}\n`
      );
    });
  });