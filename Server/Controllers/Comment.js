import Comments from "../Models/comment.js"; // ensure model filename is comment.js

export const postcomment = async (req, res) => {
  try {
    const { videoid, commentbody, usercommented, userId } = req.body;

    if (!commentbody || !videoid || !usercommented || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newComment = new Comments({
      videoid,
      commentbody,
      usercommented,
      userId,
    });

    await newComment.save();
    res.status(201).json({ message: 'Comment posted successfully', newComment });
  } catch (error) {
    console.error("Error in postcomment controller:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
