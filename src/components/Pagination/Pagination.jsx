import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import s from './pagination.module.scss';

export const Pagination = ({onChangePage}) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    return (
        <>
          {/* <Items currentItems={currentItems} /> */}
          <ReactPaginate className={s.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={e => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </>
      );
}
