import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'
import trademarksReducer from './trademarksReducer'

let reducers = combineReducers({
  trademarks: trademarksReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;