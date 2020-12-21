import React, { useRef, useState } from 'react'
import cn from 'classnames'
import styles from './productFormControls.module.css'
import {ReactComponent as CheckIcon} from '../../assets/check.svg'

export const Input = ({ label, type, register, errors, required = false }) => {
  return (
    <div className={styles.group}>
      <label htmlFor={label} className={styles.label}>{label}</label>

      <input
       name={label}
       ref={register(required && { required: `${label} is a required` })}
       type={type}
       min='0'
       max='100000'
       step='0.01'
       className={cn(styles.inputWrapper, {[styles.formError]: errors[label], [styles.size]: label === 'Size'})}
      />

      <span className={styles.spanError}>{errors[label]?.message}</span>
    </div>
  );
};

export const Textarea = ({ label, register, errors }) => {
  return (
    <div className={cn(styles.group, styles.textareaGroup)}>
      <textarea 
       name={label} 
       ref={register}
       placeholder={label}
       className={cn(styles.inputWrapper, styles.textarea, {[styles.formError]: errors[label]})} 
      />

      <span className={styles.spanError}>{errors[label]?.message}</span>
    </div>
  );
};

export const Select = ({ label, options, register, errors, value, setValue, selectedCategory }) => {

  const selectRef = useRef();
  const [isActiveSubInput, setActiveSubInput] = useState(false);

  const changeSelectValue = e => {
    setValue(label, e.target.value);
  }

  const onChange = e => {
    const { selectedIndex, length } = selectRef.current.options;

    if (label === 'Category') {
      setValue('Subcategory', '');
    }

    if (selectedIndex === length - 1) {
      setValue(label, '');
      setActiveSubInput(true);
    } else {
      changeSelectValue(e);
    }
  }

  const isShowRequiredErrorMessage = !!((label === 'Category' || label === 'Trademark') && !value);

  return (
    <div className={styles.group}>
      <label htmlFor={label} className={styles.label}>{label}</label>

      <select
       name={label}
       value={value}
       onChange={onChange}
       ref={e => { register(isShowRequiredErrorMessage && { required: `${label} is a required` }); selectRef.current = e }}
       disabled={(label === 'Subcategory' && selectedCategory === '') || isActiveSubInput}
       className={cn(styles.inputWrapper, styles.select, {[styles.formError]: errors[label], [styles.unit]: label === 'Unit'})}
      >
        <option className={styles.keyOption} value={value}>{value}</option>
        <hr />
        {options}
        <option className={styles.keyOption}>New</option>
      </select>

      <div className={cn({[styles.disabled]: !isActiveSubInput})}>
        <input
         name={label}
         value={value}
         onChange={changeSelectValue} 
         ref={register(isShowRequiredErrorMessage && { required: `${label} is a required` })}
         placeholder={`New ${label}`}
         maxLength={label === 'Unit' ? '3' : '18'}
         className={cn(styles.inputWrapper, styles.subInput, {[styles.formError]: errors[label], [styles.unit]: label === 'Unit'})}
        />
      </div>

      <button className={styles.iconWrapper} onClick={() => setActiveSubInput(false)} type='button'>
        <CheckIcon className={cn({[styles.disabled]: !isActiveSubInput})} />
      </button>

      <span className={styles.spanError}>{errors[label]?.message}</span>
    </div>
  );
};