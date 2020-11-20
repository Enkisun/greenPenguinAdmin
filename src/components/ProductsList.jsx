import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsTC } from '../redux/productsReducer';
import { useHttp } from '../hooks/http.hook';
import Pagination from '../common/Pagination';
import CreateProduct from './CreateProduct';
import Product from './Product';
import classes from "./productsList.module.css";

const ProductsList = () => {

  const dispatch = useDispatch();

  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);
  let products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(getProductsTC(currentPage, limit));
  }, []);

  let { request } = useHttp();

  const onPageChanged = newCurrentPage => dispatch(getProductsTC(newCurrentPage, limit));

  const items = products && products.map(product => (
    <Product key={product.id} product={product} request={request} dispatch={dispatch} />
  ));

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>Products List</h1>
        <CreateProduct request={request} />
      </header>

      <table className={classes.table}>
        <tbody>
          <tr className={classes.tableTr}>
            <th className={classes.tableTh}>Image</th>
            {/* <th className={classes.tableTh}>ID</th> */}
            <th className={classes.tableTh}>Name</th>
            <th className={classes.tableTh}>Category</th>
            <th className={classes.tableTh}>Trademark</th>
            <th className={classes.tableTh}>Volume</th>
            <th className={classes.tableTh}>Price</th>
          </tr>

          {items}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;