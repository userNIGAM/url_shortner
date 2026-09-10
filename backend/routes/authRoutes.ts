import express from "express";
import { getMe, login, logout, register } from "../controllers/userController.ts";
import { protect } from "../middleware/authmiddleware.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/logout", logout);

router.post("/me", protect, getMe)
export default router;
