const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
const SET_SUBCATEGORY_FILTER = "SET_SUBCATEGORY_FILTER";
const ADD_TRADEMARK_FILTER = "ADD_TRADEMARK_FILTER";
const REMOVE_TRADEMARK_FILTER = "REMOVE_TRADEMARK_FILTER";
const REMOVE_TRADEMARK_FILTERS = "REMOVE_TRADEMARK_FILTERS";
const ADD_CATEGORIES = "ADD_CATEGORIES";
const DELETE_CATEGORIES = "DELETE_CATEGORIES";

let initialState = {
  categoriesData: [],
  categoryFilter: '',
  subcategoryFilter: '',
  trademarkFilter: [],
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categoriesData: action.categories,
      };
    case DELETE_CATEGORIES:
      return {
        ...state,
        categoriesData: [],
      };
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.category,
      }
    case SET_SUBCATEGORY_FILTER:
      return {
        ...state,
        subcategoryFilter: action.subcategory,
      }
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
    case REMOVE_TRADEMARK_FILTERS:
      return {
        ...state,
        trademarkFilter: [],
      }
    default:
      return state;
  }
}

const addCategories = categories => ({ type: ADD_CATEGORIES, categories });
const deleteCategories = () => ({ type: DELETE_CATEGORIES });
export const setCategoryFilter = category => ({ type: SET_CATEGORY_FILTER, category });
export const setSubcategoryFilter = subcategory => ({ type: SET_SUBCATEGORY_FILTER, subcategory });
export const addTrademarkFilter = trademark => ({ type: ADD_TRADEMARK_FILTER, trademark });
export const removeTrademarkFilter = trademark => ({ type: REMOVE_TRADEMARK_FILTER, trademark });
export const removeTrademarkFilters = () => ({ type: REMOVE_TRADEMARK_FILTERS });

export const getCategories = () => async dispatch => {
  await dispatch(deleteCategories());

  try {
    const response = await fetch(`/categories`);
    const json = await response.json();

    if (json) {
      await dispatch(addCategories(json.categories));
    }
  } catch(e) {
    console.log(e.message);
  }
};

export default categoriesReducer;