import React from 'react';
import CategoriesList from './components/Categories/CategoriesList';
import TrademarksList from './components/Trademarks/TrademarksList';
import ProductsList from './components/Products/ProductsList';
import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <div>
        <CategoriesList />
        <TrademarksList />
      </div>

      <ProductsList />
    </div>
  );
}

export default App;