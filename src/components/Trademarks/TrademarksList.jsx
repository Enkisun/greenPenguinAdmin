import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrademarksTC } from '../../redux/trademarksReducer';
import Trademark from './Trademark';
import classes from './TrademarksList.module.css';

const TrademarksList = () => {

  const dispatch = useDispatch();
  let trademarks = useSelector(state => state.trademarks.trademarks);

  useEffect(() => {
    dispatch(getTrademarksTC());
  }, []);

  const items = trademarks && trademarks.map(trademark => (
    <Trademark key={trademark._id} trademark={trademark.trademark} />
  ));

  return (
    <div className={classes.container}>
      <h3 className={classes.trademarksListTitle}>Trademarks List</h3>
      <ul className={classes.trademarksList}>
        {items}
      </ul>
    </div>
  )
}

export default TrademarksList;