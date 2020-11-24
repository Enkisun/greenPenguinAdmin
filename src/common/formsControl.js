import React, { useState } from "react";
import cn from 'classnames';
import classes from './formsControl.module.css';
import {ReactComponent as PlusIcon} from '../assets/plus.svg';

export const Input = field => {
  const hasError = field.meta.touched && field.meta.error;
  return (
    <>
      <input className={cn(classes.inputWrapper, {[classes.formError]: hasError})} {...field.input} type={field.type || "text"} />
      { hasError && <span className={classes.spanError}>{field.meta.error}</span> }
    </>
  );
};

export const Textarea = field => {
  const hasError = field.meta.touched && field.meta.error;
  return (
    <>
      <textarea className={cn(classes.inputWrapper, classes.textarea, {[classes.formError]: hasError})} {...field.input} />
      { hasError && <span className={classes.spanError}>{field.meta.error}</span> }
    </>
  );
};

export const Select = field => {
  let [fieldType, setFieldType] = useState(false);

  const changeType = () => {
    setFieldType(!fieldType)
    if (field.input.name === 'category') field.setSelectedCategory('');
    if (field.input.name === 'subCategory') field.setSelectedValue('');
  }

  const hasError = field.meta.touched && field.meta.error;
  return (
    <>
      <label htmlFor={field.input.label}>
        <select className={cn(classes.inputWrapper, classes.select, {[classes.formError]: hasError, [classes.disable]: fieldType})} {...field.input}>
          <option></option>
          {field.children}
        </select>

        <input className={cn(classes.inputWrapper, {[classes.formError]: hasError, [classes.disable]: !fieldType})} {...field.input} />
        <PlusIcon className={cn(classes.plusIcon, {[classes.close]: fieldType})} onClick={() => changeType()} />
        { hasError && <span className={classes.spanError}>{field.meta.error}</span> }
      </label>
    </>
  );
};