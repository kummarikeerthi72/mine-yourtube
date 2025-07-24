import mongoose from "mongoose";
import Videofile from "../Models/videofile.js";

export const likevideocontroller = async (req, res) => {
  const { id: videoId } = req.params;
  const { viewer } = req.body;

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return res.status(400).json({ message: "Invalid video ID" });
  }

  try {
    const video = await Videofile.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (!video.Like) video.Like = [];

    const alreadyLiked = video.Like.includes(viewer);

    if (alreadyLiked) {
      video.Like = video.Like.filter((v) => v !== viewer); // unlike
    } else {
      video.Like.push(viewer); // like
    }

    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error toggling like", error: error.message });
  }
};
