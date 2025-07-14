import React from 'react';
import './Showvideo.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Showvideo = ({ vid }) => {
  const getVideoUrl = (filepath) => {
    if (!filepath) return '';
    return `http://localhost:5000/${filepath.startsWith('/') ? filepath.slice(1) : filepath}`;
  };

  return (
    <div className="video_card_container">
      <Link to={`/videopage/${vid._id}`}>
        <video
          src={getVideoUrl(vid.filepath)}
          className="video_ShowVideo"
          muted
          loop
          playsInline
        />
      </Link>
      <div className="video_description">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            {vid?.uploader?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        </div>
        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.title || 'Untitled Video'}</p>
          <pre className="vid_views_UploadTime">{vid?.uploader || 'Unknown Uploader'}</pre>
          <pre className="vid_views_UploadTime">
            {vid?.views || 0} views <span className="dot">•</span> {moment(vid?.createdat).fromNow()}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Showvideo;
