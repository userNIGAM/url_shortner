import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import { createProject, getProjects } from "../controllers/userController";
import {
  deleteProject,
  getProject,
  updateProject,
} from "./../controllers/projectsController";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("owner", "admin"),
  createProject,
);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProject);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("owner", "admin"),
  updateProject,
);
router.delete("/:id", authMiddleware, roleMiddleware("owner"), deleteProject);

export default router;
