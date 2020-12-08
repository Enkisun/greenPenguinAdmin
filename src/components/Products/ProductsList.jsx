import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { getProductsTC, setCurrentPage } from '../../redux/productsReducer';
import { setCreateModal } from '../../redux/modalsReducer';
import { useHttp } from '../../hooks/http.hook';
import Paginate from '../../common/Paginate';
import Preloader from '../../common/Preloader';
import CreateProduct from './CreateProduct';
import Product from './Product';
import styles from "./productsList.module.css";

const ProductsList = () => {

  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = e => {
    e.preventDefault();
    auth.logout();
    history.push('/');
  }

  let { request } = useHttp();

  const dispatch = useDispatch();
  let { products, currentPage, limit, loading } = useSelector(state => state).products;
  let { categoryFilter, subcategoryFilter,  } = useSelector(state => state).categories;
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);
  let createModal = useSelector(state => state.modals.createModal);

  useEffect(() => {
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter))
  }, [currentPage, categoryFilter, subcategoryFilter, trademarkFilter]);

  const onPageChanged = newCurrentPage => {
    if (loading) return
    dispatch(setCurrentPage(newCurrentPage, limit));
  }

  const results = products && products.map(product => (
    <Product key={product._id}
     product={product}
     productsCount={products.length}
     currentPage={currentPage}
     limit={limit}
     categoryFilter={categoryFilter}
     subcategoryFilter={subcategoryFilter}
     trademarkFilter={trademarkFilter}
     request={request}
     dispatch={dispatch}
    />
  ));

  let items = results.length > 0 ? results : <p className={styles.emptyList}>Результатов нет</p>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <CreateProduct request={request} modal={createModal} setModal={setCreateModal} />
        <h1 className={styles.headerTitle}>Products List</h1>
        <NavLink to='/auth' className={styles.logout} onClick={logoutHandler}>logout</NavLink>
      </header>

      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableTr}>
            <th className={styles.tableTh}>Image</th>
            <th className={styles.tableTh}>Name</th>
            <th className={styles.tableTh}>Category / Subcategory</th>
            <th className={styles.tableTh}>Trademark</th>
            <th className={styles.tableTh}>Volume / Weight</th>
            <th className={styles.tableTh}>Price</th>
            <th className={styles.tableTh}>Actions</th>
          </tr>

          {loading ? <Preloader /> : items}
        </tbody>
      </table>

      <Paginate currentPage={currentPage} pageSize={limit} onPageChanged={onPageChanged} />
    </div>
  )
};

export default ProductsList;