import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from './Pagination';
import ProductCard from './ProductCard';

let PageSize = 8;

export default function PassengersList() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1;
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    //const firstPageIndex = (currentPage - 1) * PageSize;
    //const lastPageIndex = firstPageIndex + PageSize;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError('');
        const API_URL = import.meta.env.VITE_API_URL;
        //const res = await fetch(`${API_URL}?page=${currentPage}&size=${PageSize}`);
        /*const res = await fetch(
          `${API_URL}?limit=${PageSize}&skip=${currentPage}&select=title,price,category,description,thumbnail`,
        );*/
        const res = await fetch(`${API_URL}collection_listings.json`);

        if (!res.ok) throw new Error('Something went wrong with fetching data');

        const data = await res.json();

        setProductsData(data.collection_listings);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage]);

  /* const cat = Object.values(
    [...productsData.products].reduce(
      (acc, curr) => ((acc[curr.category] = acc[curr.category] || []).push(curr), acc),
      {},
    ),
  ); */
  if (!isLoading) {
    /* const categories = productsData.products.map((product) => product.category);

    const categoryList = categories.reduce(function (acc, curr) {
      if (!acc.includes(curr)) acc.push(curr);
      return acc;
    }, []);

    console.log(categoryList);*/
  }

  //productsData?.products.reduce((acc, curr) => ((acc[curr.category] = acc[curr.category] || []).push(curr), acc), {});

  //const filtered = productsData.products.reduce((acc, item) => acc.push({ id: item.id, state: item.state + 1 }), []);
  //console.log(filtered);

  return (
    <>
      <h2>Product List</h2>
      {!isLoading ? (
        <>
          <ul className="smol-css-grid" data-type="list">
            {productsData.map((product) => (
              <li key={product.collection_id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          {/*  <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={productsData.total}
            pageSize={PageSize}
          /> */}
        </>
      ) : (
        <div> Loading... </div>
      )}
    </>
  );
}
