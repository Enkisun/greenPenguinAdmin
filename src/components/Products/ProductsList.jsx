import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsTC, setCurrentPage } from '../../redux/productsReducer'
import Paginate from '../../common/Paginate'
import Preloader from '../../common/Preloader'
import CreateProduct from './CreateProduct'
import Product from './Product'
import styles from './productsList.module.css'

const ProductsList = () => {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  let { products, currentPage, limit, loading } = useSelector(state => state.products);
  let { categoryFilter, subcategoryFilter,  } = useSelector(state => state.categories);
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);

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
     dispatch={dispatch}
    />
  ));

  const items = results.length > 0 ? results : <p className={styles.emptyList}>Результатов нет</p>

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <CreateProduct modal={modal} setModal={setModal} />
        <h1 className={styles.headerTitle}>Products List</h1>
        <a href='#' className={styles.logout}>logout</a>
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