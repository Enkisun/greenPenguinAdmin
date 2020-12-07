const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
const SET_SUBCATEGORY_FILTER = "SET_SUBCATEGORY_FILTER";
const ADD_CATEGORY = "ADD_CATEGORY";
const DELETE_CATEGORIES = "DELETE_CATEGORIES";

let initialState = {
  categories: [],
  categoryFilter: '',
  subcategoryFilter: '',
}

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
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

const setCategoryFilter = category => ({ type: SET_CATEGORY_FILTER, category });
const setSubcategoryFilter = subcategory => ({ type: SET_SUBCATEGORY_FILTER, subcategory });
export const addCategory = category => ({ type: ADD_CATEGORY, category });
const deleteCategories = () => ({ type: DELETE_CATEGORIES })

export const setFilters = (category, subcategory = '', categoryFilter) => async dispatch => {
  dispatch(setCategoryFilter(category));
  dispatch(setSubcategoryFilter(categoryFilter === category ? subcategory : ''));
}

export const getCategoriesTC = () => async dispatch => {
  await dispatch(deleteCategories());

  const response = await fetch(`/api/categories`);
  if (!response.ok) throw Error(response.statusText);
  const json = await response.json();

  if (json) {
    await Promise.all(json.categories.map(async category => await dispatch(addCategory(category)) ));
  }
};

export default categoriesReducer;