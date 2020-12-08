import React, { useState } from "react";
import cn from 'classnames';
import styles from './formsControl.module.css';
import {ReactComponent as PlusIcon} from '../../assets/plus.svg';
import {ReactComponent as CheckIcon} from '../../assets/check.svg';

export const Input = field => {

  let [value, setValue] = useState(field.defaultValue);

  let volume = field.input.name === 'volume';
  let weight = field.input.name === 'weight';

  const changeValue = e => {
    if (volume) field.setVolumeValue(e.target.value);
    if (weight) field.setWeightValue(e.target.value);
    setValue(e.target.value);
  }
  
  const hasError = field.meta.touched && field.meta.error;

  return (
    <>
      <input className={cn(styles.inputWrapper, "browser-default", {[styles.formError]: hasError})} {...field.input} type={field.type || "text"}
       value={value} min="0" step="0.01" onChange={changeValue} disabled={volume && Number(field.weightValue) || (weight && Number(field.volumeValue))}/>
      { hasError && <span className={styles.spanError}>{field.meta.error}</span> }
    </>
  );
};

export const Textarea = field => {

  let [value, setValue] = useState(field.defaultValue);

  const hasError = field.meta.touched && field.meta.error;

  return (
    <>
      <textarea className={cn(styles.inputWrapper, styles.textarea, {[styles.formError]: hasError})} {...field.input}
       value={value} onChange={e => setValue(e.target.value)} />
      { hasError && <span className={styles.spanError}>{field.meta.error}</span> }
    </>
  );
};

export const Select = field => {

  let [fieldType, setFieldType] = useState(false);
  let [localValue, setLocalValue] = useState(field.defaultValue ? field.defaultValue : '');

  const changeType = () => {
    if (fieldType && field.input.name === 'category') field.setSelectedCategory(localValue);
    setFieldType(!fieldType)
  }

  const hasError = field.meta.touched && field.meta.error;

  return (
    <>
      <select className={cn(styles.inputWrapper, styles.select, {[styles.formError]: hasError, [styles.disable]: fieldType})} {...field.input}>
        <option value={localValue}>{localValue}</option>
        {field.children}
      </select>

      <label htmlFor={field.input.label}>
        <input className={cn(styles.inputWrapper, "browser-default", {[styles.formError]: hasError, [styles.disable]: !fieldType})} {...field.input}
         value={localValue} onChange={e => setLocalValue(e.target.value)} type={field.type || "text"} />
        <PlusIcon className={cn(styles.icon, {[styles.disable]: fieldType})} onClick={changeType} />
        <CheckIcon className={cn(styles.icon, styles.checkIcon, {[styles.disable]: !fieldType})} onClick={changeType} />
      </label>

      { hasError && <span className={styles.spanError}>{field.meta.error}</span> }
    </>
  );
};