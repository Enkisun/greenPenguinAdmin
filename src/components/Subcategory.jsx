import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsTC } from '../redux/productsReducer';
import cn from 'classnames';
import classes from './category.module.css';

const Subcategory = ({ category, subcategory, activeSubCategory, setActiveSubCategory }) => {

  const dispatch = useDispatch();

  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);

  const setFilter = useCallback(() => {
    setActiveSubCategory(subcategory);
    dispatch(getProductsTC(currentPage, limit, category, subcategory))
  }, []);

  return (
    <li className={cn(classes.subCategory, {[classes.subCategoryActive]: activeSubCategory === subcategory})} onClick={setFilter}>
      {subcategory}
    </li>
  )
}

export default Subcategory;