import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postcomment, getallcomment } from "../../action/comment";
import "./Comment.css";

const Comment = ({ videoId }) => {
  const dispatch = useDispatch();
  const [commentbody, setCommentBody] = useState("");

  const { comment } = useSelector((state) => state.comment || { comment: [] });
  const user = JSON.parse(localStorage.getItem("profile"));
  const username = user?.result?.name || "User";

  const videoComments = comment?.filter((c) => c.videoId === videoId);

  const handlePost = () => {
    if (!commentbody.trim()) return;

    const commentData = {
      commentbody,
      username,
      videoId,
    };

    dispatch(postcomment(commentData));
    setCommentBody("");
  };

  useEffect(() => {
    dispatch(getallcomment());
  }, [dispatch]);

  return (
    <div className="comment-section">
      <h3>{videoComments?.length || 0} Comments</h3>

      {/* --- Comment Input Section --- */}
      <div className="comment-input-row">
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="profile"
          className="profile-img"
        />
        <input
          className="comment-input"
          placeholder="Add a comment..."
          value={commentbody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <button className="post-btn" onClick={handlePost}>
          Post
        </button>
      </div>

      {/* --- Comment List --- */}
      <div className="all-comments">
        {videoComments?.map((c, i) => (
          <div key={i} className="single-comment">
            <img
              src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
              alt="profile"
              className="profile-img"
            />
            <div className="comment-content">
              <span className="comment-username">{c.username || "User"}</span>
              <p className="comment-text">{c.commentbody}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
