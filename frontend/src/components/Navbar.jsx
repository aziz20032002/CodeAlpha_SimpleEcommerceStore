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
      <nav className="navbar" aria-label="Navigation principale">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <span className="brand-mark">CA</span>
          <span>CodeAlpha <strong>Store</strong></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
        <div className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          <NavLink className={navClass} to="/" onClick={closeMenu}>Accueil</NavLink>
          <NavLink className={navClass} to="/products" onClick={closeMenu}>Produits</NavLink>
          <NavLink className={navClass} to="/cart" onClick={closeMenu}>Panier <span className="cart-count" aria-label={`${cartCount} article${cartCount !== 1 ? "s" : ""} dans le panier`}>{cartCount}</span></NavLink>
          {isLoggedIn ? (
            <>
              <NavLink className={navClass} to="/orders" onClick={closeMenu}>Mes commandes</NavLink>
              <button type="button" className="btn btn-logout" onClick={handleLogout}>Déconnexion</button>
            </>
          ) : (
            <div className="auth-nav">
              <NavLink className="login-link" to="/login" onClick={closeMenu}>Connexion</NavLink>
              <NavLink className="btn btn-nav-primary" to="/register" onClick={closeMenu}>Inscription</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
