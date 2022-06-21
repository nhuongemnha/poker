const initialState = {
  isRevealed: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_REVEALED":
      state.isRevealed = payload;
      return { ...state };
    default:
      return state;
  }
};
