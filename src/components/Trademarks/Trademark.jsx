import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrademarkFilter, removeTrademarkFilter } from '../../redux/trademarksReducer';
import { setCurrentPage } from '../../redux/productsReducer';
import {ReactComponent as CheckIcon} from '../../assets/check.svg';
import cn from 'classnames';
import styles from './trademark.module.css';

const trademark = ({ trademark }) => {

  const dispatch = useDispatch();
  let { loading } = useSelector(state => state).products;
  let { trademarkFilter } = useSelector(state => state).trademarks;

  let isFilter = trademarkFilter.find(filter => filter === trademark);

  const setFilter = useCallback(() => {
    if (loading) return
    dispatch(setCurrentPage(1));
    isFilter ? dispatch(removeTrademarkFilter(trademark)) : dispatch(addTrademarkFilter(trademark));
  }, [loading]);

  return (
    <li className={cn(styles.trademark, {[styles.trademarkActive]: isFilter})} onClick={setFilter}>
      <CheckIcon className={cn(styles.check, {[styles.checkActive]: isFilter})} />
      <p className={styles.trademarkTitle}>{trademark}</p>
    </li>
  )
}

export default trademark;