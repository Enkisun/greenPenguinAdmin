const ADD_CATEGORY = "ADD_CATEGORY";
const DELETE_CATEGORIES = "DELETE_CATEGORIES";

let initialState = {
  categories: [],
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
      }
    default:
      return state;
  }
}

export const addCategory = category => ({ type: ADD_CATEGORY, category });
const deleteCategories = () => ({ type: DELETE_CATEGORIES })

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
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