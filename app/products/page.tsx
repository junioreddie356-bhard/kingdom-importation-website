import Link from "next/link";
import { getProducts } from "@/lib/site-data";

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[]; q?: string | string[] }>;
}) {
  const params = (await searchParams) ?? {};
  const selectedCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const searchQuery = rawQuery?.trim() ?? "";
  const normalizedQuery = searchQuery.toLowerCase();

  const products = await getProducts();
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  const categoryHref = selectedCategory
    ? `/products?category=${encodeURIComponent(selectedCategory)}`
    : "/products";

  const categoryCounts = products.reduce<Record<string, number>>((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="content-page">
      <div className="container catalog-shell">
        <header className="catalog-header catalog-header-large">
          <div>
            <p className="eyebrow">Product gallery</p>
            <h1>{selectedCategory ? `${selectedCategory} collection` : "Curated imports managed by the admin"}</h1>
          </div>
          <div className="catalog-summary">
            <span>{filteredProducts.length} live products</span>
            <span>Bulk sourcing</span>
            <span>Door delivery</span>
          </div>
        </header>

        <div className="catalog-hero-panel">
          <div>
            <p className="eyebrow">Trusted sourcing</p>
            <h2>Professional import catalog for institutions, clinics, schools and growing businesses.</h2>
          </div>
          <div className="catalog-stat-row">
            <div>
              <strong>{products.length}</strong>
              <span>Products</span>
            </div>
            <div>
              <strong>{Object.keys(categoryCounts).length}</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>Fast</strong>
              <span>Custom quotes</span>
            </div>
          </div>
        </div>

        <div className="product-search-wrap">
          <form action="/products" method="get" className="product-search-form">
            {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <input
              id="product-search"
              name="q"
              type="search"
              placeholder="Search for a product, category or item..."
              defaultValue={searchQuery}
            />
            <button type="submit" className="button primary small-button">
              Search
            </button>
            {searchQuery ? (
              <Link href={categoryHref} className="button secondary small-button">
                Clear
              </Link>
            ) : null}
          </form>
        </div>

        <div className="catalog-filter-row">
          {products.length ? (
            Object.entries(categoryCounts).map(([category, count]) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className={`catalog-chip ${selectedCategory === category ? "active" : ""}`}
              >
                {category} <span>({count})</span>
              </Link>
            ))
          ) : null}
        </div>

        <p className="lead-text catalog-intro">
          {selectedCategory
            ? `Showing only products under ${selectedCategory}.`
            : searchQuery
              ? `Showing results for “${searchQuery}”.`
              : "Every item below is uploaded and managed from the admin panel. This keeps the public catalog accurate, current, and ready for institutional buyers."}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="cta-box">
            <p>{selectedCategory ? `No products are available under ${selectedCategory} yet.` : searchQuery ? `No matching products were found for “${searchQuery}”.` : "No products have been uploaded yet."}</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="catalog-card">
                <div className="catalog-visual">
                  <img src={product.photoUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"} alt={product.name} />
                </div>
                <div className="catalog-body">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="catalog-meta">
                    <strong>{product.priceRange}</strong>
                    <Link href="/request-quote">Request quote</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="cta-box catalog-cta">
          <p>Need a custom import for your next order?</p>
          <Link href="/request-quote" className="button primary">Request a Free Quote</Link>
        </div>
      </div>
    </div>
  );
}
