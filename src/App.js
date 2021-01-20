import React from 'react'
import { useSelector } from 'react-redux'
import CategoriesList from './components/Categories/CategoriesList'
import TrademarksList from './components/Trademarks/TrademarksList'
import ProductsList from './components/Products/ProductsList'
import cn from 'classnames'
import styles from './app.module.css'

const App = () => {

  const modalWindow = useSelector(state => state.products.modalWindow);

  return (
    <div className={cn(styles.container, {[styles.inactive]: modalWindow})}>
      <div>
        <CategoriesList />
        <TrademarksList />
      </div>

      <ProductsList />
    </div>
  );
}

export default App;