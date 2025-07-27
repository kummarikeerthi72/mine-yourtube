import React from 'react';
import './Showvideo.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Showvideo = ({ vid }) => {
  const title = vid?.videotitle || vid?.title || 'Untitled Video';
  const channelName = vid?.channelname || 'Keerthi';

  const videoPath = vid?.videoPath || '';
  const videoURL = videoPath.startsWith('uploads/')
    ? `https://mine-yourtube.onrender.com/${videoPath}`
    : '';

  return (
    <Link to={`/videopage/${vid._id}`} className="showvideo-card">
      <div className="thumbnail-container">
        <video
          src={videoURL}
          className="video-thumb"
          muted
          playsInline
          preload="metadata"
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundColor: 'black',
          }}
        />
      </div>
      <div className="video-info">
        <div className="channel-logo">{channelName.charAt(0).toUpperCase()}</div>
        <div className="video-text">
          <p className="video-title">{title}</p>
          <p className="video-channel">{channelName}</p>
          <p className="video-stats">
            {vid?.views || 0} views • {moment(vid?.createdAt || vid?.createdat).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Showvideo;
