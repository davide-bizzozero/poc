import { useGlobalContext } from '../contexts/productsContext';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpinnerFullPage from '../components/SpinnerFullPage';

import Breadcrumbs from '../components/Breadcrumbs';

export default function ProductDetail() {
  const { isLoading, collections, getProductDetail, productDetail } = useGlobalContext();
  const { id } = useParams();

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const collection = collections.find((item) => item.handle === pathnames.at(1));

  useEffect(
    function () {
      getProductDetail(id);
    },
    [getProductDetail, id],
  );

  if (isLoading) return <SpinnerFullPage />;

  return (
    <>
      <nav aria-label="breadcrumbs" className="breadcrumbs">
        <ul role="list" className="breadcrumbs-items">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <span>
              &nbsp;&gt;<Link to={`/collection/${collection?.handle}`}>{collection?.title}</Link>
            </span>
          </li>
          <li aria-current="location">
            <span>&nbsp;&gt; {productDetail.title}</span>
          </li>
        </ul>
      </nav>

      <h2 className="text-center">
        {productDetail.title}

        <span className="product-vendor">{productDetail.vendor && <p>by {productDetail.vendor}</p>}</span>
      </h2>

      <article className="smol-css-grid">
        <img src={productDetail.image?.src} alt={productDetail.image?.alt || ''} />

        <div>
          <div dangerouslySetInnerHTML={{ __html: productDetail.body_html }} />
          <p>Tags: {productDetail.tags}</p>
          <p>Product type: {productDetail.product_type}</p>
        </div>
      </article>
    </>
  );
}
