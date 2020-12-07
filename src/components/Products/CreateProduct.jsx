import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomReduxForm } from '../../common/Form/Form';
import { getCategoriesTC } from '../../redux/categoriesReducer';
import { getTrademarksTC } from '../../redux/trademarksReducer';
import { getProductsTC } from '../../redux/productsReducer';
import cn from 'classnames';
import classes from './createProduct.module.css';

const CreateProduct = ({ request, modal, setModal, product }) => {

  const setFlag = useCallback(() => {
    product ? setModal(true) : dispatch(setModal(true))
  }, [product]);

  let dispatch = useDispatch();
  let { currentPage, limit } = useSelector(state => state).products;
  let { categoryFilter, subcategoryFilter } = useSelector(state => state).categories;
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);

  const onSubmit = async (formdata) => {
    product ? setModal(false) : dispatch(setModal(false));
    
    let formData = new FormData();
    let imageFile = document.getElementById("imageSrc").files[0];
    formData.append("image", imageFile);
    product && formData.append("id", product._id);
    formData.append("name", formdata.name);
    formData.append("category", formdata.category);
    formdata.subcategory && formData.append("subcategory", formdata.subcategory);
    formData.append("trademark", formdata.trademark);
    formData.append("volume", formdata.volume);
    formData.append("price", formdata.price);
    formData.append("description", formdata.description ? formdata.description : '');

    await request('api/trademarks', 'POST', {trademark: formdata.trademark});
    await request('api/categories', 'POST', {category: formdata.category, subcategory: formdata.subcategory});
    await fetch('api/products', { method: product ? 'PUT' : 'POST', body: formData });

    dispatch(getCategoriesTC());
    dispatch(getTrademarksTC());
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
  }

  return (
    <>
      <button className={cn(classes.createButton, {[classes.edit]: product})} onClick={setFlag}>{product ? 'Edit' : 'Create'}</button>
      { modal && <CustomReduxForm onSubmit={onSubmit} modal={modal} setModal={setModal} product={product} initialValues={{...product}} /> }
    </>
  )
}

export default CreateProduct;
