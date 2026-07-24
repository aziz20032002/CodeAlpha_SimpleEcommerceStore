import { useEffect, useState } from "react";
import api from "../services/api";
import { getEnglishMessage } from "../services/messages";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be signed in to view your orders.");
          setLoading(false);
          return;
        }

        const response = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (err) {
        setError(
          getEnglishMessage(err.response?.data?.message, "Unable to load your orders.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="app-shell"><section className="page-section loading-state"><span className="loader" /><p>Loading orders…</p></section></div>;
  }

  if (error) {
    return <div className="app-shell"><section className="page-section"><p className="form-message error-message">{error}</p></section></div>;
  }

  return (
    <div className="app-shell">
      <section className="page-section">
        <h1>My Orders</h1>
        <p className="page-intro">View your order history and track your order status.</p>

        {orders.length === 0 ? (
          <div className="empty-state">No orders found.</div>
        ) : (
          orders.map((order) => {
            const statusClass =
              order.status === "completed"
                ? "status-badge status-completed"
                : order.status === "cancelled"
                  ? "status-badge status-cancelled"
                  : "status-badge status-pending";
            const statusLabel =
              order.status === "completed"
                ? "Completed"
                : order.status === "cancelled"
                  ? "Cancelled"
                  : order.status === "pending"
                    ? "Pending"
                    : order.status;

            return (
              <div key={order.id} className="order-card">
                <div>
                  <h2>Order #{order.id}</h2>
                  <p>
                    <strong>Total Amount:</strong> {order.total_price} DT
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={statusClass}>{statusLabel}</span>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default Orders;
