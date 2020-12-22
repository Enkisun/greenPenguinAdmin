import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getCategories } from '../../redux/categoriesReducer'
import { getTrademarks } from '../../redux/trademarksReducer'
import { getProductsTC } from '../../redux/productsReducer'
import { Input, Textarea, Select } from './ProductFormControls'
import cn from 'classnames'
import styles from './productForm.module.css'

export const ProductForm = ({ modal, setModal, product }) => {

  const productFormRef = useRef();
  const [imageText, setImageText] = useState(product?.image?.name);

  const dispatch = useDispatch();
  const { currentPage, limit } = useSelector(state => state.products);
  const { trademarks, trademarkFilter } = useSelector(state => state.trademarks);
  const { categories, categoryFilter, subcategoryFilter } = useSelector(state => state.categories);

  useEffect(() => {
    const onClickOutside = () => {
      const listener = e => {
        if (!productFormRef.current || productFormRef.current.contains(e.target)) return;
        setModal(false);
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
      Unit: product?.unit || 'мг',
      Price: product?.price || 0,
      Description: product?.description || '',
    }
  });

  const { Category, Subcategory, Trademark, Unit } = watch();

  const onSubmit = async (data) => {
    setModal(false)
    
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

    try {
      await fetch(`/categories?category=${data.Category}&subcategory=${data.Subcategory}`, {method: 'POST'});
      await fetch(`/trademarks?trademark=${data.Trademark}`, {method: 'POST'});
      await fetch('/products', {method: product ? 'PUT' : 'POST', body: formData});
    } catch (e) {
      console.log(e.message);
    }

    dispatch(getCategories());
    dispatch(getTrademarks());
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
  }

  const categoryOptions = categories?.map(category => 
    <option value={category.category} key={category._id}>{category.category}</option>
  );
  const currentCategory = categories?.filter(category => {
    if (category.category === Category) return category 
  });
  const subcategoryOptions = currentCategory[0]?.subcategory.map(subcategory => 
    <option value={subcategory} key={subcategory}>{subcategory}</option>
  );
  const trademarkOptions = trademarks?.map(trademark =>
    <option value={trademark.trademark} key={trademark._id}>{trademark.trademark}</option>
  );
  const unitOptions = (
    <>
      <option value='мг'>мг</option>
      <option value='гр'>гр</option>
    </>
  )

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