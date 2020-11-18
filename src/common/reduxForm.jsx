import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { Input } from "./formsControl";
import { requiredField, isNumber } from "./validators";
import { setModalTC } from '../redux/modalReducer';
import cn from 'classnames';
import classes from "../app.module.css";

const AddForm = ({ handleSubmit }) => {

  let createRef = useRef();

  let dispatch = useDispatch();
  let modal = useSelector(state => state.modal.modal);

  useEffect(() => {
    const onClickOutside = () => {
      const listener = e => {
        if (!createRef.current || createRef.current.contains(e.target)) return;
        dispatch(setModalTC(false));
        document.removeEventListener('mousedown', listener);
      };

      document.addEventListener('mousedown', listener);
    }

    onClickOutside();
  }, [modal]);

  return (
    <form onSubmit={handleSubmit} className={cn(classes.formParams, { [classes.formParamsActive]: modal })} ref={createRef}>

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

      <button className={classes.btn}>Save</button>
    </form>
  );
};

export const CustomReduxForm = reduxForm({ form: "ProductForm" })(AddForm);