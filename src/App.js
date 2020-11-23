import React from 'react';
import CategoriesList from './components/CategoriesList';
import TrademarksList from './components/TrademarksList';
import ProductsList from './components/ProductsList';
import classes from './app.module.css';

const App = () => {
  return (
    <div className={classes.container}>
      <div>
        <CategoriesList />
        <TrademarksList />
      </div>

      <ProductsList />
    </div>
  )
}

export default App;