import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { getEnglishMessage } from "../services/messages";

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

      setMessage(getEnglishMessage(response.data.message, "Account created successfully"));

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(
        getEnglishMessage(err.response?.data?.message, "An error occurred while creating your account.")
      );
    }
  };

  return (
    <div className="app-shell">
      <section className="form-card">
        <div className="auth-mark">CA</div>
        <p className="eyebrow">Join Us</p>
        <h1>Create Your Account</h1>
        <p className="form-intro">Join CodeAlpha Store and start shopping.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="register-password">Password</label>
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
            Create Account
          </button>
        </form>

        <p className="form-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
        {message ? <p className="form-message success-message">{message}</p> : null}
        {error ? <p className="form-message error-message">{error}</p> : null}
      </section>
    </div>
  );
}

export default Register;
