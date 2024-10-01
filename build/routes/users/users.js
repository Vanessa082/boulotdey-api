"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../modules/users/user.controller");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.get("/", userController.getAll.bind(userController));
router.get("/:id", userController.getOne.bind(userController));
exports.default = router;
