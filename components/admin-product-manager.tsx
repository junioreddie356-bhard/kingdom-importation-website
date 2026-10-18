"use client";

import { useMemo, useState } from "react";
import type { ProductRecord } from "@/lib/site-data";
import { productCategories } from "@/lib/catalog-config";

const emptyForm = {
  id: "",
  name: "",
  category: productCategories[0],
  description: "",
  priceRange: "",
  photoUrl: "",
  featured: "true",
};

export function AdminProductManager({ initialProducts }: { initialProducts: ProductRecord[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [catalogCategories, setCatalogCategories] = useState(productCategories);

  const categoryOptions = useMemo(() => catalogCategories, [catalogCategories]);

  function resetForm() {
    setForm({ ...emptyForm, category: catalogCategories[0] || productCategories[0] });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const method = form.id ? "PUT" : "POST";
    const response = await fetch("/api/admin/products", {
      method,
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
    setMessage(form.id ? "Product updated successfully." : "Product added successfully.");

    if (form.id) {
      setProducts((current) => current.map((item) => item.id === form.id ? payload.product : item));
    } else {
      setProducts((current) => [payload.product, ...current]);
    }

    resetForm();
  }

  async function handleDelete(productId: string) {
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: productId }),
    });

    const payload = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error || "We could not remove the product.");
      return;
    }

    setStatus("success");
    setMessage("Product removed successfully.");
    setProducts((current) => current.filter((item) => item.id !== productId));
    if (form.id === productId) resetForm();
  }

  function handleAddCategory() {
    const cleaned = customCategory.trim();
    if (!cleaned) return;

    if (catalogCategories.includes(cleaned)) {
      setCustomCategory("");
      return;
    }

    const nextCategories = [...catalogCategories, cleaned];
    setCatalogCategories(nextCategories);
    setCustomCategory("");
    if (!form.category) {
      setForm((current) => ({ ...current, category: cleaned }));
    }
  }

  return (
    <div className="admin-product-layout">
      <div className="admin-product-form-panel">
        <h2>Catalog controls</h2>
        <div className="catalog-control-row">
          <input
            value={customCategory}
            onChange={(event) => setCustomCategory(event.target.value)}
            placeholder="Add new category"
          />
          <button type="button" className="button secondary small-button" onClick={handleAddCategory}>
            Add category
          </button>
        </div>

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
            <span>Photo URL</span>
            <input value={form.photoUrl} onChange={(e) => setForm((current) => ({ ...current, photoUrl: e.target.value }))} placeholder="https://example.com/image.jpg" />
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
              {status === "loading" ? "Saving..." : form.id ? "Update Product" : "Add Product"}
            </button>
            {form.id ? (
              <button type="button" className="button secondary" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.priceRange}</td>
                    <td>{product.featured ? "Yes" : "No"}</td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="button secondary small-button" onClick={() => setForm({ id: product.id, name: product.name, category: product.category, description: product.description, priceRange: product.priceRange, photoUrl: product.photoUrl || "", featured: String(Boolean(product.featured)) })}>
                          Edit
                        </button>
                        <button type="button" className="button secondary small-button danger-button" onClick={() => handleDelete(product.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
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
