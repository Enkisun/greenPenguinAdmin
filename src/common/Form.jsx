import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Input, Textarea } from "./formsControl";
import { requiredField, isNumber } from "./validators";
import { setModal } from '../redux/modalReducer';
import cn from 'classnames';
import classes from "./form.module.css";

const AddForm = ({ handleSubmit }) => {

  let createRef = useRef();

  let dispatch = useDispatch();
  let modal = useSelector(state => state.modal.modal);

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

  const onSubmit = () => {
    fetch('api/products', { method: 'POST', body: new FormData("ProductForm") });
  }

  return (
    <form id="form" onSubmit={handleSubmit} className={cn(classes.formParams, { [classes.formParamsActive]: modal })} ref={createRef}>
      <div className={classes.formInputs}>
        <div className={classes.group}>
          <label htmlFor="name">Name</label>
          <Field validate={[requiredField]} name="name" component={Input} />
        </div>

        <div className={classes.group}>
          <label htmlFor="category">Category</label>
          <Field validate={[requiredField]} name="category" component={Input} />
        </div>

        <div className={classes.group}>
          <label htmlFor="trademark">Trademark</label>
          <Field validate={[requiredField]} name="trademark" component={Input} />
        </div>

        <div className={classes.group}>
          <label htmlFor="volume">Volume</label>
          <Field validate={[requiredField, isNumber]} name="volume" component={Input} type="number" />
        </div>

        <div className={classes.group}>
          <label htmlFor="price">Price</label>
          <Field validate={[requiredField, isNumber]} name="price" component={Input} type="number" />
        </div>
      </div>

      <div className={classes.formInputs}>
        {/* <div className={classes.group}>
          <label htmlFor="description">Description</label>
          <Field validate={[requiredField]} name="description" component={Textarea} />
        </div> */}

        <div className={classes.group}>
          <input type="file" id="imageSrc" name="imageSrc" accept="image/*"  />
          {/* onChange={() => uploadImage()} */}
        </div>

        <button className={classes.submitButton} type='submit'>Save</button>
      </div>
    </form>


  );
};


export const CustomReduxForm = reduxForm({ form: "ProductForm" })(AddForm);