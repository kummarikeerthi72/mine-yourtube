import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { useDispatch } from 'react-redux';
import Allroutes from './Allroutes';
import { BrowserRouter as Router } from 'react-router-dom';

import Drawersliderbar from './Component/Leftsidebar/Drawersliderbar';
import Createeditchannel from './Pages/Channel/Createeditchannel';
import Videoupload from './Pages/Videoupload/Videoupload';

import { setcurrentuser } from './action/currentuser';
import { fetchallchannel } from './action/channeluser';
import { getallvideo } from './action/video';
import { getallcomment } from './action/comment';
import { getallhistory } from './action/history';
import { getalllikedvideo } from './action/likedvideo';
import { getallwatchlater } from './action/watchlater';



function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({
    display: 'none',
  });

  const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
  const [videouploadpage, setvideouploadpage] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ Restore login session from localStorage
    const profile = JSON.parse(localStorage.getItem("Profile"));
    if (profile) {
      dispatch(setcurrentuser(profile));
    }

    // ✅ Load all necessary data on app start
    dispatch(fetchallchannel());
    dispatch(getallvideo());
    dispatch(getallcomment());
    dispatch(getallhistory());
    dispatch(getalllikedvideo());
    dispatch(getallwatchlater());
  }, [dispatch]);

  const toggledrawer = () => {
    settogledrawersidebar((prev) => ({
      display: prev.display === 'none' ? 'flex' : 'none',
    }));
  };

  return (
    <Router>
      {/* ✅ Conditionally show modal pages */}
      {videouploadpage && (
        <Videoupload setvideouploadpage={setvideouploadpage} />
      )}
      {editcreatechanelbtn && (
        <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />
      )}

      {/* ✅ Navbar and Sidebar */}
      <Navbar
        seteditcreatechanelbtn={seteditcreatechanelbtn}
        toggledrawer={toggledrawer}
      />
      <Drawersliderbar
        toggledraw={toggledrawer}
        toggledrawersidebar={toggledrawersidebar}
      />

      {/* ✅ Routes */}
      <Allroutes
        seteditcreatechanelbtn={seteditcreatechanelbtn}
        setvideouploadpage={setvideouploadpage}
      />
    </Router>
  );
}

export default App;
