import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsTC, setCurrentPage } from '../../redux/productsReducer';
import { setCreateModal } from '../../redux/modalsReducer';
import { useHttp } from '../../hooks/http.hook';
import Pagination from '../../common/Pagination';
import Preloader from '../../common/Preloader';
import CreateProduct from './CreateProduct';
import Product from './Product';
import classes from "./productsList.module.css";

const ProductsList = () => {

  let [loading, setLoading] = useState(false);

  let { request } = useHttp();

  const dispatch = useDispatch();
  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);
  let products = useSelector(state => state.products.products);
  let categoryFilter = useSelector(state => state.categories.categoryFilter);
  let subCategoryFilter = useSelector(state => state.categories.subCategoryFilter);
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);
  let createModal = useSelector(state => state.modals.createModal);

  useEffect(() => {
    setLoading(true)
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subCategoryFilter, trademarkFilter))
      .then(() => setLoading(false));
  }, [currentPage, trademarkFilter]);

  const onPageChanged = newCurrentPage => dispatch(setCurrentPage(newCurrentPage, limit));

  const items = products && products.map(product => (
    <Product key={product._id} product={product} productsCount={products.length} request={request} dispatch={dispatch} />
  ));

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1>Products List</h1>
        <CreateProduct request={request} modal={createModal} setModal={setCreateModal} />
      </header>

      <table className={classes.table}>
        <tbody>
          <tr className={classes.tableTr}>
            <th className={classes.tableTh}>Image</th>
            <th className={classes.tableTh}>Name</th>
            <th className={classes.tableTh}>Category</th>
            <th className={classes.tableTh}>Subcategory</th>
            <th className={classes.tableTh}>Trademark</th>
            <th className={classes.tableTh}>Volume</th>
            <th className={classes.tableTh}>Price</th>
            <th className={classes.tableTh}>Actions</th>
          </tr>

          {loading ? <Preloader /> : items}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;