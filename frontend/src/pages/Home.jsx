import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import heroImage from "../assets/hero.png";
import ProductCard from "../components/ProductCard";

function Home() {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await api.get("/products");
        setPopularProducts(response.data.slice(0, 4));
      } catch {
        setPopularProducts([]);
      }
    };
    fetchPopularProducts();
  }, []);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-content">
            <span className="eyebrow">Collection Tech 2026</span>
            <h1>La technologie qui simplifie votre quotidien.</h1>
            <p>Découvrez notre sélection de smartphones, ordinateurs et accessoires tech.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-large" to="/products">Découvrir les produits <span aria-hidden="true">→</span></Link>
              <Link className="btn btn-hero-secondary btn-large" to="/cart">Voir mon panier</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <img src={heroImage} alt="Sélection de produits technologiques CodeAlpha" />
            <div className="floating-card"><span className="floating-icon">✓</span><span><strong>Achat facile</strong><small>Rapide et sécurisé</small></span></div>
          </div>
        </div>
      </section>

      <section className="benefits-section" aria-label="Nos engagements">
        <div className="benefits-grid">
          <article className="benefit-card"><span className="benefit-icon">↗</span><div><h2>Livraison rapide</h2><p>Commandes préparées efficacement.</p></div></article>
          <article className="benefit-card"><span className="benefit-icon">✓</span><div><h2>Paiement sécurisé</h2><p>Un parcours simple et fiable.</p></div></article>
          <article className="benefit-card"><span className="benefit-icon">★</span><div><h2>Produits de qualité</h2><p>Une sélection pensée pour vous.</p></div></article>
          <article className="benefit-card"><span className="benefit-icon">?</span><div><h2>Support client</h2><p>Une équipe à votre écoute.</p></div></article>
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section className="popular-section">
          <div className="home-section-heading">
            <div><span className="eyebrow">Sélection du moment</span><h2>Produits populaires</h2><p>Découvrez quelques incontournables de notre catalogue.</p></div>
            <Link className="section-link" to="/products">Voir tous les produits <span aria-hidden="true">→</span></Link>
          </div>
          <div className="product-grid">{popularProducts.map((product) => <ProductCard key={product.id} product={product} priority />)}</div>
        </section>
      )}
    </main>
  );
}

export default Home;
