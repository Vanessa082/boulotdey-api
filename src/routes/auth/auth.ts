import { Router } from "express";
import { AuthController } from "../../modules/auth/auth.controller";
import { AuthGuard } from "../../modules/auth/auth.guard";

const router = Router();

const authController = new AuthController();
const authGuard = new AuthGuard();

router.post(
  "/create-account",
  authController.createAccount.bind(authController)
);

router.post("/login/email", authController.loginWithEmail.bind(authController));

router.post("/login/phone", authController.loginWithPhoneNumber.bind(authController));

router.get("/current-user",
  authGuard.currentUser.bind(authGuard),
  authController.getCurrentUser.bind(authController),
);

export default router;
