import { Router } from "express";
import { UserController } from "../../modules/users/user.controller";

const router = Router();

const userController = new UserController();

router.get("/", userController.getAll.bind(userController));

router.get("/:id", userController.getOne.bind(userController));

router.patch("/:id", userController.updateUser.bind(userController));

export default router;
