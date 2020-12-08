import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./pagination.module.css";

const Pagination = ({ currentPage, pageSize, onPageChanged, portionSize = 3 }) => {

  let totalProductsCount = useSelector(state => state.products.totalProductsCount);

  let pagesCount = Math.ceil(totalProductsCount / pageSize);
  let pages = [];    

  for (let i = 1; i <= pagesCount; i++) { pages.push(i); }

  let lastPage = pages[pages.length - 1];

  let leftPortionPageNumber = currentPage - Math.ceil(portionSize / 2 - 1);
  let rightPortionPageNumber = currentPage + Math.floor(portionSize / 2);

  if (currentPage === 1) rightPortionPageNumber = portionSize;
  if (currentPage === lastPage) leftPortionPageNumber = lastPage - portionSize + 1;

  let portionItems = pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber);

  let portionItem = portionItems.map(page => (
    <button key={page} className={cn(styles.pageNumber, {[styles.selectedPage]: currentPage === page})} onClick={() => onPageChanged(page)}>
      {page}
    </button>
  ));

  if (totalProductsCount <= pageSize) return <></>

  return (
    <div className={styles.paginationWrapper}>
      <button className={cn(styles.extremePages, {[styles.extreme]: currentPage > 1 })} onClick={() => onPageChanged(currentPage - 1)}>&lt; Назад</button>
      <button className={cn(styles.extremePages, {[styles.pageNumber]: (leftPortionPageNumber - 1) >= 1})} onClick={() => onPageChanged(1)}>1</button>
      <span className={cn(styles.extremePages, {[styles.activeDots]: (leftPortionPageNumber - 1) > 1})}>..</span>

      {portionItem}

      <span className={cn(styles.extremePages, {[styles.activeDots]: (lastPage - rightPortionPageNumber) > 1})}>..</span>
      <button className={cn(styles.extremePages, {[styles.pageNumber]: (lastPage - rightPortionPageNumber) >= 1})} onClick={() => onPageChanged(lastPage)}>{lastPage}</button>
      <button className={cn(styles.extremePages, {[styles.extreme]: currentPage < lastPage })} onClick={() => onPageChanged(currentPage + 1)}>Вперед &gt;</button>
    </div>
  )
}

export default Pagination;