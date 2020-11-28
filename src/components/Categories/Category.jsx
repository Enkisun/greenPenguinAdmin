import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/categoriesReducer';
import { setCurrentPage } from '../../redux/productsReducer';
import cn from 'classnames';
import classes from './category.module.css';

const Category = ({ category }) => {

  const dispatch = useDispatch();
  let categoryFilter = useSelector(state => state.categories.categoryFilter);
  let subCategoryFilter = useSelector(state => state.categories.subCategoryFilter);

  const setFilter = (category, subcategory) => {
    dispatch(setFilters(category, subcategory))
    dispatch(setCurrentPage(1));
  };

  const items = category.subCategory.length && category.subCategory.map(subcategory => (
    <li key={subcategory} className={cn(classes.subCategory, {[classes.subCategoryActive]: subCategoryFilter === subcategory})}
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

      <ul className={cn(classes.subCategories, {[classes.subCategoriesActive]: (categoryFilter === category.category && items)})}>
        {items}
      </ul>
    </li>
  )
}

export default Category;