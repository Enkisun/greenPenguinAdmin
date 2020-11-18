import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { setModalTC } from '../redux/modalReducer';
import { addProduct, getProductsTC } from '../redux/productsReducer';
import { CustomReduxForm } from '../common/reduxForm';
import Pagination from '../common/pagination';
import { useHttp } from '../hooks/http.hook';
import Product from './Product';
import classes from "../app.module.css";

const ProductsList = ({ dispatch, currentPage, limit }) => {

  let products = useSelector(state => state.products.products);

  let { request } = useHttp();

  const setModalActive = useCallback(() => dispatch(setModalTC(true)), []);

  const onSubmit = async (formdata) => {
    try {
      await dispatch(setModalTC(false));
      await request('/api/products', 'POST', {...formdata});
      dispatch(addProduct(formdata));
    } catch (e) {}
  }

  const onPageChanged = newCurrentPage => dispatch(getProductsTC(newCurrentPage, limit));

  const items = products && products.map(product => (
    <Product product={product} request={request} key={product.id} />
  ));

  return (
    <div className={classes.container}>
      <div>
        <header className={classes.header}>
          <h1>Products List</h1>
          <button className={classes.btn} onClick={setModalActive}>Create</button>
        </header>

        <table className={classes.table}>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Trademark</th>
              <th>Volume</th>
              <th>Price</th>
            </tr>
            {items}
          </tbody>
        </table>

        <CustomReduxForm onSubmit={onSubmit} />
      </div>

      <Pagination currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;