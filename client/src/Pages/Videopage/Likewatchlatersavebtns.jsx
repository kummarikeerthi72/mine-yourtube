import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from 'react-icons/ai';
import { MdPlaylistAddCheck } from 'react-icons/md';
import {
  RiHeartAddFill,
  RiPlayListAddFill,
  RiShareForwardLine,
} from 'react-icons/ri';

import './Likewatchlatersavebtn.css';
import { useSelector, useDispatch } from 'react-redux';

import {
  addtolikedvideo,
  deletelikedvideo,
} from '../../action/likedvideo';
import {
  addtowatchlater,
  deletewatchlater,
} from '../../action/watchlater';

import { likevideoAction, getSingleVideo } from '../../action/video';

const Likewatchlatersavebtns = ({ vv, vid }) => {
  const dispatch = useDispatch();
  const [savevideo, setsavevideo] = useState(false);
  const [dislikebtn, setdislikebtn] = useState(false);
  const [likebtn, setlikebtn] = useState(false);

  const currentuser = useSelector((state) => state.currentuserreducer);
  const likedvideolist = useSelector((state) => state.likedvideoreducer);
  const watchlaterlist = useSelector((state) => state.watchlaterreducer);

  useEffect(() => {
    const userId = currentuser?.result?._id;

    if (Array.isArray(likedvideolist?.data) && userId) {
      const liked = likedvideolist.data.some(
        (q) => q.videoid === vid && q.viewer === userId
      );
      setlikebtn(liked);
    }

    if (Array.isArray(watchlaterlist?.data) && userId) {
      const saved = watchlaterlist.data.some(
        (q) => q.videoid === vid && q.viewer === userId
      );
      setsavevideo(saved);
    }
  }, [likedvideolist, watchlaterlist, currentuser, vid]);

  const togglelikevideo = () => {
    if (!currentuser) return alert('Please login to like video');

    const userId = currentuser.result._id;

    if (!likebtn) {
      dispatch(likevideoAction({ id: vid, action: 'like' }));
      dispatch(addtolikedvideo({ videoid: vid, viewer: userId }));
      setlikebtn(true);
      setdislikebtn(false);
    } else {
      dispatch(likevideoAction({ id: vid, action: 'dislike' }));
      dispatch(deletelikedvideo({ videoid: vid, viewer: userId }));
      setlikebtn(false);
    }

    dispatch(getSingleVideo(vid));
  };

  const toggledislikevideo = () => {
    if (!currentuser) return alert('Please login to dislike video');

    const userId = currentuser.result._id;

    if (!dislikebtn && likebtn) {
      dispatch(likevideoAction({ id: vid, action: 'dislike' }));
      dispatch(deletelikedvideo({ videoid: vid, viewer: userId }));
      setdislikebtn(true);
      setlikebtn(false);
    } else {
      setdislikebtn(false);
    }

    dispatch(getSingleVideo(vid));
  };

  const togglesavedvideo = () => {
    if (!currentuser) return alert('Please login to save video');

    const userId = currentuser.result._id;

    if (savevideo) {
      dispatch(deletewatchlater({ videoid: vid, viewer: userId }));
      setsavevideo(false);
    } else {
      dispatch(addtowatchlater({ videoid: vid, viewer: userId }));
      setsavevideo(true);
    }
  };

  return (
    <div className="btns_cont_videoPage">
      <div className="btn_VideoPage">
        <BsThreeDots />
      </div>

      <div className="btn_VideoPage">
        <div className="like_videoPage" onClick={togglelikevideo}>
          {likebtn ? (
            <AiFillLike size={22} className="btns_videoPage" />
          ) : (
            <AiOutlineLike size={22} className="btns_videoPage" />
          )}
          <b>{vv.Like}</b>
        </div>

        <div className="like_videoPage" onClick={toggledislikevideo}>
          {dislikebtn ? (
            <AiFillDislike size={22} className="btns_videoPage" />
          ) : (
            <AiOutlineDislike size={22} className="btns_videoPage" />
          )}
          <b>Dislike</b>
        </div>

        <div className="like_videoPage" onClick={togglesavedvideo}>
          {savevideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_videoPage" />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_videoPage" />
              <b>Save</b>
            </>
          )}
        </div>

        <div className="like_videoPage">
          <RiHeartAddFill size={22} className="btns_videoPage" />
          <b>Thanks</b>
        </div>

        <div className="like_videoPage">
          <RiShareForwardLine size={22} className="btns_videoPage" />
          <b>Share</b>
        </div>
      </div>
    </div>
  );
};

export default Likewatchlatersavebtns;
