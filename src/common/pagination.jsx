import React, { useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 25px 50px auto;
  width: 80%;
  & button {
    border: none;
    margin: 0 5px;
    background-color: #3f4257;
    color: white;
    cursor: pointer;
    &.next, &.prev {
      padding: 0 5px;
      background-color: #ff5e3a;
    }
    &.pageNumber {
      width: 28px;
      height: 28px;
      &.selectedPage { background-color: #ff5e3a; }
    }
  }
  & span {
    display: none;
    &.activeDots {
      display: inline;
    }
  }
`;

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

  return (
    <PaginationWrapper>
      { portionNumber > 1 && (
        <>
          <button onClick={() => onPageChanged(1)} className={cn("pageNumber", {["selectedPage"]: currentPage === 1})}>1</button>
          <button className="prev" onClick={() => setPortionNumber(portionNumber - 1)}>Previous</button>
        </>
      )}

      { (currentPage !== 1 && (leftPortionPageNumber - currentPage) >= 1) && (
        <>
          <button className={cn("pageNumber", "selectedPage")}>{currentPage}</button>
          <span className={cn({["activeDots"]: (leftPortionPageNumber - currentPage) > 1})}>..</span>
        </>
      )}

      { portionItems.length >= 1 && portionItems.map(p => {
        return <button key={p} onClick={() => onPageChanged(p)} className={cn("pageNumber", {["selectedPage"]: currentPage === p})}>{p}</button>
      })}

      { (currentPage !== lastPage && (currentPage - rightPortionPageNumber) >= 1) && (
        <>
          <span className={cn({["activeDots"]: (currentPage - rightPortionPageNumber) > 1})}>..</span>
          <button className={cn("pageNumber", "selectedPage")}>{currentPage}</button>
        </>
      )}

      { portionCount > portionNumber && (
        <>
          { (lastPage - rightPortionPageNumber) > 1 && <button className="next" onClick={() => setPortionNumber(portionNumber + 1)}>Next</button> }
          <button onClick={() => onPageChanged(lastPage)} className={cn("pageNumber", {["selectedPage"]: currentPage === lastPage})}>{lastPage}</button>
        </>
      )}
    </PaginationWrapper>
  )
}

export default Pagination;