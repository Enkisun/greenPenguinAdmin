const SET_MODAL = "SET_MODAL";

let initialState = {
  modal: false
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

const setModal = bool => ({ type: SET_MODAL, bool });

export const setModalTC = bool => async dispatch => {
  dispatch(setModal(bool))
};

export default modalReducer;