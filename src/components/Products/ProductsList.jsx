import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setCurrentPage, setModalWindow } from '../../redux/productsReducer'
import { getUnits, getTrademarks } from '../../redux/secondaryReducer'
import { ProductForm } from '../../common/Form/ProductForm'
import Paginate from '../../common/Paginate'
import Preloader from '../../common/Preloader'
import Product from './Product'
import styles from './productsList.module.css'

const ProductsList = () => {

  const [createModal, setCreateModal] = useState(false);

  const dispatch = useDispatch();
  const { products, currentPage, limit, loading } = useSelector(state => state.products);
  const { categoryFilter, subcategoryFilter, trademarkFilter } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(getUnits());
    dispatch(getTrademarks())
  }, [])

  useEffect(() => {
    dispatch(getProducts(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter))
  }, [currentPage, categoryFilter, subcategoryFilter, trademarkFilter]);

  const deleteProductHandler = async (id) => {
    try {
      await fetch(`/products?id=${id}`, {method: 'DELETE'});
    } catch (e) {
      console.log(e.message);
    }

    if (currentPage === 1 || products.length > 1) {
      dispatch(setCurrentPage(currentPage));
      dispatch(getProducts(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
    } else dispatch(setCurrentPage(currentPage - 1));
  }

  const onPageChanged = newCurrentPage => {
    dispatch(setCurrentPage(newCurrentPage, limit));
  }

  const changeModal = () => {
    setCreateModal(true);
    dispatch(setModalWindow(true));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Products List</h2>
        <button className={styles.createBtn} onClick={changeModal}>Create a new product</button>
        { createModal && <ProductForm modal={createModal} setModal={setCreateModal} /> }
      </div>

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

          { products?.map(product => <Product key={product._id} product={product} deleteProductHandler={deleteProductHandler} dispatch={dispatch} />) }

          { (!loading && products.length === 0) && <p className={styles.emptyList}>Товаров нет</p> }
        </tbody>
      </table>

      { loading && <Preloader /> }

      <Paginate currentPage={currentPage} pageSize={limit} onPageChanged={!loading && onPageChanged} />
    </div>
  )
};

export default ProductsList;