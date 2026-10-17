export default function ServicesPage() {
  const services = [
    { title: "Product Sourcing", description: "We source directly from verified manufacturers and suppliers to match your specification, quality expectations and commercial requirements." },
    { title: "Quality Inspection", description: "We review products before shipment to confirm that they meet your required standards, specification and operational needs." },
    { title: "Freight and Shipping", description: "We coordinate sea and air freight from China to Ghana and keep you informed throughout the shipping process." },
    { title: "Customs Clearance", description: "We handle the import documentation and customs support needed to reduce delays and keep your shipment moving efficiently." },
    { title: "Inland Delivery", description: "We support last-mile delivery to Tamale and other key locations across Northern Ghana so your goods arrive ready for use." },
    { title: "Tax Exemption Support", description: "We help NGOs, schools and institutions with the import documentation and compliance support needed for donor-driven procurement." },
    { title: "Solar System Supply", description: "We provide complete solar packages for institutions and communities with practical, dependable and scalable energy solutions." },
    { title: "Vehicle Importation", description: "We manage end-to-end sourcing and import coordination for approved vehicle procurement and compliance requirements." },
  ];

  const industryFocus = [
    "Educational institutions",
    "Healthcare organisations",
    "NGOs and development partners",
    "Commercial and industrial clients",
    "Community infrastructure projects",
  ];

  const steps = [
    "Consult — We understand your need, quantity, destination and timing",
    "Source — We identify suitable suppliers and pricing options",
    "Approve — You review the quotation and confirmed specifications",
    "Order — We coordinate production, procurement and shipping schedules",
    "Clear — We manage customs procedures and documentation",
    "Deliver — Your order reaches your site ready for use",
  ];

  return (
    <div className="content-page">
      <div className="container narrow">
        <p className="eyebrow">Our core services</p>
        <h1>Practical import management built around reliable sourcing, smooth shipping and dependable delivery.</h1>
        <p className="lead-text">From supplier sourcing and commercial review to freight coordination and final delivery, we support organisations with a disciplined process designed to keep procurement moving and reduce operational disruption.</p>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="info-card service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <div className="section-block">
          <p className="eyebrow">Industries we support</p>
          <h2>Focused sourcing support for organisations that need dependable import execution.</h2>
          <div className="info-grid">
            {industryFocus.map((item) => (
              <div key={item} className="mini-badge">{item}</div>
            ))}
          </div>
        </div>

        <div className="section-block">
          <p className="eyebrow">How we work</p>
          <h2>Six clear steps to a more controlled import process</h2>
          <ol className="step-list">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="cta-box">
          <p>Need a dependable partner for your next shipment?</p>
          <a href="/request-quote" className="button primary">Start your import enquiry</a>
        </div>
      </div>
    </div>
  );
}
