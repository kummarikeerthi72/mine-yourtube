import React, { useState } from 'react';
import './Comment.css';
import Displaycommment from './Displaycommment';
import { useSelector, useDispatch } from 'react-redux';
import { postcomment } from '../../action/comment';

const Comment = ({ videoid }) => {
  const dispatch = useDispatch();
  const [commenttext, setcommentext] = useState('');

  const currentuser = useSelector((state) => state.currentuserreducer);
  const commentlist = useSelector((state) => state.commentreducer);

  const handleonsubmit = (e) => {
    e.preventDefault();
    if (!currentuser) {
      alert('Please login to comment.');
      return;
    }

    if (!commenttext.trim()) {
      alert('Please type your comment!');
      return;
    }

    dispatch(
      postcomment({
        videoid: videoid,
        userid: currentuser?.result._id,
        commentbody: commenttext,
        usercommented: currentuser.result.name,
      })
    );
    setcommentext('');
  };

  // ✅ Full fallback handling


const filteredComments = Array.isArray(commentlist?.data)
  ? commentlist.data.filter((q) => q?.videoid === videoid)
  : [];


  return (
    <>
      <form className="comments_sub_form_comments" onSubmit={handleonsubmit}>
        <input
          type="text"
          onChange={(e) => setcommentext(e.target.value)}
          placeholder="Add comment..."
          value={commenttext}
          className="comment_ibox"
        />
        <input type="submit" value="Add" className="comment_add_btn_comments" />
      </form>

      <div className="display_comment_container">
        {filteredComments.length > 0 ? (
          filteredComments
            .slice()
            .reverse()
            .map((m) => (
              <Displaycommment
                key={m._id}
                cid={m._id}
                userid={m.userid}
                commentbody={m.commentbody}
                commenton={m.commenton}
                usercommented={m.usercommented}
              />
            ))
        ) : (
          <p style={{ padding: '10px' }}>No comments yet.</p>
        )}
      </div>
    </>
  );
};

export default Comment;
