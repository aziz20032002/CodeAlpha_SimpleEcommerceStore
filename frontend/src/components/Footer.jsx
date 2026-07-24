import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link className="footer-brand" to="/"><span className="brand-mark">CA</span><span>CodeAlpha Store</span></Link>
          <p>Your modern tech store.</p>
        </div>
        <nav className="footer-column" aria-label="Footer navigation">
          <h2>Navigation</h2>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <nav className="footer-column" aria-label="Account links">
          <h2>Account</h2>
          <Link to="/login">Login</Link>
          <Link to="/orders">My Orders</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© 2026 CodeAlpha Store</span>
        <span>Full Stack Development Internship Project</span>
      </div>
    </footer>
  );
}

export default Footer;
