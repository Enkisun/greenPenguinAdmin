import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrademarkFilter, removeTrademarkFilter } from '../../redux/trademarksReducer';
import { setCurrentPage } from '../../redux/productsReducer';
import cn from 'classnames';
import classes from './trademark.module.css';
import {ReactComponent as CheckIcon} from '../../assets/check.svg';

const trademark = ({ trademark }) => {

  const [activeTrademark, setActiveTrademark] = useState(false);

  const dispatch = useDispatch();
  let loading = useSelector(state => state.products.loading);

  const setFilter = useCallback(() => {
    if (loading) return
    setActiveTrademark(!activeTrademark);
    dispatch(setCurrentPage(1));
    activeTrademark ? dispatch(removeTrademarkFilter(trademark)) : dispatch(addTrademarkFilter(trademark));
  }, [activeTrademark, loading]);

  return (
    <li className={cn(classes.trademark, {[classes.trademarkActive]: activeTrademark})} onClick={setFilter}>
      <CheckIcon className={cn(classes.check, {[classes.checkActive]: activeTrademark})} />
      <p className={classes.trademarkTitle}>{trademark}</p>
    </li>
  )
}

export default trademark;