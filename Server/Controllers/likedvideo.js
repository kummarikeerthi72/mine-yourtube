import Likedvideo from "../Models/likevideo.js";
import Videofile from "../Models/videofile.js";

export const getalllikedvideo = async (req, res) => {
  try {
    const liked = await Likedvideo.find();

    const videoPromises = liked.map(async (item) => {
      const video = await Videofile.findById(item.videoid);
      return video;
    });

    const videos = await Promise.all(videoPromises);
    res.status(200).json(videos.filter(v => v !== null));
  } catch (error) {
    res.status(500).json({ message: "Error fetching liked videos", error: error.message });
  }
};
