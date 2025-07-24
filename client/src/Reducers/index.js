import { combineReducers } from "redux";
import authreducer from "./auth";
import currentuserreducer from "./currentuser";
import chanelreducer from "./chanel";
import videoreducer from "./video";
import commentreducer from "./comment";
import historyreducer from "./history";
import likedvideoreducer from "./likedvideo";
import watchlaterreducer from "./watchlater";
import groupReducer from "./group"; // ✅ Import your group reducer

export default combineReducers({
  authreducer,
  currentuserreducer,
  videoreducer,
  chanelreducer,
  commentreducer,
  historyreducer,
  likedvideoreducer,
  watchlaterreducer,
  groups: groupReducer, // ✅ Add it here with a key (like `groups`)
});
