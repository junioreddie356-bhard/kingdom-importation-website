import { QuoteForm } from "@/components/quote-form";

export default function RequestQuotePage() {
  return (
    <div className="content-page">
      <div className="container quote-layout">
        <div className="quote-intro-panel">
          <p className="eyebrow">Request a quote</p>
          <h1>Tell us what you need, and we’ll help you import it with less stress.</h1>
          <p>
            Share your required product, quantity, delivery location and timeline. Our team will advise on sourcing, shipping and the most practical import route for your organisation.
          </p>

          <ul className="plain-list quote-list">
            <li>Product specifications and quantity requirements</li>
            <li>Delivery destination and project timing</li>
            <li>Compliance, clearance and documentation support</li>
          </ul>

          <div className="contact-options compact">
            <a href="https://wa.me/233551889999" className="button secondary" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="tel:+233551889999" className="button secondary">Call</a>
            <a href="mailto:kingzamazingimport@gmail.com" className="button secondary">Email</a>
          </div>
        </div>

        <div className="quote-form-wrap">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
