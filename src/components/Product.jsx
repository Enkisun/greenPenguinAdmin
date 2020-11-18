import React from 'react';
import classes from "../app.module.css";

const Product = ({ product, request }) => {

  const deleteHandler = async (id) => {
    try {
      await request('/api/products', 'DELETE', { id });
    } catch (e) {}
  }

  return (
    <tr>
      <td>{product._id}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.trademark}</td>
      <td>{product.volume}</td>
      <td>{product.price}</td>
      <button className={`${classes.btn} ${classes.editBtn}`} onClick={() => deleteHandler(product.id)}>Edit</button>
      <button className={`${classes.btn} ${classes.deleteBtn}`} onClick={() => deleteHandler(product.id)}>Delete</button>
    </tr>
  )
}

export default Product;