import axios from 'axios';
import * as api from '../Api'; // ✅ This line imports your axios calls


const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Automatically attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ Auth
export const login = (authdata) => API.post('/user/login', authdata);

// ✅ Channel
export const updatechaneldata = (id, updatedata) => API.patch(`/user/update/${id}`, updatedata);
export const fetchallchannel = () => API.get('/user/getallchannel');

// ✅ Video
export const uploadvideo = (filedata, fileoption) => API.post('/video/uploadvideo', filedata, fileoption);
export const getvideos = () => API.get('/video/all');
export const likevideo = (id, action) => API.patch(`/video/like/${id}`, { action });
export const viewvideo = (id) => API.patch(`/video/views/${id}`);


export const getvideobyid = (id) => API.get(`/video/${id}`);

// ✅ Comment
export const postcomment = (commentData) => API.post('/comment/post', commentData);
export const getallcomment = () => API.get('/comment/get');
export const deletecomment = (id) => API.delete(`/comment/delete/${id}`);
export const editcomment = (id, commentbody) => API.patch(`/comment/edit/${id}`, { commentbody });

// ✅ History
export const addtohistory = (historydata) => API.post('/video/history', historydata);
export const getallhistory = () => API.get('/video/getallhistory');
export const deletehistory = (userid) => API.delete(`/video/deletehistory/${userid}`);

// ✅ Liked Video
export const addtolikevideo = (likedvideodata) => API.post('/video/likevideo', likedvideodata);
export const getalllikedvideo = () => API.get('/video/getalllikedvideo');
export const deletelikedvideo = (videoid, viewer) => API.delete(`/video/deletelikevideo/${videoid}/${viewer}`);

// ✅ Watch Later
export const addtowatchlater = (watchlaterdata) => API.post('/video/watchlater', watchlaterdata);
export const getallwatchlater = () => API.get('/video/getallwatchlater');
export const deletewatchlater = (videoid, viewer) => API.delete(`/video/deletewatchlater/${videoid}/${viewer}`);
