import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHttp } from '../../hooks/http.hook'
import { Input, Textarea, Select } from './ProductFormControls'
import cn from 'classnames'
import styles from './productForm.module.css'

export const ProductForm = ({ modal, setModal, product }) => {

  const { request } = useHttp();

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
      Name: product?.name || '',
      Volume: product?.volume || '',
      Weight: product?.weight || '',
      Price: product?.price || 0,
      Description: product?.description || '',
      Category: product?.category || '',
      Subcategory: product?.subcategory || '',
      Trademark: product?.trademark || '',
    }
  });

  const { Category, Subcategory, Trademark, Volume, Weight, Price, Name } = watch();

  const onSubmit = async (data) => {
    console.log(data);
    setModal(false)
    
    const formData = new FormData();
    const imageFile = data.imageSrc[0];
    formData.append("image", imageFile);
    product && formData.append("id", product._id);
    formData.append("category", data.Category);
    formData.append("subcategory", data.Subcategory);
    formData.append("trademark", data.Trademark);
    formData.append("name", data.Name);
    formData.append("volume", data.Volume ? Number(data.Volume).toFixed(2) : 0);
    formData.append("weight", data.Weight ? Number(data.Weight).toFixed(2) : 0);
    formData.append("price", Number(data.Price).toFixed(2));
    formData.append("description", data.Description);

    // try/catch
    await request('api/trademarks', 'POST', {trademark: data.Trademark});
    await request('api/categories', 'POST', {category: data.Category, subcategory: data.Subcategory});
    await request('api/products', product ? 'PUT' : 'POST', { body: formData });

    dispatch(getCategoriesTC());
    dispatch(getTrademarksTC());
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subcategoryFilter, trademarkFilter));
  }

  const categoryOptions = categories && categories.map(category => 
    <option value={category.category} key={category._id}>{category.category}</option>
  );
  const currentCategory = categories && categories.filter(category => {
    if (category.category === Category) return category 
  });
  const subcategoryOptions = currentCategory[0]?.subcategory.map(subcategory => 
    <option value={subcategory} key={subcategory}>{subcategory}</option>
  );
  const trademarkOptions = trademarks && trademarks.map(trademark =>
    <option value={trademark.trademark} key={trademark._id}>{trademark.trademark}</option>
  );

  const onChangeImage = e => {
    setImageText(e.target.files[0].name);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.formParams, {[styles.formParamsActive]: modal})} ref={productFormRef}>
      <h2 className={styles.title}>{product ? 'Edit Product' : 'Create Product'}</h2>

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

          <Input label='Name' type='text' register={register} errors={errors} value={Name} setValue={setValue} required='true' />
          <Input label='Volume' type='number' register={register} errors={errors} value={Volume} setValue={setValue} />
          <Input label='Weight' type='number' register={register} errors={errors} value={Weight} setValue={setValue} />
          <Input label='Price' type='number' register={register} errors={errors} value={Price} setValue={setValue} required='true' />
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