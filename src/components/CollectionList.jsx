import { useGlobalContext } from '../contexts/productsContext';
import SpinnerFullPage from './SpinnerFullPage';
import ProductCard from './ProductCard';

export default function CollectionList() {
  const { isLoading, collections } = useGlobalContext();

  if (isLoading) return <SpinnerFullPage />;

  return (
    <ul className="smol-css-grid" data-type="list">
      {collections.map((product) => (
        <li key={product.collection_id}>
          <ProductCard image={product.default_product_image} product={product} type="collection" />
        </li>
      ))}
    </ul>
  );
}
