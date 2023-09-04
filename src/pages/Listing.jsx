import { useGlobalContext } from '../contexts/productsContext';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Pagination from '../components/Pagination';
import SpinnerFullPage from '../components/SpinnerFullPage';
import ProductList from '../components/ProductList';
import Breadcrumbs from '../components/Breadcrumbs';

const PageSize = 6;

export default function Listingpage() {
  const { isLoading, collections, currentCollecion, getProducts, products, totalProducts } = useGlobalContext();
  const { handle } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const startPage = (currentPage - 1) * PageSize;
  const endPage = startPage + PageSize;
  const collection = collections.find((item) => item.handle === handle);
  const [sort, setSort] = useState('desc');

  useEffect(
    function () {
      if (!collection) return;
      const collectionId = collection.collection_id;
      getProducts(collectionId, startPage, endPage, sort);
    },
    [getProducts, startPage, endPage, handle, collection, sort],
  );

  function onSelectionChange(e) {
    const sortDirection = e.target.value;
    setSort(sortDirection);
  }

  if (isLoading) return <SpinnerFullPage />;

  document.title = `POC - ${collection.title}`;

  return (
    <>
      <Breadcrumbs>
        <li aria-current="location">
          <span>&nbsp;&gt; {currentCollecion.title}</span>
        </li>
      </Breadcrumbs>
      <h2 className="text-center">{currentCollecion.title}</h2>
      <label htmlFor="orderBy">Order by:</label>
      <select id="orderBy" defaultValue={sort} onChange={onSelectionChange}>
        <option value="desc">A - z &#8595;</option>
        <option value="asc">Z - a &#8593;</option>
      </select>

      <ProductList products={products} />
      <Pagination className="pagination-bar" currentPage={currentPage} totalCount={totalProducts} pageSize={PageSize} />
    </>
  );
}
