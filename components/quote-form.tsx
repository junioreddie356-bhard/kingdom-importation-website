"use client";

import { FormEvent, useState } from "react";

const initialState = {
  fullName: "",
  organisation: "",
  email: "",
  phone: "",
  clientType: "Business",
  productNeeded: "",
  quantity: "",
  deliveryLocation: "",
  additionalDetails: "",
};

export function QuoteForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const payload = await response.json();

    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error || "We could not submit your request. Please try again.");
      return;
    }

    setStatus("success");
    setMessage(payload.message || "Thank you. We have received your request and will respond within 24 hours.");
    setForm(initialState);
  }

  return (
    <div className="quote-form-card">
      <div className="form-intro">
        <strong>Request a procurement plan</strong>
        <span>Tell us what you need and we’ll recommend the best sourcing, shipment and delivery plan for your business.</span>
      </div>

      <form className="quote-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            <span>Full Name</span>
            <input required placeholder="Your full name" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} />
          </label>
          <label>
            <span>Organisation</span>
            <input required placeholder="School, clinic, NGO or business" value={form.organisation} onChange={(e) => handleChange("organisation", e.target.value)} />
          </label>
          <label>
            <span>Email</span>
            <input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
          </label>
          <label>
            <span>Phone / WhatsApp</span>
            <input required placeholder="+233 ..." value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </label>
          <label>
            <span>Client Type</span>
            <select value={form.clientType} onChange={(e) => handleChange("clientType", e.target.value)}>
              <option value="NGO">NGO</option>
              <option value="School">School</option>
              <option value="Clinic">Clinic</option>
              <option value="Business">Business</option>
              <option value="Individual">Individual</option>
            </select>
          </label>
          <label>
            <span>Product Needed</span>
            <input required placeholder="e.g. solar systems, school furniture" value={form.productNeeded} onChange={(e) => handleChange("productNeeded", e.target.value)} />
          </label>
          <label>
            <span>Quantity</span>
            <input placeholder="e.g. 50 units" value={form.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
          </label>
          <label>
            <span>Delivery Location</span>
            <input required placeholder="Tamale, Accra, Tema, etc." value={form.deliveryLocation} onChange={(e) => handleChange("deliveryLocation", e.target.value)} />
          </label>
        </div>

        <label className="full-width">
          <span>Additional Details</span>
          <textarea rows={5} placeholder="Tell us about your required specifications, budget range and timeline." value={form.additionalDetails} onChange={(e) => handleChange("additionalDetails", e.target.value)} />
        </label>

        <div className="quote-form-actions">
          <button type="submit" className="button primary" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Submit Request"}
          </button>
        </div>

        {message ? (
          <p className={`form-message ${status === "error" ? "error" : "success"}`}>
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
