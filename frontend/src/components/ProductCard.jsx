import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

function ProductCard({ product, priority = false }) {
  const stock = Number(product.stock || 0);
  const stockLabel = stock === 0 ? "Rupture de stock" : stock <= 5 ? "Stock faible" : "En stock";
  const stockClass = stock === 0 ? "stock-out" : stock <= 5 ? "stock-low" : "stock-in";

  return (
    <article className="product-card">
      <div className="product-image">
        <ProductImage src={product.image_url} alt={product.name} productKey={product.id} priority={priority} />
      </div>
      <div className="product-content">
        <span className={`stock-badge ${stockClass}`}>{stockLabel}</span>
        <h2>{product.name}</h2>
        <p className="product-meta">{product.description}</p>
        <div className="product-footer">
          <strong>{Number(product.price).toFixed(2)} DT</strong>
          <Link className="btn btn-primary" to={`/products/${product.id}`}>
            Voir les détails <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
