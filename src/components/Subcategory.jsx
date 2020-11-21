import React, { useCallback } from 'react';
import cn from 'classnames';
import classes from './category.module.css';

const Subcategory = ({ subcategory, subActive, setSubActive }) => {

  const setFlag = useCallback(() => { setSubActive(subcategory) }, []);

  return (
    <li className={cn(classes.subCategory, {[classes.subCategoryActive]: subActive === subcategory})} onClick={setFlag}>
      {subcategory}
    </li>
  )
}

export default Subcategory;