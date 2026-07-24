import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch {
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    return query
      ? products.filter((product) => product.name.toLocaleLowerCase("fr").includes(query))
      : products;
  }, [products, search]);

  if (loading) {
    return <div className="app-shell"><section className="page-section loading-state"><span className="loader" /><p>Chargement des produits…</p></section></div>;
  }

  if (error) {
    return <div className="app-shell"><section className="page-section"><p className="form-message error-message">{error}</p></section></div>;
  }

  return (
    <main className="app-shell">
      <section className="catalog-heading">
        <span className="eyebrow">Notre catalogue</span>
        <h1>Découvrez nos produits</h1>
        <p>Une sélection de produits technologiques pour tous vos besoins.</p>
      </section>

      <section className="page-section">
        <div className="catalog-toolbar">
          <label className="search-field">
            <span className="sr-only">Rechercher un produit</span>
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="Rechercher un produit…" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <span className="results-count">{filteredProducts.length} produit{filteredProducts.length !== 1 ? "s" : ""}</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">⌕</span>
            <h2>{products.length === 0 ? "Aucun produit disponible" : "Aucun résultat"}</h2>
            <p>{products.length === 0 ? "Notre catalogue sera bientôt disponible." : "Essayez un autre nom de produit."}</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} priority={index < 8} />)}
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
