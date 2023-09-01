import { useGlobalContext } from '../contexts/productsContext';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Pagination from '../components/Pagination';
import SpinnerFullPage from '../components/SpinnerFullPage';
import ProductList from '../components/ProductList';

const PageSize = 6;

export default function Listingpage() {
  const { isLoading, collections, currentCollecion, getProducts, products, totalProducts } = useGlobalContext();
  const { handle } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const startPage = (currentPage - 1) * PageSize;
  const endPage = startPage + PageSize;
  const collection = collections.find((item) => item.handle === handle);

  useEffect(
    function () {
      if (!collection) return;
      const collectionId = collection.collection_id;
      getProducts(collectionId, startPage, endPage);
    },
    [getProducts, startPage, endPage, handle, collection],
  );

  const [productsSorted, setProductSorted] = useState([]);
  /* 
  const sortAsc = () => {
    const sortAscending = productsFiltered.sort((a, b) => a.price - b.price);
    console.log(sortAscending);
    dispatch(sortProducts(sortAscending));
  };
  const sortDesc = () => {
    const sortDescending = productsFiltered.sort((a, b) => a.price - b.price).reverse();
    console.log(sortDescending);
    dispatch(sortProducts(sortDescending));
  }; */

  function onSelectionChange(e) {
    const sortDirection = e.target.value;
    /* const copyArray = [...users]; // create a new array & not mutate state

    copyArray.sort((a, b) => {
      return sortDirection === '0' ? a.id - b.id : b.id - a.id;
    });
    setUsers(copyArray); //re-render */
  }

  if (isLoading) return <SpinnerFullPage />;

  return (
    <>
      {console.log('productsSorted', productsSorted)}
      <nav aria-label="breadcrumbs" className="breadcrumbs">
        <ul role="list" className="breadcrumbs-items">
          <li>
            <a href="/">Home</a>
          </li>
          <li aria-current="location">
            <span>&nbsp;&gt; {currentCollecion.title}</span>
          </li>
        </ul>
      </nav>

      <h2 className="text-center">{currentCollecion.title}</h2>

      <select defaultValue={0} onChange={onSelectionChange}>
        <option value={0}>Ascending</option>
        <option value={1}>Descending</option>
      </select>

      <ProductList products={products} />

      <Pagination className="pagination-bar" currentPage={currentPage} totalCount={totalProducts} pageSize={PageSize} />
    </>
  );
}
