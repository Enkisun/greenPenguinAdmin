import React from "react";
import cn from 'classnames';
import classes from './formsControl.module.css';

export const Input = field => {

  const hasError = field.meta.touched && field.meta.error;

  return (
    <div className={cn({[`${classes.formError}`]: hasError})}>
      <input {...field.input} type={field.type || "text"} />
      { hasError && <span className={classes.spanError}>{field.meta.error}</span> }
    </div>
  );
};

export const Textarea = field => {

  const hasError = field.meta.touched && field.meta.error;

  return (
    <div className={cn({[`${classes.formError}`]: hasError})}>
      <textarea {...field.textarea} />
      { hasError && <span className={classes.spanError}>{field.meta.error}</span> }
    </div>
  );
};