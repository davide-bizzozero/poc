import classnames from 'classnames';
import { usePagination, DOTS } from '../customHook/usePagination';
import { useNavigate, Link } from 'react-router-dom';

import './pagination.scss';

export default function Pagination({ totalCount, siblingCount = 1, currentPage, pageSize, className }) {
  const paginationRange = usePagination({
    currentPage: Number(currentPage),
    totalCount,
    siblingCount,
    pageSize,
  });

  const pathname = window.location.pathname;

  if (Number(currentPage) === 0 || paginationRange.length < 2) {
    return null;
  }

  let lastPage = paginationRange[paginationRange.length - 1];
  /* 
  const navigate = useNavigate();

  const clickHandler = (event) => {
    event.preventDefault();

    const target = event.currentTarget.getAttribute('href');

    navigate(target);
  }; */

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className={classnames('pagination-container', { [className]: className })}>
        <li key="prev">
          {/* <a
            href={`/listing?page=${Number(currentPage) - 1}`}
            className={classnames('pagination-item', {
              disabled: Number(currentPage) === 1,
            })}
            onClick={clickHandler}
          >
            <span className="arrow left">
              <span className="sr-only">Next page</span>
            </span>
          </a> */}

          <Link
            to={`/?page=${Number(currentPage) - 1}`}
            className={classnames('pagination-item', {
              disabled: Number(currentPage) === 1,
            })}
          >
            <span className="arrow left">
              <span className="sr-only">Next page</span>
            </span>
          </Link>
        </li>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`${pageNumber}_${i}`} className="pagination-item dots">
                &#8230;
              </li>
            );
          }
          return (
            <li key={pageNumber}>
              {/*  <a
                href={`/listing?page=${pageNumber}`}
                className={classnames('pagination-item', {
                  selected: pageNumber === Number(currentPage),
                })}
                {...(pageNumber === Number(currentPage)
                  ? { 'aria-label': `page ${pageNumber}`, 'aria-current': 'page' }
                  : {})}
                onClick={clickHandler}
              >
                <span className="sr-only">page</span> {pageNumber}
              </a> */}

              <Link
                to={`.?page=${pageNumber}`}
                className={classnames('pagination-item', {
                  selected: pageNumber === Number(currentPage),
                })}
                {...(pageNumber === Number(currentPage)
                  ? { 'aria-label': `page ${pageNumber}`, 'aria-current': 'page' }
                  : {})}
              >
                <span className="sr-only">page</span> {pageNumber}
              </Link>
            </li>
          );
        })}
        <li key="next">
          {/* <a
            href={`/listing?page=${Number(currentPage) + 1}`}
            className={classnames('pagination-item', {
              disabled: Number(currentPage) === lastPage,
            })}
            onClick={clickHandler}
          >
            <span className="arrow right">
              <span className="sr-only">Next page</span>
            </span>
          </a> */}

          <Link
            to={`/?page=${Number(currentPage) + 1}`}
            className={classnames('pagination-item', {
              disabled: Number(currentPage) === lastPage,
            })}
          >
            <span className="arrow right">
              <span className="sr-only">Next page</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
