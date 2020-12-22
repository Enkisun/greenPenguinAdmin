import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setCurrentPage } from '../../redux/productsReducer'
import Paginate from '../../common/Paginate'
import Preloader from '../../common/Preloader'
import CreateProduct from './CreateProduct'
import Product from './Product'
import styles from './productsList.module.css'

const ProductsList = () => {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const { products, currentPage, limit, loading } = useSelector(state => state.products);
  const { categoryFilter, subcategoryFilter,  } = useSelector(state => state.categories);
  const trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);

  useEffect(() => {
    dispatch(getProducts(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter))
  }, [currentPage, categoryFilter, subcategoryFilter, trademarkFilter]);

  const deleteProductHandler = async (id) => {
    try {
      await fetch(`/products?id=${id}`, {method: 'DELETE'});
    } catch (e) {}

    dispatch(setCurrentPage((currentPage === 1 || products.length > 1) ? currentPage : currentPage - 1));
    dispatch(getProducts(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
  }

  const onPageChanged = newCurrentPage => {
    dispatch(setCurrentPage(newCurrentPage, limit));
  }

  const results = products?.map(product => (
    <Product key={product._id} product={product} deleteProductHandler={deleteProductHandler} />
  ));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Products List</h1>
        <CreateProduct modal={modal} setModal={setModal} />
      </header>

      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableTr}>
            <th className={styles.tableTh}>Image</th>
            <th className={styles.tableTh}>Category / Subcategory</th>
            <th className={styles.tableTh}>Trademark</th>
            <th className={styles.tableTh}>Name</th>
            <th className={styles.tableTh}>Volume / Weight</th>
            <th className={styles.tableTh}>Price</th>
            <th className={styles.tableTh}>Actions</th>
          </tr>

          {loading && <Preloader />}
          {results.length > 0 && results}
          {(!loading && results.length === 0) && <p className={styles.emptyList}>Товаров нет</p>}
        </tbody>
      </table>

      <Paginate currentPage={currentPage} pageSize={limit} onPageChanged={!loading && onPageChanged} />
    </div>
  )
};

export default ProductsList;