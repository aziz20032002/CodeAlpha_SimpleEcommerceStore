import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductImage from "../components/ProductImage";
import { getEnglishMessage } from "../services/messages";

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
      setMessage("You must be signed in to place an order.");
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
      setMessage(getEnglishMessage(response.data.message, "Order placed successfully"));
    } catch (error) {
      setMessage(
        getEnglishMessage(error.response?.data?.message, "Unable to place the order.")
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
        <h1>My Cart</h1>

        {message ? <p className={`form-message ${message.includes("successfully") ? "success-message" : "error-message"}`}>{message}</p> : null}

        {cart.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">⌑</span>
            <h2>Your cart is empty</h2>
            <p>Explore our catalog and find your next product.</p>
            <Link className="btn btn-primary" to="/products">
              Explore Products
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
                      <p>Unit Price: {price.toFixed(2)} DT</p>
                      <strong className="item-subtotal">{subtotal.toFixed(2)} DT</strong>
                    </div>

                    <div className="cart-actions">
                      <div className="quantity-control" aria-label={`Quantity of ${item.name}`}>
                        <button className="quantity-btn" aria-label="Decrease quantity" type="button" onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span className="quantity-value">{quantity}</span>
                        <button className="quantity-btn" aria-label="Increase quantity" type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button className="btn btn-danger" type="button" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>{total.toFixed(2)} DT</strong>
              </div>
              <div className="summary-row">
                <span>Total</span>
                <strong>{total.toFixed(2)} DT</strong>
              </div>
              <button className="btn btn-primary btn-full" type="button" onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? "Placing order..." : "Place Order"}
              </button>
              <Link className="btn btn-secondary btn-full" to="/products">
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
