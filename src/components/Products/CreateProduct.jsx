import React from 'react'
import { ProductForm } from '../../common/Form/ProductForm'
import cn from 'classnames'
import styles from './createProduct.module.css'

// create?
const CreateProduct = ({ modal, setModal, product }) => {

  return (
    <>
      <button className={cn(styles.createButton, {[styles.edit]: product})} onClick={() => setModal(true)}>
        {product ? 'Edit' : 'Create'}
      </button>
      
      { modal && <ProductForm modal={modal} setModal={setModal} product={product} /> }
    </>
  )
}

export default CreateProduct;