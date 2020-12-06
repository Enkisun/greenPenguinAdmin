import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/categoriesReducer';
import { setCurrentPage } from '../../redux/productsReducer';
import cn from 'classnames';
import classes from './category.module.css';

const Category = ({ category }) => {

  const dispatch = useDispatch();
  let { categoryFilter, subcategoryFilter } = useSelector(state => state).categories;
  let loading = useSelector(state => state.products.loading);

  const setFilter = (category, subcategory) => {
    if (loading) return
    dispatch(setFilters(category, subcategory, categoryFilter))
    dispatch(setCurrentPage(1));
  };

  const items = category.subcategory.length && category.subcategory.map(subcategory => (
    <li key={subcategory} className={cn(classes.subcategory, {[classes.subcategoryActive]: subcategoryFilter === subcategory})}
     onClick={() => setFilter(category.category, subcategory)}>
      {subcategory}
    </li>
  ));

  return (
    <li>
      <p className={cn(classes.categoryTitle, {[classes.categoryTitleActive]: categoryFilter === category.category})}
       onClick={() => setFilter(category.category)}>
        {category.category}
      </p>

      <ul className={cn(classes.subcategories, {[classes.subcategoriesActive]: (categoryFilter === category.category && items)})}>
        {items}
      </ul>
    </li>
  )
}

export default Category;