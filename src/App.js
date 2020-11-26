import React from 'react';
import classes from './app.module.css';
import CategoriesList from './components/Categories/CategoriesList';
import ProductsList from './components/Products/ProductsList';
import TrademarksList from './components/Trademarks/TrademarksList';

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