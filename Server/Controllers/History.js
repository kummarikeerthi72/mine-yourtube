import history from "../Models/history.js";

export const addhistory = async (req, res) => {
  try {
    const { videoId } = req.body;
    const userId = req.userId;

    const existing = await history.findOne({ userId, videoId });
    if (!existing) {
      const newEntry = new history({ userId, videoId });
      await newEntry.save();
    }

    res.status(200).json({ message: "History updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const gethistoryvideos = async (req, res) => {
  // your logic here


  try {
    const userId = req.userId;
    const videos = await history.find({ userId }).populate("videoId");
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
