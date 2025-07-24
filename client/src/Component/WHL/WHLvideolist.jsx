import React from 'react';
import Showvideolist from '../Showvideolist/Showvideolist';

const WHLvideolist = ({ page, currentuser, videolist }) => {
  if (!currentuser) {
    return (
      <>
        <h2 style={{ color: 'white' }}>
          Please login to view your {page}
        </h2>
      </>
    );
  }

  const filteredList = videolist?.data?.filter(
    (q) => q?.viewer === currentuser
  );

  return (
    <>
      {filteredList?.length === 0 ? (
        <h3 style={{ color: 'white' }}>
          No videos in your {page}
        </h3>
      ) : (
        filteredList
          .reverse()
          .map((m) => (
            <Showvideolist videoid={m?.videoid} key={m?._id} />
          ))
      )}
    </>
  );
};

export default WHLvideolist;
