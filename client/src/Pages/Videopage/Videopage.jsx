import React, { useEffect, useMemo } from 'react';
import './Videopage.css';
import moment from 'moment';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Likewatchlatersavebtns from './Likewatchlatersavebtns';
import Comment from '../../Component/Comment/Comment';

import { addtohistory } from '../../action/history';
import { viewvideoAction } from '../../action/video';

const Videopage = () => {
  const { vid } = useParams();
  const location = useLocation(); // force rerender on navigation
  const dispatch = useDispatch();

  const vids = useSelector((state) => state.videoreducer?.data || []);
  const currentuser = useSelector((state) => state.currentuserreducer);

  const vv = useMemo(() => {
    return vids.find((video) => String(video._id) === String(vid));
  }, [vids, vid]);

  useEffect(() => {
  if (vid) {
    dispatch(viewvideoAction(vid));
    if (currentuser?.result?._id) {
      dispatch(
        addtohistory({
          videoid: vid,
          userid: currentuser.result._id,
        })
      );
    }
  }
}, [dispatch, vid, location.pathname, currentuser?.result?._id]);
 // 🔁 triggered even when same video link is revisited

  const getVideoUrl = (filepath) => {
    if (!filepath) return '';
    return `http://localhost:5000/${filepath.startsWith('/') ? filepath.slice(1) : filepath}`;
  };

  if (!vv) return <p>Loading video or video not found...</p>;

  return (
    <div className="container_videoPage">
      <div className="container2_videoPage">
        <div className="video_display_screen_videoPage">
          <video
  src={getVideoUrl(vv.filepath)}
  className="video_ShowVideo_videoPage"
  controls
  onPlay={() => dispatch(viewvideoAction(vid))}
/>

          <div className="video_details_videoPage">
            <div className="video_btns_title_VideoPage_cont">
              <p className="video_title_VideoPage">{vv.title || 'Untitled Video'}</p>
              <div className="views_date_btns_VideoPage">
                <div className="views_videoPage">
                  {vv.views || 0} views <div className="dot"></div> {moment(vv.createdat).fromNow()}
                </div>
                <Likewatchlatersavebtns vv={vv} vid={vid} />
              </div>
            </div>
            <Link to="/" className="chanel_details_videoPage">
              <b className="chanel_logo_videoPage">
                <p>{vv.uploader?.charAt(0)?.toUpperCase()}</p>
              </b>
              <p className="chanel_name_videoPage">{vv.uploader}</p>
            </Link>
            <div className="comments_VideoPage">
              <h2>
                <u>Comments</u>
              </h2>
              <Comment videoid={vv._id} />
            </div>
          </div>
        </div>
        <div className="moreVideoBar">More videos</div>
      </div>
    </div>
  );
};

export default Videopage;
