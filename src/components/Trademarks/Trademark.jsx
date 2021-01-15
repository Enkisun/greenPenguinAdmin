import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrademarkFilter, removeTrademarkFilter } from '../../redux/categoriesReducer';
import { setCurrentPage } from '../../redux/productsReducer';
import {ReactComponent as CheckIcon} from '../../assets/check.svg';
import cn from 'classnames';
import styles from './trademark.module.css';

const trademark = ({ trademark }) => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.loading);
  const trademarkFilter = useSelector(state => state.categories.trademarkFilter);

  const isFilter = trademarkFilter.find(filter => filter === trademark);

  const setFilter = useCallback(() => {
    if (loading) return
    dispatch(setCurrentPage(1));
    isFilter ? dispatch(removeTrademarkFilter(trademark)) : dispatch(addTrademarkFilter(trademark));
  }, [loading]);

  return (
    <li>
      <button className={cn(styles.trademark, {[styles.trademarkActive]: isFilter})} onClick={setFilter}>
        <CheckIcon className={cn(styles.check, {[styles.checkActive]: isFilter})} />
        <p className={styles.trademarkTitle}>{trademark}</p>
      </button>
    </li>
  )
}

export default trademark;