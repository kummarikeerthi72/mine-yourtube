// controllers/video.js
import Video from "../Models/videofile.js";

// ✅ Upload video
export const uploadvideo = async (req, res) => {
  try {
    const { videotitle, videochanel, videodesc } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ mess: "No file uploaded" });
    }

    if (file.mimetype !== "video/mp4") {
      return res.status(400).json({ mess: "Please upload a .mp4 video file only" });
    }

    const newVideo = new Video({
      videotitle,
      videochanel,
      videodesc,
      videourl: `/uploads/${file.filename}`,
      filepath: `uploads/${file.filename}`,
      viewer: req.userid,
      Like: 0,
      views: 0,
    });

    await newVideo.save();
    res.status(200).json({ mess: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Upload Video Error:", error.message);
    res.status(500).json({ mess: "Something went wrong..." });
  }
};

// ✅ Get all videos
export const getallvideo = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch videos", error: error.message });
  }
};

// ✅ Get single video WITHOUT increasing views
export const getvideobyid = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Increment views separately
export const viewVideo = async (req, res) => {
  try {
    const video = await Videofile.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    video.views += 1; // ✅ increment
    await video.save();

    res.status(200).json({ views: video.views }); // ✅ returning updated count
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Like / Dislike
export const likevideocontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    if (action === "like") {
      video.Like = (video.Like || 0) + 1;
    } else if (action === "dislike") {
      video.Like = Math.max((video.Like || 0) - 1, 0);
    }

    await video.save();
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: "Error updating like count", error: error.message });
  }
};
