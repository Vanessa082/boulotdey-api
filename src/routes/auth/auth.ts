import { Router } from "express";
import { AuthController } from "../../modules/auth/auth.controller";

const router = Router();

const authController = new AuthController();

router.post(
  "/create-account",
  authController.createAccount.bind(authController)
);

router.post("/login/email", authController.loginWithEmail.bind(authController));

router.post("/login/phone", authController.loginWithPhoneNumber.bind(authController));

export default router;
