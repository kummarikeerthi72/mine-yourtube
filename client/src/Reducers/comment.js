const commentreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "POST_COMMENT":
      return {
        ...state,
        data: [...state.data, action.payload], // ✅ Add new comment to list
      };

    case "EDIT_COMMENT":
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ), // ✅ Replace edited comment
      };

    case "FETCH_ALL_COMMENTS":
      return {
        ...state,
        data: action.payload, // ✅ Overwrite with all comments
      };

    default:
      return state;
  }
};

export default commentreducer;
