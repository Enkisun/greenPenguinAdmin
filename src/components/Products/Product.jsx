import React, { useState } from 'react';
import { getProductsTC, setCurrentPage } from '../../redux/productsReducer';
import CreateProduct from './CreateProduct';
import styles from "./product.module.css";
import defaultImage from "../../assets/defaultImage.svg";

const Product = ({ product, productsCount, currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter, dispatch }) => {

  const [modal, setModal] = useState(false);

  const deleteHandler = async (id) => {
    try {
      await fetch(`/api/products?id=${id}`, {method: 'DELETE'});
      dispatch(setCurrentPage(currentPage === 1 ? 1 : (productsCount > 1 ? currentPage : currentPage - 1)));
      (productsCount > 1 || (currentPage === 1 && productsCount === 1)) && dispatch(getProductsTC(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
    } catch (e) {}
  }

  return (
    <tr className={styles.tableTr}>
      <td className={styles.tableTd}>
        <img className={styles.productImage} src={product.image ? product.image.src : defaultImage} alt="productImage" />
      </td>
      <td className={styles.tableTd}>{product.name}</td>
      <td className={styles.tableTd}>{product.category}{product.subcategory && ` / ${product.subcategory}`}</td>
      <td className={styles.tableTd}>{product.trademark}</td>
      <td className={styles.tableTd}>{product.volume ? `${product.volume} мл` : `${product.weight} гр`}</td>
      <td className={styles.tableTd}>{product.price} руб</td>
      <td className={styles.tableTd}>
        <div className={styles.btnWrapper}>
          <CreateProduct modal={modal} setModal={setModal} product={product} />
          <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => deleteHandler(product._id)}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default Product;