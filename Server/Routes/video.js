import express from "express";
import upload from "../Helper/filehelper.js";
import auth from "../middleware/auth.js";

import {
  uploadvideo,
  getallvideo,
  getvideobyid,
  likevideocontroller,
  viewVideo,
} from "../Controllers/video.js";

const router = express.Router();

router.get("/single/:id", getvideobyid);
router.post("/uploadvideo", upload.single("file"), auth, uploadvideo);
router.patch("/like/:id", auth, likevideocontroller);
router.put("/views/:id", viewVideo);
router.get("/get", getallvideo);  // this route serves the videos list

export default router;
