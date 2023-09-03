import { NavLink } from 'react-router-dom';

export default function ProductCard({ image, product, type }) {
  const linkTo = type === 'collection' ? `/${type}/${product.handle}` : `./products/${product.handle}/${product.id}`;

  return (
    <article className="smol-card-component product-card">
      <figure className="img-wrapper">
        <img src={image.src} className="img-inner" alt="" />
      </figure>
      <h3>{product.title}</h3>
      {product.vendor && <p>by {product.vendor}</p>}
      {product.tags && <p className="product -type">{product.tags}</p>}

      {product.product_type && <div className="product-type">{product.product_type}</div>}

      <NavLink to={linkTo} className="product-cta">
        <span className="screen-reader-only">See product{type === 'collection' ? 's' : ''}</span>
      </NavLink>
    </article>
  );
}
