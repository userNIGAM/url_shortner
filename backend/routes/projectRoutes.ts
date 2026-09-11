import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import { createProject } from "../controllers/userController";

const router = express.Router();

router.post("/", authMiddleware, createProject);

export default router;
