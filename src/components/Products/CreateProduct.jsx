import React from 'react';
import { useDispatch } from 'react-redux';
import { CustomReduxForm } from '../../common/Form/Form';
import cn from 'classnames';
import classes from './createProduct.module.css';

const CreateProduct = ({ request, modal, setModal, product }) => {

  const setFlag = () => product ? setModal(true) : dispatch(setModal(true));

  let dispatch = useDispatch();

  const onSubmit = async (formdata) => {
    product ? setModal(false) : dispatch(setModal(false));
    let formData = new FormData();
    let imageFile = document.getElementById("imageSrc").files[0];
    formData.append("image", imageFile);
    formData.append("name", formdata.name);
    formData.append("category", formdata.category);
    formData.append("subCategory", formdata.subCategory ? formdata.subCategory : '');
    formData.append("trademark", formdata.trademark);
    formData.append("volume", formdata.volume);
    formData.append("price", formdata.price);
    formData.append("description", formdata.description ? formdata.description : '');
    await request('api/trademarks', 'POST', {trademark: formdata.trademark});
    await request('api/categories', 'POST', {category: formdata.category, subCategory: formdata.subCategory});
    product && formData.append("id", product._id);
    await fetch('api/products', { method: product ? 'PUT' : 'POST', body: formData });
  }

  return (
    <>
      <button className={cn(classes.createButton, {[classes.edit]: product})} onClick={setFlag}>{product ? 'Edit' : 'Create'}</button>
      { modal && <CustomReduxForm onSubmit={onSubmit} modal={modal} setModal={setModal} product={product} initialValues={{...product}} /> }
    </>
  )
}

export default CreateProduct;
