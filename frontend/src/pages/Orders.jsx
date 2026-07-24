import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Vous devez vous connecter pour voir vos commandes.");
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
          err.response?.data?.message ||
            "Impossible de charger vos commandes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="app-shell"><section className="page-section loading-state"><span className="loader" /><p>Chargement des commandes…</p></section></div>;
  }

  if (error) {
    return <div className="app-shell"><section className="page-section"><p className="form-message error-message">{error}</p></section></div>;
  }

  return (
    <div className="app-shell">
      <section className="page-section">
        <h1>Mes commandes</h1>
        <p className="page-intro">Consultez l’historique et le statut de vos commandes.</p>

        {orders.length === 0 ? (
          <div className="empty-state">Aucune commande trouvée.</div>
        ) : (
          orders.map((order) => {
            const statusClass =
              order.status === "completed"
                ? "status-badge status-completed"
                : order.status === "cancelled"
                  ? "status-badge status-cancelled"
                  : "status-badge status-pending";

            return (
              <div key={order.id} className="order-card">
                <div>
                  <h2>Commande #{order.id}</h2>
                  <p>
                    <strong>Total :</strong> {order.total_price} DT
                  </p>
                  <p>
                    <strong>Date :</strong> {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={statusClass}>{order.status}</span>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default Orders;
