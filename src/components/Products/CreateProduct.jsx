import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomReduxForm } from '../../common/Form/Form';
import { getCategoriesTC } from '../../redux/categoriesReducer';
import { getTrademarksTC } from '../../redux/trademarksReducer';
import { getProductsTC } from '../../redux/productsReducer';
import cn from 'classnames';
import classes from './createProduct.module.css';

const CreateProduct = ({ request, modal, setModal, product }) => {

  const setFlag = () => product ? setModal(true) : dispatch(setModal(true));

  let dispatch = useDispatch();
  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);
  let categoryFilter = useSelector(state => state.categories.categoryFilter);
  let subCategoryFilter = useSelector(state => state.categories.subCategoryFilter);

  const onSubmit = async (formdata) => {
    product ? setModal(false) : dispatch(setModal(false));
    
    let formData = new FormData();
    let imageFile = document.getElementById("imageSrc").files[0];
    formData.append("image", imageFile);
    product && formData.append("id", product._id);
    formData.append("name", formdata.name);
    formData.append("category", formdata.category);
    formdata.subCategory && formData.append("subCategory", formdata.subCategory);
    formData.append("trademark", formdata.trademark);
    formData.append("volume", formdata.volume);
    formData.append("price", formdata.price);
    formData.append("description", formdata.description ? formdata.description : '');

    await request('api/trademarks', 'POST', {trademark: formdata.trademark});
    await request('api/categories', 'POST', {category: formdata.category, subCategory: formdata.subCategory});
    await fetch('api/products', { method: product ? 'PUT' : 'POST', body: formData });

    dispatch(getCategoriesTC());
    dispatch(getTrademarksTC());
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subCategoryFilter, trademarkFilter));
  }

  return (
    <>
      <button className={cn(classes.createButton, {[classes.edit]: product})} onClick={setFlag}>{product ? 'Edit' : 'Create'}</button>
      { modal && <CustomReduxForm onSubmit={onSubmit} modal={modal} setModal={setModal} product={product} initialValues={{...product}} /> }
    </>
  )
}

export default CreateProduct;
