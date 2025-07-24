import express from "express";
import auth from "../middleware/auth.js";
import { postcomment } from "../Controllers/Comment.js"; // Ensure file name matches case

const router = express.Router();
router.post("/post", auth, postcomment);

export default router;
