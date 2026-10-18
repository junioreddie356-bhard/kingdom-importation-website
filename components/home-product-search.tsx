"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProductRecord } from "@/lib/site-data";

export function HomeProductSearch({ products }: { products: ProductRecord[] }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
      const matchesQuery = !normalized || haystack.includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [products, query, selectedCategory]);

  const dropdownItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];

    return products
      .filter((product) => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        if (!matchesCategory) return false;
        const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        return haystack.includes(normalized);
      })
      .slice(0, 6);
  }, [products, query, selectedCategory]);

  return (
    <>
      <div className="homepage-search-category-wrap">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="search-results-bar">
        <div className="search-results-badge">{filteredProducts.length} results</div>
        <div className="search-input-wrap">
          <label htmlFor="homepage-product-search" className="sr-only">
            Search products
          </label>
          <input
            id="homepage-product-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, categories or essentials..."
            aria-label="Search products"
          />

          {query.trim() && dropdownItems.length > 0 ? (
            <div className="search-dropdown" role="listbox" aria-label="Product suggestions">
              {dropdownItems.map((product) => (
                <Link
                  key={product.id}
                  href={`/products?category=${encodeURIComponent(product.category)}&q=${encodeURIComponent(product.name)}`}
                  className="search-dropdown-item"
                  onClick={() => setQuery("")}
                >
                  <div className="search-dropdown-item-media">
                    <img
                      src={product.photoUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"}
                      alt={product.name}
                    />
                  </div>
                  <div className="search-dropdown-item-copy">
                    <strong>{product.name}</strong>
                    <small>{product.category}</small>
                  </div>
                  <span>{product.priceRange}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-visual">
                <img src={product.photoUrl || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"} alt={product.name} />
              </div>
              <div className="product-body">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <strong>{product.priceRange}</strong>
                  <Link href={`/products?category=${encodeURIComponent(product.category)}`}>View products</Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="search-empty-state">
            <h3>No products found</h3>
            <p>Try another keyword such as school supplies, solar, medical equipment or furniture.</p>
          </div>
        )}
      </div>
    </>
  );
}
