import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const postcomment = (commentData) => async (dispatch) => {
  try {
    const { data } = await API.post('/comment/post', commentData);
    dispatch({ type: 'POST_COMMENT', payload: data });
  } catch (error) {
    console.error('Error posting comment:', error.response?.data || error.message);
  }
};

export const getallcomment = () => async (dispatch) => {
  try {
    const { data } = await API.get('/comment/get');
    dispatch({ type: 'FETCH_ALL_COMMENTS', payload: data });
  } catch (error) {
    console.error('Error fetching comments:', error.response?.data || error.message);
  }
};

export const deletecomment = (id) => async (dispatch) => {
  try {
    await API.delete(`/comment/delete/${id}`);
    dispatch(getallcomment()); // refresh comment list after delete
  } catch (error) {
    console.error('Error deleting comment:', error.response?.data || error.message);
  }
};

export const editcomment = ({ id, commentbody }) => async (dispatch) => {
  try {
    const { data } = await API.patch(`/comment/edit/${id}`, { commentbody });
    dispatch({ type: 'EDIT_COMMENT', payload: data });
  } catch (error) {
    console.error('Error editing comment:', error.response?.data || error.message);
  }
};
