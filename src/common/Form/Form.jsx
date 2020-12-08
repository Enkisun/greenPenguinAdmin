import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Input, Textarea, Select } from "./formsControl";
import { requiredField, isNumber, isEmpty } from "./validators";
import cn from 'classnames';
import styles from "./form.module.css";

const AddForm = ({ handleSubmit, modal, setModal, product }) => {

  let dispatch = useDispatch();
  let categories = useSelector(state => state.categories.categories);
  let trademarks = useSelector(state => state.trademarks.trademarks);

  let [selectedCategory, setSelectedCategory] = useState('');
  let [selectedValue, setSelectedValue] = useState('');
  let [volumeValue, setVolumeValue] = useState(product ? product.volume : 0);
  let [weightValue, setWeightValue] = useState(product ? product.weight : 0);

  let productFormRef = useRef();
  let selectedFileNameRef = useRef();

  useEffect(() => {
    const onClickOutside = () => {
      const listener = e => {
        if (!productFormRef.current || productFormRef.current.contains(e.target)) return;
        product ? setModal(false) : dispatch(setModal(false));
        document.removeEventListener('mousedown', listener);
      };

      document.addEventListener('mousedown', listener);
    }

    onClickOutside();
  }, [modal]);

  let categoryOption = categories && categories.map(category => 
    <option value={category.category} key={category._id}>{category.category}</option>
  );
  let category = categories && categories.filter(category => {
    if (category.category === (product ? product.category : selectedCategory)) return category 
  });
  let subcategoryOption = (category[0] && category[0].subcategory) && category[0].subcategory.map(subcategory => 
    <option value={subcategory} key={subcategory}>{subcategory}</option>
  );
  let trademarkOption = trademarks && trademarks.map(trademark =>
    <option value={trademark.trademark} key={trademark._id}>{trademark.trademark}</option>
  );

  let categoryChildren = product ? categoryOption.filter(a => { if (a.props.value !== product.category) return a }) : categoryOption;
  let subcategoryChildren = (product && subcategoryOption) ? subcategoryOption.filter(a => { if (a.props.value !== product.subcategory) return a }) : subcategoryOption;
  let trademarksChildren = product ? trademarkOption.filter(a => { if (a.props.value !== product.trademark) return a }) : trademarkOption;

  const onChange = () => {
    let id = document.getElementById("imageSrc");
    let name = id.files[0].name;
    selectedFileNameRef.current.innerHTML = name;
  }

  let imageText = product ? (product.image ? product.image.name : 'Файл не выбран') : 'Файл не выбран'

  return (
    <form onSubmit={handleSubmit} initialValues={product && {...product}} className={cn(styles.formParams, { [styles.formParamsActive]: modal })} ref={productFormRef}>
      <div>
        <h2 className={styles.title}>{product ? 'Edit Product' : 'Create Product'}</h2>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formInputs}>
          <div className={styles.group}>
          <label htmlFor="category" className={styles.label}>Category *</label>
            <Field validate={[requiredField]} setSelectedCategory={setSelectedCategory} name="category" component={Select}
             defaultValue={product ? product.category : ''} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {categoryChildren}
            </Field>
          </div>

          <div className={cn(styles.group, {[styles.disabled]: !selectedCategory && !product})}>
            <label htmlFor="subcategory" className={styles.label}>Subcategory</label>
            <Field name="subcategory" component={Select} defaultValue={product ? product.subcategory : ''}
             value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
              {subcategoryChildren}
            </Field>
          </div>

          <div className={styles.group}>
            <label htmlFor="trademark" className={styles.label}>Trademark *</label>
            <Field validate={[requiredField]} name="trademark" component={Select} defaultValue={product ? product.trademark : ''}>
              {trademarksChildren}
            </Field>
          </div>

          <div className={styles.group}>
            <label htmlFor="name" className={styles.label}>Name *</label>
            <Field validate={[requiredField, isEmpty]} name="name" component={Input} defaultValue={product ? product.name : ''} />
          </div>

          <div className={styles.group}>
            <label htmlFor="volume" className={styles.label}>Volume (ml)</label>
            <Field validate={[isNumber]} name="volume" component={Input} type="number" defaultValue={product ? product.volume : ''} 
             setVolumeValue={setVolumeValue} weightValue={weightValue} volumeValue={volumeValue} />
          </div>

          <div className={styles.group}>
            <label htmlFor="weight" className={styles.label}>Weight (gram)</label>
            <Field validate={[isNumber]} name="weight" component={Input} type="number" defaultValue={product ? product.weight : ''}
             setWeightValue={setWeightValue} weightValue={weightValue} volumeValue={volumeValue} />
          </div>

          <div className={styles.group}>
            <label htmlFor="price" className={styles.label}>Price (BYN) *</label>
            <Field validate={[requiredField, isNumber]} name="price" component={Input} type="number" defaultValue={product ? product.price : ''} />
          </div>
        </div>

        <div className={styles.formInputs}>
          <div className={`${styles.group} ${styles.textarea}`}>
            <label htmlFor="description" className={`${styles.label} ${styles.textareaLabel}`}>Description</label>
            <Field name="description" component={Textarea} defaultValue={product ? product.description : ''} />
          </div>

          <div className={styles.submit}>
            <label htmlFor="imageSrc" className={styles.imageLabel}>
              <div className={styles.fileButton}>Choose File</div>
              <input type="file" id="imageSrc" name="imageSrc" accept="image/*" hidden onChange={onChange} />
              <span ref={selectedFileNameRef} className={styles.imageName}>{imageText}</span>
            </label>
            
            <button className={styles.submitButton}>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export const CustomReduxForm = reduxForm({ form: "ProductForm", enableReinitialize: true })(AddForm);