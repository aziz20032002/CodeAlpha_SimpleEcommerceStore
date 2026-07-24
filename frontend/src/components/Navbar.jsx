import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  } catch {
    return 0;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const [cartCount, setCartCount] = useState(getCartCount);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const refreshCart = () => setCartCount(getCartCount());
    window.addEventListener("storage", refreshCart);
    window.addEventListener("cart-updated", refreshCart);
    return () => {
      window.removeEventListener("storage", refreshCart);
      window.removeEventListener("cart-updated", refreshCart);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const navClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">CA</span>
          <span>CodeAlpha <strong>Store</strong></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
        <div className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          <NavLink className={navClass} to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink className={navClass} to="/products" onClick={closeMenu}>Products</NavLink>
          <NavLink className={navClass} to="/cart" onClick={closeMenu}>Cart <span className="cart-count" aria-label={`${cartCount} item${cartCount !== 1 ? "s" : ""} in cart`}>{cartCount}</span></NavLink>
          {isLoggedIn ? (
            <>
              <NavLink className={navClass} to="/orders" onClick={closeMenu}>My Orders</NavLink>
              <button type="button" className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div className="auth-nav">
              <NavLink className="login-link" to="/login" onClick={closeMenu}>Login</NavLink>
              <NavLink className="btn btn-nav-primary" to="/register" onClick={closeMenu}>Sign Up</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
