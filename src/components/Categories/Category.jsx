import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter, setSubcategoryFilter } from '../../redux/categoriesReducer';
import { setCurrentPage } from '../../redux/productsReducer';
import cn from 'classnames';
import styles from './category.module.css';

const Category = ({ category }) => {

  const dispatch = useDispatch();
  const { categoryFilter, subcategoryFilter } = useSelector(state => state.categories);
  const loading = useSelector(state => state.products.loading);

  const setFilter = (category, subcategory) => {
    if (!loading) {
      dispatch(setCategoryFilter(category));
      dispatch(setSubcategoryFilter(categoryFilter === category ? subcategory : ''));
      dispatch(setCurrentPage(1));
    }
  };

  return (
    <li>
      <button className={cn(styles.categoryTitle, {[styles.categoryTitleActive]: categoryFilter === category.category})}
       onClick={() => setFilter(category.category)}>
        {category.category}
      </button>

      <ul className={cn(styles.subcategories, {[styles.subcategoriesActive]: (category.subcategory.length > 0 && categoryFilter === category.category)})}>
        { category.subcategory?.map(subcategory => (
          <li key={subcategory}>
            <button className={cn(styles.subcategory, {[styles.subcategoryActive]: subcategoryFilter === subcategory})}
             onClick={() => setFilter(category.category, subcategory)}>
              {subcategory}
            </button>
          </li>
        ))}
      </ul>
    </li>
  )
}

export default Category;