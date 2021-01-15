const ADD_UNITS = "ADD_UNITS";
const DELETE_UNITS = "DELETE_UNITS";

let initialState = {
  unitsData: [],
}

const unitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_UNITS:
      return {
        ...state,
        unitsData: action.units,
      };
    case DELETE_UNITS:
      return {
        ...state,
        unitsData: [],
      }
    default:
      return state;
  }
}

const addUnits = units => ({ type: ADD_UNITS, units });
const deleteUnits = () => ({ type: DELETE_UNITS });

export const getUnits = () => async dispatch => {
  await dispatch(deleteUnits());

  try {
    const response = await fetch(`/units`);
    const json = await response.json();

    if (json) {
      await dispatch(addUnits(json.units));
    }
  } catch(e) {
    console.log(e.message);
  }
};

export default unitsReducer;