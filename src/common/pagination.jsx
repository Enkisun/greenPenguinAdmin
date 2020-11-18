import React, { useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import classes from "./pagination.module.css";

const Pagination = ({ currentPage, pageSize, onPageChanged, portionSize = 3 }) => {
  
  let [portionNumber, setPortionNumber] = useState(1);

  let totalProductsCount = useSelector(state => state.products.totalProductsCount);

  let pagesCount = Math.ceil(totalProductsCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) { pages.push(i); }

  let portionCount = Math.ceil(pagesCount / portionSize);

  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  let portionItems = pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber);
  let lastPage = pages[pages.length - 1];

  if (totalProductsCount < pageSize) return <></>

  return (
    <div className={classes.paginationWrapper}>
      { portionNumber > 1 && (
        <>
          <button className={cn(`${classes.pageNumber}`, {[`${classes.selectedPage}`]: currentPage === 1})} onClick={() => onPageChanged(1)}>1</button>
          <button className={classes.move} onClick={() => setPortionNumber(portionNumber - 1)}>Previous</button>
        </>
      )}

      { (currentPage !== 1 && (leftPortionPageNumber - currentPage) >= 1) && (
        <>
          <button className={cn(`${classes.pageNumber}`, `${classes.selectedPage}`)}>{currentPage}</button>
          <span className={cn({[`${classes.activeDots}`]: (leftPortionPageNumber - currentPage) > 1})}>..</span>
        </>
      )}

      { portionItems.length >= 1 && portionItems.map(p => {
        return <button key={p} onClick={() => onPageChanged(p)} className={cn(`${classes.pageNumber}`, {[`${classes.selectedPage}`]: currentPage === p})}>{p}</button>
      })}

      { (currentPage !== lastPage && (currentPage - rightPortionPageNumber) >= 1) && (
        <>
          <span className={cn({[`${classes.activeDots}`]: (currentPage - rightPortionPageNumber) > 1})}>..</span>
          <button className={cn(`${classes.pageNumber}`, `${classes.selectedPage}`)}>{currentPage}</button>
        </>
      )}

      { portionCount > portionNumber && (
        <>
          { (lastPage - rightPortionPageNumber) > 1 && <button className={classes.move} onClick={() => setPortionNumber(portionNumber + 1)}>Next</button> }
          <button onClick={() => onPageChanged(lastPage)} className={cn(`${classes.pageNumber}`, {[`${classes.selectedPage}`]: currentPage === lastPage})}>{lastPage}</button>
        </>
      )}
    </div>
  )
}

export default Pagination;