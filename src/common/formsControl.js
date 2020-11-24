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
  let [localValue, setLocalValue] = useState('');

  const changeType = () => {
    if (fieldType && field.input.name === 'category') field.setSelectedCategory(localValue);
    setFieldType(!fieldType)
  }

  const hasError = field.meta.touched && field.meta.error;
  return (
    <>
      <select className={cn(classes.inputWrapper, classes.select, {[classes.formError]: hasError, [classes.disable]: fieldType})} {...field.input}>
        <option value={localValue}>{localValue}</option>
        {field.children}
      </select>

      <label htmlFor={field.input.label}>
        <input className={cn(classes.inputWrapper, {[classes.formError]: hasError, [classes.disable]: !fieldType})} {...field.input} value={localValue} onChange={e => setLocalValue(e.target.value)} />
        <PlusIcon className={cn(classes.plusIcon, {[classes.close]: fieldType})} onClick={() => changeType()} />
      </label>

      { hasError && <span className={classes.spanError}>{field.meta.error}</span> }
    </>
  );
};