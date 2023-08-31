import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useMatches } from 'react-router-dom';
import { useGlobalContext } from '../contexts/productsContext';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import SpinnerFullPage from '../components/SpinnerFullPage';

let PageSize = 6;

export default function Listingpage() {
  const { handle } = useParams();
  const [searchParams] = useSearchParams();
  const { loading, collections, products, totalProducts, fetchProducts } = useGlobalContext();
  const currentPage = searchParams.get('page') || 1;

  const startPage = (currentPage - 1) * PageSize;
  const endPage = startPage + PageSize;
  const collection = collections.find((item) => item.handle === handle);
  //const { collection, setCollection } = null;

  //const matches = useMatches();

  // console.log('matches', matches);
  useEffect(
    function () {
      //getCity(id);
      //if (collection.id) console.log(collection.id);
      if (!collection) return;
      fetchProducts(collection.collection_id, startPage, endPage);
    },
    [handle, collections, startPage, endPage],
  );

  return (
    <>
      {!loading ? (
        <>
          <SpinnerFullPage />
          <h2>{collection?.title}</h2>
          <ul className="smol-css-grid" data-type="list">
            {products.map((product) => (
              <li key={product.id}>
                {/* <Link to={`/listing/${product.handle}`} className="cta"> */}
                <article className="smol-card-component">
                  <img src={product.image.src} alt={product.image.alt || ''} />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>{product.product_type}</p>
                  <p>{product.tags}</p>
                  <p>{product.vendor}</p>
                </article>
                {/*  </Link> */}
              </li>
            ))}
          </ul>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalProducts}
            pageSize={PageSize}
          />
        </>
      ) : (
        <SpinnerFullPage />
      )}
    </>
  );
}
