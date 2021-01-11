import React, { useState } from 'react'
import { ProductForm } from '../../common/Form/ProductForm'
import cn from 'classnames'
import styles from './product.module.css'
import defaultImage from '../../assets/defaultImage.svg'

const Product = ({ product, deleteProductHandler }) => {

  const [modal, setModal] = useState(false);

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
        <button className={cn(styles.btn, {[styles.editBtn]: product})} onClick={() => setModal(true)}>Edit</button>
        <button className={cn(styles.btn, styles.deleteBtn)} onClick={() => deleteProductHandler(product._id)}>Delete</button>

        { modal && <ProductForm modal={modal} setModal={setModal} product={product} /> }
      </td>
    </tr>
  )
}

export default Product;