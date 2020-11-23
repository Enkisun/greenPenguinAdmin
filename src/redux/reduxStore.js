import { createStore, combineReducers, applyMiddleware } from "redux";
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import categoriesReducer from "./categoriesReducer";
import modalReducer from "./modalReducer";
import productsReducer from "./productsReducer";
import trademarksReducer from "./trademarksReducer";

let reducers = combineReducers({
  trademarks: trademarksReducer,
  categories: categoriesReducer,
  products: productsReducer,
  modal: modalReducer,
  form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;