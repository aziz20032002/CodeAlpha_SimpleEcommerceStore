import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/products");
    } catch (err) {
      setError(
        err.response?.data?.message || "Une erreur est survenue lors de la connexion."
      );
    }
  };

  return (
    <div className="app-shell">
      <section className="form-card">
        <div className="auth-mark">CA</div>
        <p className="eyebrow">Bienvenue</p>
        <h1>Bon retour !</h1>
        <p className="form-intro">Connectez-vous à votre compte CodeAlpha Store.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary btn-full" type="submit">
            Se connecter
          </button>
        </form>

        <p className="form-link">
          Pas encore de compte ? <Link to="/register">Créer un compte</Link>
        </p>
        {error ? <p className="form-message error-message">{error}</p> : null}
      </section>
    </div>
  );
}

export default Login;
