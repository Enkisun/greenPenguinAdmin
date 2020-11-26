const SET_EDIT_MODAL = "SET_EDIT_MODAL";
const SET_CREATE_MODAL = "SET_CREATE_MODAL";

let initialState = {
  editModal: false,
  createModal: false,
}

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_MODAL:
      return {
        ...state,
        editModal: action.bool,
      }
    case SET_CREATE_MODAL:
      return {
        ...state,
        createModal: action.bool,
      }
    default:
      return state;
  }
}

export const setEditModal = bool => ({ type: SET_EDIT_MODAL, bool });
export const setCreateModal = bool => ({ type: SET_CREATE_MODAL, bool });

export default modalsReducer;