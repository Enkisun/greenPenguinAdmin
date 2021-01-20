import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'
import secondaryReducer from './secondaryReducer'

const reducers = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  secondary: secondaryReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;