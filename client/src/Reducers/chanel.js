const chanelreducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_GROUPS":
      return action.payload;
    case "CREATE_GROUP":
      return [...state, action.payload];
    default:
      return state;
  }
};
export default chanelreducer;
