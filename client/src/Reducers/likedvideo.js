const likedvideoreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "POST_LIKEDVIDEO":
      return {
        ...state,
        data: [...state.data, action?.data]
      };
    case "FETCH_ALL_LIKED_VIDEOS":
      return {
        ...state,
        data: action?.payload
      };
    default:
      return state;
  }
};

export default likedvideoreducer;
