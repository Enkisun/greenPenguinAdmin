import React from 'react';
import { useSelector } from 'react-redux';
import { getProductsTC } from '../redux/productsReducer';
import classes from "./product.module.css";
import defaultImage from "../assets/defaultImage.svg";

const Product = ({ product, request, dispatch }) => {

  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);

  const deleteHandler = async (id) => {
    try {
      await request('/api/products', 'DELETE', { id });
      dispatch(getProductsTC(currentPage, limit));
    } catch (e) {}
  }

  return (
    <tr className={classes.tableTr}>
      <td className={classes.tableTd}>
        <img className={classes.productImage} src={product.image ? product.image : defaultImage} alt="productImage" />
      </td>
      <td className={classes.tableTd}>{product.category}</td>
      <td className={classes.tableTd}>{product.subCategory}</td>
      <td className={classes.tableTd}>{product.trademark}</td>
      <td className={classes.tableTd}>{product.name}</td>
      <td className={classes.tableTd}>{product.volume}</td>
      <td className={classes.tableTd}>{product.price}</td>
      <td className={classes.tableTd}>
        <div className={classes.btnWrapper}>
          <button className={`${classes.btn} ${classes.editBtn}`} onClick={() => deleteHandler(product._id)}>Edit</button>
          <button className={`${classes.btn} ${classes.deleteBtn}`} onClick={() => deleteHandler(product._id)}>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default Product;