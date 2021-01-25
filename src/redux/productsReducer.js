const ADD_PRODUCTS = "ADD_PRODUCTS";
const DELETE_PRODUCTS = "DELETE_PRODUCTS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_PRODUCTS_COUNT = "SET_TOTAL_PRODUCTS_COUNT";
const SET_MODAL_WINDOW = "SET_MODAL_WINDOW";
const SET_LOADING = "SET_LOADING";

let initialState = {
  products: [],
  currentPage: 1,
  limit: 5,
  totalProductsCount: 0,
  modalWindow: false,
  loading: false,
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case DELETE_PRODUCTS:
      return {
        ...state,
        products: [],
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case SET_TOTAL_PRODUCTS_COUNT:
      return {
        ...state,
        totalProductsCount: action.totalProductsCount,
      }
    case SET_MODAL_WINDOW:
      return {
        ...state,
        modalWindow: action.bool,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.bool,
      }
    default:
      return state;
  }
}

const addProducts = products => ({ type: ADD_PRODUCTS, products });
const deleteProducts = () => ({ type: DELETE_PRODUCTS })
const setLoading = bool => ({ type: SET_LOADING, bool });
const setTotalProductsCount = totalProductsCount => ({ type: SET_TOTAL_PRODUCTS_COUNT, totalProductsCount });
export const setModalWindow = bool => ({ type: SET_MODAL_WINDOW, bool });
export const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });

export const getProducts = (currentPage, limit, category = '', subcategory = '', trademark = '') => async dispatch => {
  await dispatch(setLoading(true));
  await dispatch(deleteProducts());

  let productsURI = `/products?page=${currentPage}&limit=${limit}`;

  if (category) {
    productsURI += `&category=${category}`;
  }

  if (subcategory) {
    productsURI += `&subcategory=${subcategory}`;
  }

  if (trademark.length) {
    productsURI += `&trademark=${trademark}`;
  }
  
  try {
    const response = await fetch(productsURI);
    const json = await response.json();

    if (json) {
      await dispatch(setTotalProductsCount(json.totalProductsCount));
      await dispatch(addProducts(json.products));
    }
  } catch (e) {
    console.log(e.message);
  }

  dispatch(setLoading(false));
};

export default productsReducer;