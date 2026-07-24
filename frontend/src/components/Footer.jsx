import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about">
          <Link className="footer-brand" to="/"><span className="brand-mark">CA</span><span>CodeAlpha Store</span></Link>
          <p>Votre boutique tech moderne.</p>
        </div>
        <nav className="footer-column" aria-label="Navigation du pied de page">
          <h2>Navigation</h2>
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/cart">Panier</Link>
        </nav>
        <nav className="footer-column" aria-label="Liens du compte">
          <h2>Compte</h2>
          <Link to="/login">Connexion</Link>
          <Link to="/orders">Mes commandes</Link>
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
