const SET_CATEGORY_FILTER = "SET_CATEGORY_FILTER";
const SET_SUBCATEGORY_FILTER = "SET_SUBCATEGORY_FILTER";
const ADD_CATEGORY = "ADD_CATEGORY";
const DELETE_CATEGORIES = "DELETE_CATEGORIES";

let initialState = {
  categories: [],
  categoryFilter: '',
  subCategoryFilter: '',
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
        subCategoryFilter: action.subCategory,
      }
    default:
      return state;
  }
}

const setCategoryFilter = category => ({ type: SET_CATEGORY_FILTER, category });
const setSubCategoryFilter = subCategory => ({ type: SET_SUBCATEGORY_FILTER, subCategory });
export const addCategory = category => ({ type: ADD_CATEGORY, category });
const deleteCategories = () => ({ type: DELETE_CATEGORIES })

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const setFilters = (category, subCategory) => async dispatch => {
  await dispatch(setCategoryFilter(category));
  subCategory && dispatch(setSubCategoryFilter(subCategory));
}

export const getCategoriesTC = () => async dispatch => {
  await dispatch(deleteCategories());

  const response = await fetch(`/api/categories`);
  const result = await handleErrors(response);
  const json = await result.json();

  if (json) {
    await Promise.all(json.categories.map(async category => await dispatch(addCategory(category)) ));
  }
};

export default categoriesReducer;