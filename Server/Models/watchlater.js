import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VideoFile",
    required: true,
  },
  addedOn: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("WatchLater", watchLaterSchema);
