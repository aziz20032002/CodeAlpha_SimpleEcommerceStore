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
        setError("Unable to load products.");
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
    return <div className="app-shell"><section className="page-section loading-state"><span className="loader" /><p>Loading products…</p></section></div>;
  }

  if (error) {
    return <div className="app-shell"><section className="page-section"><p className="form-message error-message">{error}</p></section></div>;
  }

  return (
    <main className="app-shell">
      <section className="catalog-heading">
        <span className="eyebrow">Our Catalog</span>
        <h1>Explore Our Products</h1>
        <p>A selection of technology products for all your needs.</p>
      </section>

      <section className="page-section">
        <div className="catalog-toolbar">
          <label className="search-field">
            <span className="sr-only">Search products</span>
            <span aria-hidden="true">⌕</span>
            <input type="search" placeholder="Search products…" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <span className="results-count">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">⌕</span>
            <h2>{products.length === 0 ? "No products available" : "No results found"}</h2>
            <p>{products.length === 0 ? "Our catalog will be available soon." : "Try searching for another product name."}</p>
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
