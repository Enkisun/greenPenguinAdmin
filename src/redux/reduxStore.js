import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'

const reducers = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;