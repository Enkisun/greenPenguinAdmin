import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrademarkFilter, removeTrademarkFilter } from '../../redux/trademarksReducer';
import cn from 'classnames';
import classes from './trademark.module.css';
import {ReactComponent as CheckIcon} from '../../assets/check.svg';

const trademark = ({ trademark }) => {

  const [activeTrademark, setActiveTrademark] = useState(false);

  const dispatch = useDispatch();

  const changeFlag = useCallback(() => {
    setActiveTrademark(!activeTrademark);
    activeTrademark ? dispatch(removeTrademarkFilter(trademark)) : dispatch(addTrademarkFilter(trademark));
  }, [activeTrademark]);

  return (
    <li className={cn(classes.trademark, {[classes.trademarkActive]: activeTrademark})} onClick={changeFlag}>
      <CheckIcon className={cn(classes.check, {[classes.checkActive]: activeTrademark})} />
      <p className={classes.trademarkTitle}>{trademark}</p>
    </li>
  )
}

export default trademark;