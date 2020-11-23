const ADD_TRADEMARK = "ADD_TRADEMARK";
const DELETE_TRADEMARKS = "DELETE_TRADEMARKS";
const ADD_TRADEMARK_FILTER = "ADD_TRADEMARK_FILTER";
const REMOVE_TRADEMARK_FILTER = "REMOVE_TRADEMARK_FILTER";

let initialState = {
  trademarks: [],
  trademarkFilter: [],
}

const trademarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRADEMARK:
      return {
        ...state,
        trademarks: [...state.trademarks, action.trademark],
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

export const addTrademarkFilter = trademark => ({ type: ADD_TRADEMARK_FILTER, trademark });
export const removeTrademarkFilter = trademark => ({ type: REMOVE_TRADEMARK_FILTER, trademark });
export const addTrademark = trademark => ({ type: ADD_TRADEMARK, trademark });
const deleteTrademarks = () => ({ type: DELETE_TRADEMARKS })

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const getTrademarksTC = () => async dispatch => {
  await dispatch(deleteTrademarks());

  const response = await fetch(`/api/trademarks`);
  const result = await handleErrors(response);
  const json = await result.json();

  if (json) {
    await Promise.all(json.trademarks.map(async trademark => await dispatch(addTrademark(trademark)) ));
  }
};

export default trademarksReducer;