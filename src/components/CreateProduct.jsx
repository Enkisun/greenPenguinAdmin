import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CustomReduxForm } from '../common/Form';
import { setModal } from '../redux/modalReducer';
import { addProduct } from '../redux/productsReducer';
import classes from './createProduct.module.css';

const CreateProduct = ({ request }) => {

  let dispatch = useDispatch();

  const setModalActive = useCallback(() => dispatch(setModal(true)), []);

  const onSubmit = async (formdata) => {
    try {
      await request('/api/products', 'POST', {...formdata});
      dispatch(addProduct(formdata));
      dispatch(setModal(false));
    } catch (e) {}
  }

  return (
    <>
      <button className={classes.createButton} onClick={setModalActive}>Create</button>
      <CustomReduxForm onSubmit={onSubmit} />
    </>
  )
}

export default CreateProduct;
