import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CustomReduxForm } from '../common/Form';
import { setModal } from '../redux/modalReducer';
import { addProduct } from '../redux/productsReducer';
import classes from './createProduct.module.css';

const CreateProduct = () => {

  let dispatch = useDispatch();

  const setModalActive = useCallback(() => dispatch(setModal(true)), []);

  const onSubmit = async (formdata) => {
    try {
      let formData = new FormData();
      let imageFile = document.getElementById("imageSrc").files[0];
      formData.append("image", imageFile);
      formData.append("name", formdata.name);
      formData.append("category", formdata.category);
      formData.append("trademark", formdata.trademark);
      formData.append("volume", formdata.volume);
      formData.append("price", formdata.price);
      await fetch('api/products', { method: 'POST', body: formData });
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
