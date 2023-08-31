import { Link } from 'react-router-dom';
//import PageNav from '../components/PageNav';
//import styles from './Homepage.module.css';
import { useGlobalContext } from '../contexts/productsContext';
import ProductCard from '../components/ProductCard';
export default function Homepage() {
  const { loading, collections } = useGlobalContext();

  console.log(loading);
  console.log(collections);

  return (
    <>
      {/* <PageNav /> */}
      <section>
        <h1>Proof of concept</h1>

        {!loading ? (
          <>
            <ul className="smol-css-grid" data-type="list">
              {collections.map((product) => (
                <li key={product.collection_id}>
                  <Link to={`/collection/${product.handle}`} className="cta">
                    <ProductCard product={product} />
                  </Link>
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

        <Link to="/login" className="cta">
          Start traking now
        </Link>
      </section>
    </>
  );
}
