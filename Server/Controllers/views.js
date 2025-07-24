import videofile from "../Models/videofile.js";
import mongoose from "mongoose";

export const viewscontroller = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Video unavailable.");
  }

  try {
    const video = await videofile.findById(_id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.views += 1;
    const updatedVideo = await video.save();

    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: "Error updating views", error: error.message });
  }
};
