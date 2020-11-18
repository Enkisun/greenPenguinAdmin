const SET_MODAL = "SET_MODAL";

let initialState = {
  modal: false,
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        modal: action.bool,
      }
    default:
      return state;
  }
}

export const setModal = bool => ({ type: SET_MODAL, bool });

export default modalReducer;