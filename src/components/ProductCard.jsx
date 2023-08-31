export default function ProductCard({ product }) {
  return (
    <article className="smol-card-component">
      <img src={product.default_product_image.src} alt="" />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </article>
  );
}
