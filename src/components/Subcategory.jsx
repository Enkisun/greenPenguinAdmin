import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/categoriesReducer';
import { getProductsTC } from '../redux/productsReducer';
import cn from 'classnames';
import classes from './subcategory.module.css';

const Subcategory = ({ category, subcategory, activeSubCategory, setActiveSubCategory }) => {

  const dispatch = useDispatch();

  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);

  const setFilter = () => {
    setActiveSubCategory(subcategory);
    dispatch(setFilters(category, subcategory))
    dispatch(getProductsTC(currentPage, limit, category, subcategory, trademarkFilter));
  };

  return (
    <li className={cn(classes.subCategory, {[classes.subCategoryActive]: activeSubCategory === subcategory})} onClick={setFilter}>
      {subcategory}
    </li>
  )
}

export default Subcategory;