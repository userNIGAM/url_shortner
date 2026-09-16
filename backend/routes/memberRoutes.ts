import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { createMember, getMembers } from "../controllers/memberController";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("owner"), createMember);
router.get("/", authMiddleware, roleMiddleware("owner", "admin"), getMembers);

export default router;
