import Video from "../Models/videofile.js";

// Upload a video
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
      viewer: req.userid,
    });

    await newVideo.save();
    res.status(200).json({ mess: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Upload Video Error:", error.message);
    res.status(500).json({ mess: "Something went wrong..." });
  }
};

// Get all videos
export const getallvideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Get All Videos Error:", error.message);
    res.status(500).json({ mess: "Failed to fetch videos" });
  }
};
