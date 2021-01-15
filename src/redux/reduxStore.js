import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import categoriesReducer from './categoriesReducer'
import productsReducer from './productsReducer'
import unitsReducer from './unitsReducer'

const reducers = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  units: unitsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;