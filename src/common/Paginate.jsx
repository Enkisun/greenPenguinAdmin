import React from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import styles from './paginate.module.css'

const Paginate = ({ currentPage, pageSize, onPageChanged, portionSize = 3 }) => {

  const totalProductsCount = useSelector(state => state.products.totalProductsCount);

  const pagesCount = Math.ceil(totalProductsCount / pageSize);

  let pages = [];    

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i); 
  }

  let leftPortionPageNumber = currentPage - Math.ceil(portionSize / 2 - 1);
  let rightPortionPageNumber = currentPage + Math.floor(portionSize / 2);

  if (currentPage === 1) {
    rightPortionPageNumber = portionSize;
  }

  const lastPage = pages[pages.length - 1];

  if (currentPage === lastPage) {
    leftPortionPageNumber = lastPage - portionSize + 1;
  }

  const portionItems = pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber);

  if (totalProductsCount <= pageSize) return null;

  return (
    <div className={styles.paginationWrapper}>
      <button className={styles.extreme} onClick={() => onPageChanged(currentPage - 1)} disabled={currentPage === 1}>
        Предыдущая
      </button>

      { (leftPortionPageNumber - 1) >= 1 && (
        <button className={styles.pageNumber} onClick={() => onPageChanged(1)}>1</button>
      )}

      { (leftPortionPageNumber - 1) > 1 && <span className={styles.activeDots}>..</span> }

      { portionItems.map(page => (
        <button key={page} className={cn(styles.pageNumber, {[styles.selectedPage]: currentPage === page})} onClick={() => onPageChanged(page)}>
          {page}
        </button>
      ))}

      { (lastPage - rightPortionPageNumber) > 1 && <span className={styles.activeDots}>..</span> }

      { (lastPage - rightPortionPageNumber) >= 1 && (
        <button className={styles.pageNumber} onClick={() => onPageChanged(lastPage)}>
          {lastPage}
        </button>
      )}

      <button className={styles.extreme} onClick={() => onPageChanged(currentPage + 1)} disabled={currentPage === lastPage}>
        Следующая
      </button>
    </div>
  )
}

export default Paginate;