import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/categoriesReducer'
import Category from './Category'
import styles from './categoriesList.module.css'

const CategoriesList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector(state => state.categories.categoriesData);

  return (
    <div className={styles.container}>
      <h3 className={styles.categoriesListTitle}>Categories List</h3>
      <ul className={styles.categoriesList}>
        { categories?.map(category => <Category key={category._id} category={category} />) }
      </ul>
    </div>
  )
}

export default CategoriesList;