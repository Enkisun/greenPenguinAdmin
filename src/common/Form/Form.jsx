import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Input, Textarea, Select } from "./formsControl";
import { requiredField, isNumber } from "./validators";
import cn from 'classnames';
import classes from "./form.module.css";

const AddForm = ({ handleSubmit, modal, setModal, product }) => {

  let dispatch = useDispatch();
  let categories = useSelector(state => state.categories.categories);
  let trademarks = useSelector(state => state.trademarks.trademarks);

  let [selectedCategory, setSelectedCategory] = useState('');
  let [selectedValue, setSelectedValue] = useState('');

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
  let subCategoryOption = category[0] && category[0].subCategory.map(subCategory => 
    <option value={subCategory} key={subCategory}>{subCategory}</option>
  );
  let trademarkOption = trademarks && trademarks.map(trademark =>
    <option value={trademark.trademark} key={trademark._id}>{trademark.trademark}</option>
  );

  let categoryChildren = product ? categoryOption.filter(a => { if (a.props.value !== product.category) return a }) : categoryOption;
  let subCategoryChildren = product ? subCategoryOption.filter(a => { if (a.props.value !== product.subCategory) return a }) : subCategoryOption;
  let trademarksChildren = product ? trademarkOption.filter(a => { if (a.props.value !== product.trademark) return a }) : trademarkOption;

const onChange = () => {
  let id = document.getElementById("imageSrc");
  let name = id.files[0].name;
  selectedFileNameRef.current.innerHTML = name;
}

  return (
    <form onSubmit={handleSubmit} initialValues={product && {...product}} className={cn(classes.formParams, { [classes.formParamsActive]: modal })} ref={productFormRef}>
      <div>
        <h2 className={classes.title}>{product ? 'Edit Product' : 'Create Product'}</h2>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formInputs}>
          <div className={classes.group}>
          <label htmlFor="category" className={classes.label}>Category</label>
            <Field validate={[requiredField]} setSelectedCategory={setSelectedCategory} name="category" component={Select}
             defaultValue={product ? product.category : ''} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {categoryChildren}
            </Field>
          </div>

          <div className={cn(classes.group, {[classes.disabled]: !selectedCategory && !product})}>
            <label htmlFor="subCategory" className={classes.label}>Subcategory</label>
            <Field name="subCategory" setSelectedValue={setSelectedValue} component={Select} 
             defaultValue={product ? product.subCategory : ''} value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
              {subCategoryChildren}
            </Field>
          </div>

          <div className={classes.group}>
            <label htmlFor="trademark" className={classes.label}>Trademark</label>
            <Field validate={[requiredField]} name="trademark" component={Select} defaultValue={product ? product.trademark : ''}>
              {trademarksChildren}
            </Field>
          </div>

          <div className={classes.group}>
            <label htmlFor="name" className={classes.label}>Name</label>
            <Field validate={[requiredField]} name="name" component={Input} defaultValue={product ? product.name : ''} />
          </div>

          <div className={classes.group}>
            <label htmlFor="volume" className={classes.label}>Volume</label>
            <Field validate={[requiredField, isNumber]} name="volume" component={Input} type="number" defaultValue={product ? product.volume : ''} />
          </div>

          <div className={classes.group}>
            <label htmlFor="price" className={classes.label}>Price</label>
            <Field validate={[requiredField, isNumber]} name="price" component={Input} type="number" defaultValue={product ? product.price : ''} />
          </div>
        </div>

        <div className={classes.formInputs}>
          <div className={`${classes.group} ${classes.textarea}`}>
            <label htmlFor="description" className={classes.label}>Description</label>
            <Field name="description" component={Textarea} defaultValue={product ? product.description : ''} />
          </div>

          <div className={classes.submit}>
            <label htmlFor="imageSrc" className={classes.imageLabel}>
              <div className={classes.fileButton}>Choose File</div>
              <input type="file" id="imageSrc" name="imageSrc" accept="image/*" hidden onChange={onChange} />
              <span ref={selectedFileNameRef} className={classes.imageName}>{product ? product.image.name : 'Файл не выбран'}</span>
            </label>
            
            <button className={classes.submitButton}>Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export const CustomReduxForm = reduxForm({ form: "ProductForm", enableReinitialize: true })(AddForm);