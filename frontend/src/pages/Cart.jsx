import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductImage from "../components/ProductImage";

function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  }, [cart]);

  const updateQuantity = (id, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          const currentQuantity = Number(item.quantity);
          const stock = Number(item.stock);

          if (change > 0) {
            return currentQuantity >= stock
              ? item
              : { ...item, quantity: currentQuantity + 1 };
          }

          return currentQuantity <= 1
            ? item
            : { ...item, quantity: currentQuantity - 1 };
        })
        .filter((item) => Number(item.quantity) > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Vous devez vous connecter pour passer une commande.");
      return;
    }

    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    setIsLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        "/orders",
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart([]);
      localStorage.removeItem("cart");
      setMessage(response.data.message || "Commande créée avec succès");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Impossible de passer la commande."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="app-shell">
      <section className="page-section">
        <h1>Mon panier</h1>

        {message ? <p className={`form-message ${message.includes("succès") ? "success-message" : "error-message"}`}>{message}</p> : null}

        {cart.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">⌑</span>
            <h2>Votre panier est vide</h2>
            <p>Découvrez notre catalogue et trouvez votre prochain produit.</p>
            <Link className="btn btn-primary" to="/products">
              Découvrir les produits
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {cart.map((item) => {
                const price = Number(item.price);
                const quantity = Number(item.quantity);
                const subtotal = price * quantity;

                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <ProductImage src={item.image_url} alt={item.name} productKey={item.id} />
                    </div>
                    <div className="cart-item-info">
                      <h2>{item.name}</h2>
                      <p>Prix unitaire : {price.toFixed(2)} DT</p>
                      <strong className="item-subtotal">{subtotal.toFixed(2)} DT</strong>
                    </div>

                    <div className="cart-actions">
                      <div className="quantity-control" aria-label={`Quantité de ${item.name}`}>
                        <button className="quantity-btn" aria-label="Diminuer la quantité" type="button" onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span className="quantity-value">{quantity}</span>
                        <button className="quantity-btn" aria-label="Augmenter la quantité" type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button className="btn btn-danger" type="button" onClick={() => removeFromCart(item.id)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="cart-summary">
              <h3>Résumé de la commande</h3>
              <div className="summary-row">
                <span>Sous-total</span>
                <strong>{total.toFixed(2)} DT</strong>
              </div>
              <div className="summary-row">
                <span>Total</span>
                <strong>{total.toFixed(2)} DT</strong>
              </div>
              <button className="btn btn-primary btn-full" type="button" onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? "Commande en cours..." : "Passer la commande"}
              </button>
              <Link className="btn btn-secondary btn-full" to="/products">
                Continuer mes achats
              </Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
