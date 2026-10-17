import Link from "next/link";
import { getProducts } from "@/lib/site-data";

export const revalidate = 0;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string | string[] }>;
}) {
  const params = (await searchParams) ?? {};
  const selectedCategory = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const products = await getProducts();
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <div className="content-page">
      <div className="container catalog-shell">
        <header className="catalog-header">
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

        <p className="lead-text catalog-intro">
          {selectedCategory
            ? `Showing only products under ${selectedCategory}.`
            : "Every item below is uploaded and managed from the admin panel. This keeps the public catalog accurate, current, and ready for institutional buyers."}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="cta-box">
            <p>{selectedCategory ? `No products are available under ${selectedCategory} yet.` : "No products have been uploaded yet."}</p>
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
