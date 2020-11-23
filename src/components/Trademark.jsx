import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrademarkFilter, removeTrademarkFilter } from '../redux/trademarksReducer';
import { getProductsTC } from '../redux/productsReducer';
import cn from 'classnames';
import classes from './trademark.module.css';
import {ReactComponent as CheckIcon} from '../assets/check.svg';

const trademark = ({ trademark }) => {

  const [activeTrademark, setActiveTrademark] = useState(false);

  const dispatch = useDispatch();

  let currentPage = useSelector(state => state.products.currentPage);
  let limit = useSelector(state => state.products.limit);
  let categoryFilter = useSelector(state => state.categories.categoryFilter);
  let subCategoryFilter = useSelector(state => state.categories.subCategoryFilter);
  let trademarkFilter = useSelector(state => state.trademarks.trademarkFilter);

  useEffect(() => {
    if (!activeTrademark && !trademarkFilter.length) return
    
    if (!activeTrademark) return dispatch(removeTrademarkFilter(trademark.trademark));
    let ad = [...trademarkFilter, trademark.trademark]
    dispatch(getProductsTC(currentPage, limit, categoryFilter, subCategoryFilter, ad));
    dispatch(addTrademarkFilter(trademark.trademark));
  }, [activeTrademark]);

  return (
    <li className={cn(classes.trademark, {[classes.trademarkActive]: activeTrademark})} onClick={() => setActiveTrademark(!activeTrademark)}>
      <CheckIcon className={cn(classes.check, {[classes.checkActive]: activeTrademark})} />
      <p className={classes.trademarkTitle}>{trademark.trademark}</p>
    </li>
  )
}

export default trademark;