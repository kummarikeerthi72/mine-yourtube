import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getallvideo } from '../../action/video';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();

  // ⬇️ fetch videos on first load
  useEffect(() => {
    dispatch(getallvideo());
  }, [dispatch]);

  // ⬇️ get videos from Redux
  const vids = useSelector((state) =>
    state.videoreducer?.data?.filter((v) => v).reverse()
  );

  const navlist = [
    "All", "Python", "Java", "C++", "Movies", "Science", "Animation", "Gaming", "Comedy"
  ];

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {navlist.map((m) => (
            <p key={m} className="btn_nav_home">{m}</p>
          ))}
        </div>
        <Showvideogrid vid={vids} />
      </div>
    </div>
  );
};

export default Home;
