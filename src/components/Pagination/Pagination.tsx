import React from 'react';
import ReactPaginate from 'react-paginate';
import s from './pagination.module.scss';

type PaginationProps = {
  currentPage: number, 
  onChangePage: any
}

export const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
    return (
        <>
          <ReactPaginate className={s.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
          />
        </>
      );
}
