import passport from "passport";
import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userController = new UserController();

const router = Router(); 

router.post("/register", userController.register);
router.post("/login", await userController.login);
router.get("/current", passport.authenticate("jwt", {session: false}), userController.current);
router.post("/logout", userController.logout);
export default router;