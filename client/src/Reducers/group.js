const groupReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_GROUPS":
      return action.payload;
    default:
      return state;
  }
};

export default groupReducer;
