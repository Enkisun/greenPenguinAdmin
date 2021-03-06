import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getCategories } from '../../redux/categoriesReducer'
import { getProducts, setModalWindow } from '../../redux/productsReducer'
import { Input, Textarea, Select } from './ProductFormControls'
import cn from 'classnames'
import styles from './productForm.module.css'
import { getUnits, getTrademarks } from '../../redux/secondaryReducer'

export const ProductForm = ({ modal, setModal, product }) => {

  const productFormRef = useRef();
  const [imageText, setImageText] = useState(product?.image?.name);

  const dispatch = useDispatch();
  const { categoriesData, categoryFilter, subcategoryFilter, trademarkFilter } = useSelector(state => state.categories);
  const { currentPage, limit } = useSelector(state => state.products);
  const { unitsData, trademarksData } = useSelector(state => state.secondary);

  useEffect(() => {
    const onClickOutside = () => {
      const listener = e => {
        if (!productFormRef.current || productFormRef.current.contains(e.target)) return;
        setModal(false);
        dispatch(setModalWindow(false));
        document.removeEventListener('mousedown', listener);
      };
      document.addEventListener('mousedown', listener);
    }
    onClickOutside();
  }, [modal]);

  const { errors, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { 
      Category: product?.category || '',
      Subcategory: product?.subcategory || '',
      Trademark: product?.trademark || '',
      Name: product?.name || '',
      Size: product?.size || 0,
      Unit: product?.unit || unitsData[0]?.name || 'мг',
      Price: product?.price || 0,
      Description: product?.description || '',
    }
  });

  const { Category, Subcategory, Trademark, Unit } = watch();

  const onSubmit = async (data) => {
    setModal(false)
    dispatch(setModalWindow(false));
    
    const formData = new FormData();

    product && formData.append("id", product._id);
    formData.append("category", data.Category);
    formData.append("subcategory", data.Subcategory);
    formData.append("trademark", data.Trademark);
    formData.append("name", data.Name);
    formData.append("size", data.Size ? Number(data.Size).toFixed(2) : 0);
    formData.append("unit", data.Unit);
    formData.append("price", data.Price ? Number(data.Price).toFixed(2) : 0);
    formData.append("description", data.Description);
    formData.append("image", data.imageSrc[0]);

    let categoryURI = `/categories?trademark=${data.Trademark}&category=${data.Category}`;
    
    if (data.Subcategory) {
      categoryURI += `&subcategory=${data.Subcategory}`;
    }

    try {
      await fetch(categoryURI, {method: 'POST'});
      dispatch(getCategories());

      await fetch(`/units?unit=${data.Unit}`, {method: 'POST'});
      dispatch(getUnits());

      await fetch(`/trademarks?trademark=${data.Trademark}`, {method: 'POST'});
      dispatch(getTrademarks());

      await fetch('/products', {method: product ? 'PUT' : 'POST', body: formData});
      dispatch(getProducts(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
    } catch (e) {
      console.log(e.message);
    }
  }

  const categoryOptions = categoriesData?.map(category => 
    <option value={category.name} key={category._id}>{category.name}</option>
  );

  const currentCategory = categoriesData?.filter(category => {
    if (category.name === Category) return category 
  });

  const subcategoryOptions = currentCategory[0]?.subcategories.map(subcategory => 
    <option value={subcategory.name} key={subcategory._id}>{subcategory.name}</option>
  );

  const trademarkOptions = trademarksData?.map(trademark =>
    <option value={trademark.name} key={trademark._id}>{trademark.name}</option>
  );

  const unitOptions = unitsData?.map(unit =>
    <option value={unit.name} key={unit._id}>{unit.name}</option>
  );

  const onChangeImage = e => {
    setImageText(e.target.files[0].name);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.formParams, {[styles.formParamsActive]: modal})} ref={productFormRef}>
      <h2 className={styles.title}>{product ? 'Edit product' : 'Create a new product'}</h2>

      <div className={styles.formWrapper}>
        <div className={styles.formInputs}>
          <Select 
           label='Category'
           options={categoryOptions} 
           register={register} 
           errors={errors} 
           value={Category} 
           setValue={setValue} 
          />

          <Select
            label='Subcategory' 
            options={subcategoryOptions} 
            register={register} 
            errors={errors} 
            value={Subcategory} 
            setValue={setValue}
            selectedCategory={Category}
          />

          <Select 
           label='Trademark' 
           options={trademarkOptions} 
           register={register} 
           errors={errors} 
           value={Trademark} 
           setValue={setValue} 
          />

          <Input label='Name' type='text' register={register} errors={errors} required='true' />

          <div className={styles.group}>
            <Input label='Size' type='number' register={register} errors={errors} />

            <Select 
             label='Unit' 
             options={unitOptions} 
             register={register} 
             errors={errors} 
             value={Unit} 
             setValue={setValue} 
            />
          </div>
          
          <Input label='Price' type='number' register={register} errors={errors} required='true' />
        </div>

        <div className={styles.formInputs}>
          <Textarea label='Description' register={register} errors={errors} />

          <div className={styles.submit}>
            <label htmlFor='imageSrc' className={styles.imageLabel}>
              <div className={styles.fileButton} type='button'>Choose File</div>
              <input type='file' id='imageSrc' name='imageSrc' accept='image/*' hidden onChange={onChangeImage} ref={register} />
              <span className={styles.imageName}>{imageText || 'Файл не выбран'}</span>
            </label>
            
            <button className={styles.submitButton}>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};