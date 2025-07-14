const videoreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case 'FETCH_ALL_VIDEOS':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default videoreducer;
