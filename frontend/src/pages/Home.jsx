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
            <span className="eyebrow">2026 Tech Collection</span>
            <h1>Technology that makes everyday life easier.</h1>
            <p>Discover our selection of smartphones, computers, and tech accessories.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-large" to="/products">Explore Products <span aria-hidden="true">→</span></Link>
              <Link className="btn btn-hero-secondary btn-large" to="/cart">View Cart</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <img src={heroImage} alt="CodeAlpha technology product collection" />
            <div className="floating-card"><span className="floating-icon">✓</span><span><strong>Easy Shopping</strong><small>Fast and secure</small></span></div>
          </div>
        </div>
      </section>

      <section className="benefits-section" aria-label="Nos engagements">
        <div className="benefits-grid">
          <article className="benefit-card"><span className="benefit-icon">↗</span><div><h2>Fast Delivery</h2><p>Orders prepared efficiently.</p></div></article>
          <article className="benefit-card"><span className="benefit-icon">✓</span><div><h2>Secure Payment</h2><p>A simple and reliable checkout experience.</p></div></article>
          <article className="benefit-card"><span className="benefit-icon">★</span><div><h2>Quality Products</h2><p>A carefully curated selection.</p></div></article>
          <article className="benefit-card"><span className="benefit-icon">?</span><div><h2>Customer Support</h2><p>Our team is here to help.</p></div></article>
        </div>
      </section>

      {popularProducts.length > 0 && (
        <section className="popular-section">
          <div className="home-section-heading">
            <div><span className="eyebrow">Trending Now</span><h2>Popular Products</h2><p>Discover some of our most popular products.</p></div>
            <Link className="section-link" to="/products">View All Products <span aria-hidden="true">→</span></Link>
          </div>
          <div className="product-grid">{popularProducts.map((product) => <ProductCard key={product.id} product={product} priority />)}</div>
        </section>
      )}
    </main>
  );
}

export default Home;
