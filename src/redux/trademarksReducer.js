const ADD_TRADEMARKS = "ADD_TRADEMARKS";
const DELETE_TRADEMARKS = "DELETE_TRADEMARKS";
const ADD_TRADEMARK_FILTER = "ADD_TRADEMARK_FILTER";
const REMOVE_TRADEMARK_FILTER = "REMOVE_TRADEMARK_FILTER";

let initialState = {
  trademarks: [],
  trademarkFilter: [],
}

const trademarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRADEMARKS:
      return {
        ...state,
        trademarks: action.trademarks,
      };
    case DELETE_TRADEMARKS:
      return {
        ...state,
        trademarks: [],
      };
    case ADD_TRADEMARK_FILTER:
      return {
        ...state,
        trademarkFilter: [...state.trademarkFilter, action.trademark],
      };
    case REMOVE_TRADEMARK_FILTER:
      return {
        ...state,
        trademarkFilter: state.trademarkFilter.filter(trademark => {
          if (trademark !== action.trademark) return trademark;
        }),
      };
    default:
      return state;
  }
}

const addTrademarks = trademarks => ({ type: ADD_TRADEMARKS, trademarks });
const deleteTrademarks = () => ({ type: DELETE_TRADEMARKS });
export const addTrademarkFilter = trademark => ({ type: ADD_TRADEMARK_FILTER, trademark });
export const removeTrademarkFilter = trademark => ({ type: REMOVE_TRADEMARK_FILTER, trademark });

export const getTrademarks = () => async dispatch => {
  await dispatch(deleteTrademarks());

  try {
    const response = await fetch(`/trademarks`);
    const json = await response.json();

    if (json) {
      await dispatch(addTrademarks(json.trademarks));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export default trademarksReducer;