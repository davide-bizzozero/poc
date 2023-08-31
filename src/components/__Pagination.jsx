//api.instantwebtools.net/v1/passenger?currentPage=${currentPage}&size=5

export default function Pagination({ paginationAttributes, children }) {
  const { currentPage, maxPageLimit, minPageLimit, onPrevClick, onNextClick, onPageChange } = paginationAttributes;
  //const totalPages = props.response.totalPages - 1;
  //const data = props.response.data;

  console.log(currentPage);

  const totalPages = 10;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li key={page} id={page} onClick={handlePageClick} className={currentPage === page ? 'active' : null}>
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  // page ellipses
  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return (
    <div className="main">
      <div className="mainData">{children}</div>
      <ul className="pageNumbers">
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {pageDecremenEllipses}
        {pageNumbers}
        {pageIncrementEllipses}
        <li>
          <button onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}
