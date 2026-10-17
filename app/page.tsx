import Link from "next/link";
import { getTestimonials } from "@/lib/site-data";

const productHighlights = [
  {
    name: "Exercise Books and Stationery",
    category: "Educational Materials",
    summary: "Quality classroom essentials for schools, learning centres and institutional buyers.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "School & Office Furniture",
    category: "Educational Materials",
    summary: "Durable classroom and office furniture designed for daily institutional use.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Solar Systems",
    category: "Solar and Renewable Energy",
    summary: "Reliable energy solutions for homes, schools, clinics and growing businesses.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Medical Equipment",
    category: "Medical Equipment",
    summary: "Essential clinical and healthcare supplies for effective service delivery.",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "WASH Supplies",
    category: "WASH Supplies",
    summary: "Practical hygiene and sanitation products that support healthier communities.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Agricultural Tools",
    category: "Agricultural Equipment",
    summary: "Field-ready tools and supplies that support productivity and resilience.",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Vehicles",
    category: "Vehicles",
    summary: "Reliable transport solutions for businesses, institutions and growing operations.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
];

const whatWeDo = [
  { icon: "🌍", title: "We Source", text: "Direct from verified Chinese factories" },
  { icon: "🚢", title: "We Ship", text: "Freight, customs and clearance handled" },
  { icon: "🚚", title: "We Deliver", text: "Straight to your door in Tamale" },
];

const whyChooseUs = [
  "Factory-direct pricing — 40 to 65% below local retail",
  "Tamale-based — we deliver to your door",
  "Certified components — CE, EMC and ISO",
  "Complete documentation for donor audits",
];

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <div className="page-shell">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="brand-row brand-row-hero">
              <img src="/logo.png" alt="KINGDOM AFRICA logo" className="brand-logo-small" />
              <span className="brand-name">KINGDOM AFRICA</span>
            </div>
            <p className="eyebrow">Import management for Northern Ghana</p>
            <h1>We Bring What You Need From China — Delivered to Your Door in Tamale</h1>
            <p className="hero-subtitle">Import management for schools, clinics, NGOs and businesses across Northern Ghana.</p>
            <div className="hero-actions">
              <Link href="/request-quote" className="button primary">Request a Free Quote</Link>
              <Link href="/products" className="button secondary">View Our Products</Link>
            </div>
            <div className="hero-badges" aria-label="Core strengths">
              <span>School supplies</span>
              <span>Medical equipment</span>
              <span>Solar &amp; tools</span>
            </div>
          </div>

          <div className="hero-visual" aria-label="Kingz and Amazing Import service overview" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="hero-panel">
              <span className="badge">Trusted sourcing</span>
              <div className="hero-panel-copy">
                <p className="hero-kicker">Source → Ship → Deliver</p>
                <h3>Everything you need, managed from China to Tamale.</h3>
              </div>
              <div className="visual-grid">
                <div className="metric"><strong>40–65%</strong><span>Below retail</span></div>
                <div className="metric"><strong>Tamale</strong><span>Door delivery</span></div>
                <div className="metric"><strong>CE</strong><span>ISO-ready</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container trust-strip">
          <div className="trust-stat"><strong>40–65%</strong><span>cost savings</span></div>
          <div className="trust-stat"><strong>100%</strong><span>import support</span></div>
          <div className="trust-stat"><strong>Tamale</strong><span>door delivery</span></div>
          <div className="trust-stat"><strong>24/7</strong><span>response support</span></div>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">What We Do</p>
            <h2>Simple, reliable import support from source to delivery</h2>
          </div>
          <div className="luxury-grid">
            {whatWeDo.map((item) => (
              <article key={item.title} className="feature-card luxury-card">
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Our Products</p>
            <h2>Everyday essentials built for schools, businesses and communities</h2>
          </div>

          <div className="product-grid">
            {productHighlights.map((product) => (
              <article key={product.name} className="product-card">
                <div className="product-visual">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-body">
                  <span className="product-category">Product category</span>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                  <div className="product-meta">
                    <strong>Bulk supply</strong>
                    <Link href={`/products?category=${encodeURIComponent(product.category)}`}>View products</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why Choose Us</p>
            <h2>Practical value, dependable delivery and audit-ready documentation</h2>
          </div>
          <div className="four-column-grid">
            {whyChooseUs.map((point) => (
              <div key={point} className="bullet-card">
                <strong>{point.split(" — ")[0]}</strong>
                <span>{point.includes(" — ") ? point.split(" — ")[1] : point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow">Ready to import?</p>
            <h2>Ready to import? Let&apos;s talk.</h2>
          </div>
          <div className="cta-actions">
            <Link href="/request-quote" className="button primary">Request a Free Quote</Link>
            <a href="https://wa.me/233551889999" target="_blank" rel="noreferrer" className="button secondary">Chat with us now</a>
          </div>
        </div>
      </section>

      <section className="section testimonials">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Client feedback</p>
            <h2>Organisations trust us for reliable delivery and responsive support</h2>
          </div>
          <div className="three-column-grid">
            {testimonials.map((item) => (
              <blockquote key={item.id} className="testimonial-card">
                <p>“{item.quote}”</p>
                <footer>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
