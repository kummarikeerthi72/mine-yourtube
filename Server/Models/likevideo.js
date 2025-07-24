import mongoose from "mongoose";

const likeVideoSchema = mongoose.Schema({
  videoid: { type: String, required: true },
  viewer: { type: String, required: true },
});

export default mongoose.model("likedvideo", likeVideoSchema);
