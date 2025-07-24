import express from "express";
import upload from "../Helper/filehelper.js";
import auth from "../middleware/auth.js";

import {
  uploadvideo,
  getallvideo,
  getvideobyid,
  likevideocontroller,
  viewVideo, // ✅ Correct function
} from "../Controllers/video.js";

const router = express.Router();

router.get("/single/:id", getvideobyid);
router.post("/uploadvideo", upload.single("file"), auth, uploadvideo);
router.get("/all", getallvideo);
router.patch("/like/:id", auth, likevideocontroller);
router.put("/views/:id", viewVideo); // ✅ FIXED: directly use viewVideo

export default router;
