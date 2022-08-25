import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  onChangePage: (num: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={e => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
