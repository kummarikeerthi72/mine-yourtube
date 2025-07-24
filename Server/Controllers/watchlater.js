import Watchlater from "../Models/watchlater.js";

export const watchlatercontroller = async (req, res) => {
  try {
    const { videoid, viewer } = req.body;

    const exists = await Watchlater.findOne({ videoid, viewer });
    if (exists) {
      return res.status(400).json({ message: "Already in watch later" });
    }

    const watchlater = new Watchlater({ videoid, viewer });
    await watchlater.save();
    res.status(200).json(watchlater);
  } catch (error) {
    res.status(500).json({ message: "Error adding to watch later", error: error.message });
  }
};

export const getallwatchlatercontroller = async (req, res) => {
  try {
    const watchlaters = await Watchlater.find();
    res.status(200).json(watchlaters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching watch later videos", error: error.message });
  }
};

export const deletewatchlater = async (req, res) => {
  try {
    const { videoid, viewer } = req.params;
    await Watchlater.findOneAndDelete({ videoid, viewer });
    res.status(200).json({ message: "Removed from watch later" });
  } catch (error) {
    res.status(500).json({ message: "Error removing from watch later", error: error.message });
  }
};
