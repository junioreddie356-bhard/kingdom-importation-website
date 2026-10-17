"use client";

import { useState } from "react";
import type { ProductRecord } from "@/lib/site-data";

const categoryOptions = [
  "Educational Materials",
  "Solar and Renewable Energy",
  "Medical Equipment",
  "WASH Supplies",
  "Agricultural Equipment",
  "Vehicles",
];

const emptyForm = {
  name: "",
  category: categoryOptions[0],
  description: "",
  priceRange: "",
  featured: "true",
};

export function AdminProductManager({ initialProducts }: { initialProducts: ProductRecord[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        featured: form.featured === "true",
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error || "We could not save the product.");
      return;
    }

    setStatus("success");
    setMessage("Product added successfully.");
    setProducts((current) => [payload.product, ...current]);
    setForm(emptyForm);
  }

  return (
    <div className="admin-product-layout">
      <div className="admin-product-form-panel">
        <h2>Add a product</h2>
        <form onSubmit={handleSubmit} className="admin-product-form">
          <label>
            <span>Product name</span>
            <input required value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} />
          </label>
          <label>
            <span>Category</span>
            <select required value={form.category} onChange={(e) => setForm((current) => ({ ...current, category: e.target.value }))}>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Price range</span>
            <input required value={form.priceRange} onChange={(e) => setForm((current) => ({ ...current, priceRange: e.target.value }))} />
          </label>
          <label>
            <span>Featured</span>
            <select value={form.featured} onChange={(e) => setForm((current) => ({ ...current, featured: e.target.value }))}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <label className="full-width">
            <span>Description</span>
            <textarea rows={4} required value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} />
          </label>

          <div className="quote-form-actions">
            <button type="submit" className="button primary" disabled={status === "loading"}>
              {status === "loading" ? "Saving..." : "Add Product"}
            </button>
          </div>

          {message ? <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p> : null}
        </form>
      </div>

      <div className="admin-product-list-panel">
        <h2>Product list</h2>
        {products.length ? (
          <div className="table-wrap compact-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Featured</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.priceRange}</td>
                    <td>{product.featured ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-state">No products yet. Add the first product above.</p>
        )}
      </div>
    </div>
  );
}
