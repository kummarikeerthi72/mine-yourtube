// Server/Routes/group.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  createGroup,
  addMemberToGroup,
  searchGroups,
} from "../Controllers/group.js";

const router = express.Router();

router.post("/create", auth, createGroup);
router.put("/:id/add", auth, addMemberToGroup);
router.get("/search", searchGroups);

export default router;
