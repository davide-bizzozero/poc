import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <ul className="smol-css-grid" data-type="list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard image={product.image} product={product} type="products" />
        </li>
      ))}
    </ul>
  );
}
