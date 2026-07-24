import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { getEnglishMessage } from "../services/messages";

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
        getEnglishMessage(err.response?.data?.message, "An error occurred while signing in.")
      );
    }
  };

  return (
    <div className="app-shell">
      <section className="form-card">
        <div className="auth-mark">CA</div>
        <p className="eyebrow">Welcome</p>
        <h1>Welcome Back!</h1>
        <p className="form-intro">Sign in to your CodeAlpha Store account.</p>
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
            <label htmlFor="password">Password</label>
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
            Sign In
          </button>
        </form>

        <p className="form-link">
          Don&apos;t have an account? <Link to="/register">Create Account</Link>
        </p>
        {error ? <p className="form-message error-message">{error}</p> : null}
      </section>
    </div>
  );
}

export default Login;
