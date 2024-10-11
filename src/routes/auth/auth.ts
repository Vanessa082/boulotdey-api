import { Router } from "express";
import { AuthController } from "../../modules/auth/auth.controller";
import { AuthGuard } from "../../modules/auth/auth.guard";
import AuthValidator from "../../middlewares/auth.validator";

const router = Router();

const authValidator = new AuthValidator();
const authController = new AuthController();
const authGuard = new AuthGuard();

router.post(
  "/create-account",
  authValidator.validateCreateAccount.bind(authValidator),
  authController.createAccount.bind(authController)
);

router.post(
  "/login/email",
  authValidator.validateLoginWithEmail.bind(authValidator),
  authController.loginWithEmail.bind(authController)
);

router.post(
  "/login/phone",
  authController.loginWithPhoneNumber.bind(authController)
);

router.get(
  "/current-user",
  authGuard.currentUser.bind(authGuard),
  authController.getCurrentUser.bind(authController)
);

export default router;
