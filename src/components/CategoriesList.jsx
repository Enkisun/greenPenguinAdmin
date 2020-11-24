import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesTC } from '../redux/categoriesReducer';
import Category from './Category';
import classes from './CategoriesList.module.css';

const CategoriesList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesTC());
  }, []);

  let categories = useSelector(state => state.categories.categories);

  const items = categories && categories.map(category => (
    <Category key={category._id} category={category} />
  ));

  return (
    <div className={classes.container}>
      <h3 className={classes.categoriesListTitle}>Categories List</h3>
      <ul className={classes.categoriesList}>
        {items}
      </ul>
    </div>
  )
}

export default CategoriesList;