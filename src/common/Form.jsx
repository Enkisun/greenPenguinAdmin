import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Input, Textarea, Select } from "./formsControl";
import { requiredField, isNumber } from "./validators";
import { setModal } from '../redux/modalReducer';
import cn from 'classnames';
import classes from "./form.module.css";

const AddForm = ({ handleSubmit }) => {

  let dispatch = useDispatch();
  let modal = useSelector(state => state.modal.modal);
  let categories = useSelector(state => state.categories.categories);
  let trademarks = useSelector(state => state.trademarks.trademarks);

  let [selectedCategory, setSelectedCategory] = useState('');
  let [selectedValue, setSelectedValue] = useState('');

  let createRef = useRef();

  useEffect(() => {
    const onClickOutside = () => {
      const listener = e => {
        if (!createRef.current || createRef.current.contains(e.target)) return;
        dispatch(setModal(false));
        document.removeEventListener('mousedown', listener);
      };

      document.addEventListener('mousedown', listener);
    }

    onClickOutside();
  }, [modal]);

  let categoryOption = categories && categories.map(category => (
    <option value={category.category} key={category._id}>{category.category}</option>
  ));

  let category = categories && categories.filter(category => {
    if (category.category === selectedCategory) return category
  });

  let subCategoryOption = category[0] && category[0].subCategory.map(subCategory => (
    <option value={subCategory} key={subCategory}>{subCategory}</option>
  ));

  let trademarkOptions = trademarks && trademarks.map(trademark => (
    <option value={trademark.trademark} key={trademark._id}>{trademark.trademark}</option>
  ));

  return (
    <form onSubmit={handleSubmit} className={cn(classes.formParams, { [classes.formParamsActive]: modal })} ref={createRef}>
      <div>
        <h2 className={classes.title}>Create Product</h2>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formInputs}>
          <div className={classes.group}>
          <label htmlFor="category" className={classes.label}>Category</label>
            <Field validate={[requiredField]} setSelectedCategory={setSelectedCategory} name="category" component={Select} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              {categoryOption}
            </Field>
          </div>

          <div className={cn(classes.group, {[classes.disabled]: !selectedCategory})}>
            <label htmlFor="subCategory" className={classes.label}>Subcategory</label>
            <Field name="subCategory" setSelectedValue={setSelectedValue} component={Select} value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
              {subCategoryOption}
            </Field>
          </div>

          <div className={classes.group}>
            <label htmlFor="trademark" className={classes.label}>Trademark</label>
            <Field validate={[requiredField]} name="trademark" component={Select}>
              {trademarkOptions}
            </Field>
          </div>

          <div className={classes.group}>
            <label htmlFor="name" className={classes.label}>Name</label>
            <Field validate={[requiredField]} name="name" component={Input} />
          </div>

          <div className={classes.group}>
            <label htmlFor="volume" className={classes.label}>Volume</label>
            <Field validate={[requiredField, isNumber]} name="volume" component={Input} type="number" />
          </div>

          <div className={classes.group}>
            <label htmlFor="price" className={classes.label}>Price</label>
            <Field validate={[requiredField, isNumber]} name="price" component={Input} type="number" />
          </div>
        </div>

        <div className={classes.formInputs}>
          <div className={classes.group}>
            <label htmlFor="description" className={classes.label}>Description</label>
            <Field name="description" component={Textarea} />
          </div>

          <div className={`${classes.submit} ${classes.image}`}>
            <input type="file" id="imageSrc" name="imageSrc" accept="image/*"  />
            <button className={classes.submitButton} type='submit'>Save</button>
          </div>
        </div>
      </div>
    </form>


  );
};


export const CustomReduxForm = reduxForm({ form: "ProductForm" })(AddForm);