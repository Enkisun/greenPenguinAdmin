const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
const SET_SUBCATEGORY_FILTER = "SET_SUBCATEGORY_FILTER";
const ADD_CATEGORIES = "ADD_CATEGORIES";
const DELETE_CATEGORIES = "DELETE_CATEGORIES";

let initialState = {
  categories: [],
  categoryFilter: '',
  subcategoryFilter: '',
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case DELETE_CATEGORIES:
      return {
        ...state,
        categories: [],
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
    default:
      return state;
  }
}

const addCategories = categories => ({ type: ADD_CATEGORIES, categories });
const deleteCategories = () => ({ type: DELETE_CATEGORIES });
export const setCategoryFilter = category => ({ type: SET_CATEGORY_FILTER, category });
export const setSubcategoryFilter = subcategory => ({ type: SET_SUBCATEGORY_FILTER, subcategory });

export const getCategories = () => async dispatch => {
  await dispatch(deleteCategories());

  const response = await fetch(`/categories`);
  if (!response.ok) throw Error(response.statusText);
  const json = await response.json();

  if (json) {
    await dispatch(addCategories(json.categories));
  }
};

export default categoriesReducer;