const ADD_UNITS = "ADD_UNITS";
const DELETE_UNITS = "DELETE_UNITS";
const ADD_TRADEMARKS = "ADD_TRADEMARKS";
const DELETE_TRADEMARKS = "DELETE_TRADEMARKS";

let initialState = {
  unitsData: [],
  trademarksData: [],
}

const secondaryReducer = (state = initialState, action) => {
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
    case ADD_TRADEMARKS:
      return {
        ...state,
        trademarksData: action.trademarks,
      }
    case DELETE_TRADEMARKS:
      return {
        ...state,
        trademarksData: [],
      }
    default:
      return state;
  }
}

const addUnits = units => ({ type: ADD_UNITS, units });
const deleteUnits = () => ({ type: DELETE_UNITS });
const addTrademarks = trademarks => ({ type: ADD_TRADEMARKS, trademarks });
const deleteTrademarks = () => ({ type: DELETE_TRADEMARKS });

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

export const getTrademarks = () => async dispatch => {
  await dispatch(deleteTrademarks());

  try {
    const response = await fetch(`/trademarks`);
    const json = await response.json();

    if (json) {
      await dispatch(addTrademarks(json.trademarks));
    }
  } catch(e) {
    console.log(e.message);
  }
};

export default secondaryReducer;