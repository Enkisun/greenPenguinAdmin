import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTrademarkFilters } from '../../redux/categoriesReducer'
import Trademark from './Trademark'
import styles from './TrademarksList.module.css'

const TrademarksList = () => {

  const [trademarks, setTrademarks] = useState();

  const dispatch = useDispatch();
  const { categoryFilter, categoriesData } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(removeTrademarkFilters());

    if (categoryFilter) {
      categoriesData.map(item => {
        if (item.name === categoryFilter) {
          setTrademarks(item.trademarks)
        }
      })
    }
  }, [categoryFilter]);

  if (!categoryFilter) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.trademarksListTitle}>Trademarks List</h3>
      <ul className={styles.trademarksList}>
        { trademarks?.map(trademark => <Trademark key={trademark._id} trademark={trademark.name} />) }
      </ul>
    </div>
  )
}

export default TrademarksList;