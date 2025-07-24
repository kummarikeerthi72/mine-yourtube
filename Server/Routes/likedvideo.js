import express from "express";
import {
  addtolikedvideo,
  getalllikedvideo,
  deletelikedvideo,
} from "../Controllers/likedvideo.js";

const router = express.Router();

router.post("/add", addtolikedvideo);
router.get("/get", getalllikedvideo);
router.delete("/delete/:videoid/:viewer", deletelikedvideo);

export default router;
