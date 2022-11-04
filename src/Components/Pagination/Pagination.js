import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './Pagination.module.scss';

const Pagination = ({ setCurrentPage, currentPage, limitPosts }) => {
  const allPosts = useSelector((state) => state.posts.allPosts);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);

  if (!allPosts) return null;

  const allPageNumbers = Array(Math.ceil(allPosts.length / limitPosts))
    .fill()
    .map((_, i) => i + 1);
  const visibleButtons = allPageNumbers.slice(firstIndex, lastIndex);

  return (
    <div className={classes.pagination}>
      <button
        onClick={() => {
          setLastIndex(lastIndex - 5);
          setFirstIndex(firstIndex - 5);
          setCurrentPage(firstIndex - (limitPosts - 2));
        }}
        disabled={firstIndex <= 0 ? true : false}
      >
        {'<'}
      </button>
      {visibleButtons.map((number) => {
        return (
          <button
            className={currentPage === number ? classes.activeButton : ''}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        );
      })}
      <button
        onClick={() => {
          setLastIndex(lastIndex + 5);
          setFirstIndex(firstIndex + 5);
          setCurrentPage(firstIndex + limitPosts);
        }}
        disabled={lastIndex >= Math.ceil(allPosts.length / limitPosts) ? true : false}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
