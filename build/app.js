"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const routes_1 = require("./routes");
const connection_1 = require("./db/connection");
const auth_guard_1 = require("./modules/auth/auth.guard");
const authGuard = new auth_guard_1.AuthGuard();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONT_END_URL
}));
app.use(express_1.default.json());
app.use("/auth", routes_1.authRouter);
app.use("/users", authGuard.currentUser.bind(authGuard), routes_1.userRouter);
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
(0, connection_1.connectToDB)().finally(() => {
    app.listen(config_1.APP_CONFIG.port, () => {
        // UserModel.deleteMany({ roles: "EMPLOYEE" })
        //   .then(console.log)
        //   .then(() => console.log("all users deleted"));
        console.log(`[Server]: running at ${config_1.APP_CONFIG.node_env === "dev" ? "http://localhost:" : ""}${config_1.APP_CONFIG.port}\n`);
    });
});
