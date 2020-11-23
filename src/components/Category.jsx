import React, { useCallback } from 'react';
import cn from 'classnames';
import classes from './category.module.css';
import Subcategory from './Subcategory';

const Category = ({ category, activeCategory, setActiveCategory, activeSubCategory, setActiveSubCategory }) => {

  const changeFlag = useCallback(() => {
    activeCategory === category._id ? setActiveCategory(null) : setActiveCategory(category._id);
  }, [activeCategory, category]);
  
  const items = category.subCategory.map(subcategory => (
    <Subcategory key={subcategory._id}
      category={category.category}
      subcategory={subcategory}
      activeSubCategory={activeSubCategory}
      setActiveSubCategory={setActiveSubCategory}
    />
  ));

  return (
    <li>
      <p className={cn(classes.categoryTitle, {[classes.categoryTitleActive]: activeCategory === category._id})} onClick={changeFlag}>
        {category.category}
      </p>

      <ul className={cn(classes.subCategories, {[classes.subCategoriesActive]: activeCategory === category._id})}>
        {items}
      </ul>
    </li>
  )
}

export default Category;