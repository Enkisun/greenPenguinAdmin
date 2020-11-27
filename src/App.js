import React from 'react';
import CategoriesList from './components/Categories/CategoriesList';
import ProductsList from './components/Products/ProductsList';
import TrademarksList from './components/Trademarks/TrademarksList';
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