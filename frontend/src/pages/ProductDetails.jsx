import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import ProductImage from "../components/ProductImage";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch {
        setError("Produit introuvable.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));

    alert("Produit ajouté au panier");
  };

  if (loading) {
    return <div className="app-shell"><section className="page-section"><p>Chargement du produit...</p></section></div>;
  }

  if (error) {
    return <div className="app-shell"><section className="page-section"><p>{error}</p></section></div>;
  }

  if (!product) {
    return <div className="app-shell"><section className="page-section"><p>Produit introuvable.</p></section></div>;
  }

  return (
    <div className="app-shell">
      <Link className="back-link" to="/products">← Retour aux produits</Link>
      <section className="detail-card">
        <div className="detail-image-wrap">
          <ProductImage src={product.image_url} alt={product.name} productKey={product.id} className="detail-image" placeholderClassName="detail-placeholder" priority />
        </div>

        <div className="detail-content">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="price-box">
            <span className="price-value">{Number(product.price).toFixed(2)} DT</span>
            <span className={`stock-badge ${Number(product.stock || 0) === 0 ? "stock-out" : Number(product.stock || 0) <= 5 ? "stock-low" : "stock-in"}`}>
              {Number(product.stock || 0) === 0 ? "Rupture de stock" : Number(product.stock || 0) <= 5 ? "Stock faible" : "Disponible en stock"}
            </span>
          </div>

          <div className="cart-actions">
            <button className="btn btn-primary btn-large" type="button" onClick={handleAddToCart} disabled={Number(product.stock || 0) === 0}>
              {Number(product.stock || 0) === 0 ? "Produit indisponible" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
