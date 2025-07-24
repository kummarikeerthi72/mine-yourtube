import React from 'react';
import './Showvideo.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Showvideo = ({ vid }) => {
  const title = vid?.videotitle || vid?.title || 'Untitled Video';
  const channelName = vid?.channelname || 'Keerthi';

  // Correct video URL using deployed backend
  const videoURL = `https://mine-yourtube.onrender.com/uploads/${vid.filepath?.startsWith('/') ? vid.filepath.slice(1) : vid.filepath}`;

  return (
    <>
      <Link to={`/videopage/${vid._id}`}>
        <video
          src={videoURL}
          className='video_ShowVideo'
          preload="metadata"
          controls
        />
      </Link>

      <div className="video_description">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            {channelName.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="video_details">
          <p className="title_vid_ShowVideo">
            {title.trim()}
          </p>
          <pre className="vid_views_UploadTime">{channelName}</pre>
          <pre className="vid_views_UploadTime">
            {vid?.views || 0} views <div className="dot"></div> {moment(vid?.createdat).fromNow()}
          </pre>
        </div>
      </div>
    </>
  );
};

export default Showvideo;
