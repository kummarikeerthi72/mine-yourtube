import React from 'react';
import './Showvideogrid.css';
import Showvideo from '../Showvideo/Showvideo';

const Showvideogrid = ({ vid }) => {
  return (
    <div className="grid-container">
      {[...vid]?.reverse().map(video => (
        <Showvideo key={video._id} vid={video} />
      ))}
    </div>
  );
};

export default Showvideogrid;
