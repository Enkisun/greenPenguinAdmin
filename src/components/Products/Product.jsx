import React, { useState } from 'react'
import { setModalWindow } from '../../redux/productsReducer'
import { ProductForm } from '../../common/Form/ProductForm'
import cn from 'classnames'
import styles from './product.module.css'
import defaultImage from '../../assets/defaultImage.svg'

const Product = ({ product, deleteProductHandler, dispatch }) => {

  const [editModal, setEditModal] = useState(false);

  const changeModal = () => {
    setEditModal(true);
    dispatch(setModalWindow(true));
  }

  return (
    <tr className={styles.tableTr}>
      <td className={styles.tableTd}>
        <img className={styles.productImage} src={product.image || defaultImage} alt='productImage' />
      </td>
      <td className={styles.tableTd}>{product.category}{product.subcategory && ` / ${product.subcategory}`}</td>
      <td className={styles.tableTd}>{product.trademark}</td>
      <td className={styles.tableTd}>{product.name}</td>
      <td className={styles.tableTd}>{product.size} {product.unit}</td>
      <td className={styles.tableTd}>{product.price} руб</td>
      <td className={cn(styles.tableTd, styles.btnWrapper)}>
        <button className={cn(styles.btn, {[styles.editBtn]: product})} onClick={changeModal}>Edit</button>
        <button className={styles.btn} onClick={() => deleteProductHandler(product._id)}>Delete</button>

        { editModal && <ProductForm modal={editModal} setModal={setEditModal} product={product} /> }
      </td>
    </tr>
  )
}

export default Product;