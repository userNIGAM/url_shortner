import express from "express";
import authMiddleware from "../middleware/authmiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import {deleteMember, 
  createMember,
  getMembers,
  updateMemberRole,
} from "../controllers/memberController";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("owner"), createMember);
router.get("/", authMiddleware, roleMiddleware("owner", "admin"), getMembers);
router.put("/:id", authMiddleware, roleMiddleware("owner"), updateMemberRole);
router.delete("/:id", authMiddleware, roleMiddleware("owner"), deleteMember);

export default router;
