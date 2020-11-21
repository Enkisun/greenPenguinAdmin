const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCTS = "DELETE_PRODUCTS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_PRODUCTS_COUNT = "SET_TOTAL_PRODUCTS_COUNT";

let initialState = {
  products: [],
  currentPage: 1,
  limit: 5,
  totalProductsCount: 0,
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
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
    default:
      return state;
  }
}

export const addProduct = product => ({ type: ADD_PRODUCT, product });
const deleteProducts = () => ({ type: DELETE_PRODUCTS })
const setCurrentPage = currentPage => ({ type: SET_CURRENT_PAGE, currentPage });
const setTotalProductsCount = totalProductsCount => ({ type: SET_TOTAL_PRODUCTS_COUNT, totalProductsCount });

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

const arrayBufferToBase64 = buffer => {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export const addProductTC = newProduct => async dispatch => {
  const result = await handleErrors(newProduct);
  const json = await result.json();

  if (json) {
    const base64Flag = `data:${json.image.contentType};base64,`;
    const imageStr = arrayBufferToBase64(json.image.data.data);
    json.image = base64Flag + imageStr;
  }

  dispatch(addProduct(json));
}

export const getProductsTC = (currentPage, limit) => async dispatch => {
  await dispatch(deleteProducts());
  await dispatch(setCurrentPage(currentPage));

  const response = await fetch(`/api/products?page=${currentPage}&limit=${limit}`);
  const result = await handleErrors(response);
  const json = await result.json();

  if (json) {
    await dispatch(setTotalProductsCount(json.totalProductsCount.totalProductsCount));
    await Promise.all(json.products.map(async product => {

      if (product.image) {
        const base64Flag = `data:${product.image.contentType};base64,`;
        const imageStr = arrayBufferToBase64(product.image.data.data);
        product.image = base64Flag + imageStr;
      }

      await dispatch(addProduct(product));
    }));
  }
};

export default productsReducer;