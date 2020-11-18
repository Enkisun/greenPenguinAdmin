import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsTC } from './redux/productsReducer';
import ProductsList from './components/ProductsList';

const App = () => {

  const dispatch = useDispatch();
  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);

  useEffect(() => {
    dispatch(getProductsTC(currentPage, limit));
  }, []);

  return <ProductsList dispatch={dispatch} currentPage={currentPage} limit={limit} />
}

export default App;