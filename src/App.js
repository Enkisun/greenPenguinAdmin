import React from 'react';
import CategoriesList from './components/CategoriesList';
import ProductsList from './components/ProductsList';
import classes from './app.module.css';

const App = () => {
  return (
    <div className={classes.container}>
      <CategoriesList />
      <ProductsList />
    </div>
  )
}

export default App;