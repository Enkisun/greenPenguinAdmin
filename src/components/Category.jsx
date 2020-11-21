import React, { useState } from 'react';
import cn from 'classnames';
import classes from './category.module.css';
import Subcategory from './Subcategory';

const Category = ({ category, subActive, setSubActive }) => {

  const [isCategoryActive, setCategoryActive] = useState(false);
  
  const items = category.subCategory.map(subcategory => (
    <Subcategory key={subcategory._id} subcategory={subcategory} subActive={subActive} setSubActive={setSubActive} />
  ));

  return (
    <li className={classes.category}>
      <p className={cn(classes.categoryTitle, {[classes.categoryTitleActive]: isCategoryActive})} onClick={() => setCategoryActive(!isCategoryActive)}>
        {category.category}
      </p>

      <ul className={classes.subCategories}>
        {items}
      </ul>
    </li>
  )
}

export default Category;