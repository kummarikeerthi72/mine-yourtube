import { GET_ALL_VIDEOS, GET_SINGLE_VIDEO, LIKE_VIDEO, DISLIKE_VIDEO, UPLOAD_VIDEO, VIEW_VIDEO } from '../action/types';

const videoreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_ALL_VIDEOS:
      return { ...state, data: action.payload };

    case GET_SINGLE_VIDEO:
    case VIEW_VIDEO:
    case LIKE_VIDEO:
    case DISLIKE_VIDEO:
      return {
        ...state,
        data: state.data.map((video) =>
          video._id === action.payload._id ? action.payload : video
        ),
      };

    case UPLOAD_VIDEO:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    default:
      return state;
  }
};

export default videoreducer;
