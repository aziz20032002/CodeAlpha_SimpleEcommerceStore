import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await api.post("/auth/register", formData);

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Une erreur est survenue lors de l'inscription."
      );
    }
  };

  return (
    <div className="app-shell">
      <section className="form-card">
        <div className="auth-mark">CA</div>
        <p className="eyebrow">Bienvenue chez nous</p>
        <h1>Créer votre compte</h1>
        <p className="form-intro">Rejoignez CodeAlpha Store et commencez vos achats.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Mot de passe</label>
            <input
              id="register-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary btn-full" type="submit">
            Créer mon compte
          </button>
        </form>

        <p className="form-link">
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
        {message ? <p className="form-message success-message">{message}</p> : null}
        {error ? <p className="form-message error-message">{error}</p> : null}
      </section>
    </div>
  );
}

export default Register;
