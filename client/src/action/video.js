import axios from 'axios';

import {
  GET_ALL_VIDEOS,
  GET_SINGLE_VIDEO,
  LIKE_VIDEO,
  VIEW_VIDEO,
  UPLOAD_VIDEO,
} from '../action/types'; // Action types

// ✅ Import API functions
import {
  getvideos,
  getvideobyid,
  uploadvideo as uploadvideoAPI,
  likevideo as likevideoAPI,
  viewvideo as viewvideoAPI,
} from "../Api"; // Make sure names match exactly

// ✅ Get All Videos
export const getallvideo = () => async (dispatch) => {
  try {
    const res = await axios.get('https://mine-yourtube.onrender.com/api/video/all'); // ✅ correct

    dispatch({ type: GET_ALL_VIDEOS, payload: res.data }); // ✅ Corrected
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};


// ✅ Get Single Video by ID
export const getSingleVideo = (id) => async (dispatch) => {
  try {
    const { data } = await getvideobyid(id);
    dispatch({ type: GET_SINGLE_VIDEO, payload: data });
  } catch (error) {
    console.error("Get Single Video Error:", error.message);
  }
};

// ✅ Upload a Video
export const uploadvideoAction = (formData) => async (dispatch) => {
  try {
    const { data } = await uploadvideoAPI(formData);
    dispatch({ type: UPLOAD_VIDEO, payload: data });
  } catch (error) {
    console.error("Upload Video Error:", error.message);
  }
};

// ✅ Like a Video
export const likevideoAction = (id) => async (dispatch) => {
  try {
    const { data } = await likevideoAPI(id);
    dispatch({ type: LIKE_VIDEO, payload: data });
  } catch (error) {
    console.error("Like Video Error:", error.message);
  }
};

// ✅ View a Video (increment view count)
export const viewvideoAction = (id) => async (dispatch) => {
  try {
    await viewvideoAPI(id); // ✅ fixed name here
  } catch (error) {
    console.error("View update failed:", error);
  }
};
