import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrademarks } from '../../redux/trademarksReducer';
import Trademark from './Trademark';
import styles from './TrademarksList.module.css';

const TrademarksList = () => {

  const dispatch = useDispatch();
  const trademarks = useSelector(state => state.trademarks.trademarks);

  useEffect(() => {
    dispatch(getTrademarks());
  }, []);

  const items = trademarks && trademarks.map(trademark => (
    <Trademark key={trademark._id} trademark={trademark.trademark} />
  ));

  return (
    <div className={styles.container}>
      <h3 className={styles.trademarksListTitle}>Trademarks List</h3>
      <ul className={styles.trademarksList}>
        {items}
      </ul>
    </div>
  )
}

export default TrademarksList;