import { configureStore } from '@reduxjs/toolkit';

import currentuserreducer from './Reducers/currentuser';
import chanel from './Reducers/chanel';
import videoreducer from './Reducers/video';
import commentreducer from './Reducers/comment';
import likedvideoreducer from './Reducers/likedvideo';
import watchlaterreducer from './Reducers/watchlater';
import historyreducer from './Reducers/history';

const store = configureStore({
  reducer: {
    currentuser: currentuserreducer,
    chanel: chanel,
    video: videoreducer,
    comment: commentreducer,
    likedvideo: likedvideoreducer,
    watchlater: watchlaterreducer,
    history: historyreducer,
  },
});

export default store;
