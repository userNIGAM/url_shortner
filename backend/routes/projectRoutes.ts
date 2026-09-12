import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import { createProject, getProjects } from "../controllers/userController";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

export default router;
