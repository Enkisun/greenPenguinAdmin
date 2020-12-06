import React, { useState } from 'react';
import { getProductsTC, setCurrentPage } from '../../redux/productsReducer';
import CreateProduct from './CreateProduct';
import classes from "./product.module.css";
import defaultImage from "../../assets/defaultImage.svg";

const Product = ({ product, productsCount, currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter, request, dispatch }) => {

  let [modal, setModal] = useState(false);

  const deleteHandler = async (id) => {
    try {
      await request('/api/products', 'DELETE', { id });
      dispatch(setCurrentPage(currentPage === 1 ? 1 : (productsCount > 1 ? currentPage : currentPage - 1)));
      (productsCount > 1 || (currentPage === 1 && productsCount === 1)) && dispatch(getProductsTC(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
    } catch (e) {}
  }

  return (
    <tr className={classes.tableTr}>
      <td className={classes.tableTd}>
        <img className={classes.productImage} src={product.image ? product.image.src : defaultImage} alt="productImage" />
      </td>
      <td className={classes.tableTd}>{product.name}</td>
      <td className={classes.tableTd}>{product.category}{product.subcategory && ` / ${product.subcategory}`}</td>
      <td className={classes.tableTd}>{product.trademark}</td>
      <td className={classes.tableTd}>{product.volume} мл/гр</td>
      <td className={classes.tableTd}>{product.price} руб</td>
      <td className={classes.tableTd}>
        <div className={classes.btnWrapper}>
          <CreateProduct request={request} modal={modal} setModal={setModal} product={product} />
          <button className={`${classes.btn} ${classes.deleteBtn}`} onClick={() => deleteHandler(product._id)}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default Product;