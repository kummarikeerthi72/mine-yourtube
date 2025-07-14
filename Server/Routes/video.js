import express from "express";
import upload from "../Helper/filehelper.js";
import auth from "../middleware/auth.js";
import {
  uploadvideo,
  getallvideos
} from "../Controllers/video.js";
import { likevideocontroller } from "../Controllers/like.js";
import { viewscontroller } from "../Controllers/views.js";
import {
  historycontroller,
  deletehistory,
  getallhistorycontroller
} from "../Controllers/History.js";
import {
  watchlatercontroller,
  getallwatchlatervontroller,
  deletewatchlater
} from "../Controllers/watchlater.js";
import {
  likedvideocontroller,
  getalllikedvideo,
  deletelikedvideo
} from "../Controllers/likedvideo.js";

const routes = express.Router();

routes.post("/upload", upload.single("file"), auth, uploadvideo);
routes.get("/all", getallvideos);
routes.patch("/like/:id", auth, likevideocontroller);
routes.patch("/view/:id", viewscontroller);

routes.post("/history", auth, historycontroller);
routes.get("/history", getallhistorycontroller);
routes.delete("/history/:userid", auth, deletehistory);

routes.post("/watchlater", auth, watchlatercontroller);
routes.get("/watchlater", getallwatchlatervontroller);
routes.delete("/watchlater/:videoid/:viewer", auth, deletewatchlater);

routes.post("/likevideo", auth, likedvideocontroller);
routes.get("/likevideo", getalllikedvideo);
routes.delete("/likevideo/:videoid/:viewer", auth, deletelikedvideo);

export default routes;
