import express from "express";
import {
  getDashboard,
  getMe,
  login,
  logout,
  register,
} from "../controllers/userController.ts";
import authMiddleware from "../middleware/authmiddleware.ts";
import { roleMiddleware } from "../middleware/roleMiddleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/dashboard", authMiddleware, getDashboard);

router.post("/logout", logout);

router.get("/me", authMiddleware, getMe);
export default router;
