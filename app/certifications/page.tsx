import { getCertifications } from "@/lib/site-data";

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="content-page">
      <div className="container narrow">
        <p className="eyebrow">Quality &amp; compliance</p>
        <h1>Proof of product standards, documentation and sourcing reliability.</h1>

        <div className="cards-grid cert-grid">
          {certifications.map((cert) => (
            <article key={cert.id} className="info-card">
              <h3>{cert.title}</h3>
              <p>{cert.description}</p>
              <a href={cert.fileUrl || "/request-quote"} className="inline-link">Request document</a>
            </article>
          ))}
        </div>

        <div className="section-block">
          <p className="eyebrow">Business registration</p>
          <ul className="plain-list">
            <li>Business Registration Certificate</li>
            <li>Tax Identification Number (TIN)</li>
            <li>Tax Clearance Certificate</li>
            <li>GHANEPS Registration</li>
          </ul>
        </div>

        <div className="section-block">
          <p className="eyebrow">Compliance support</p>
          <p>We assist clients with product documentation, customs support, conformity review and donor-ready paperwork for compliance-sensitive imports.</p>
        </div>

        <div className="cta-box center">
          <a href="/request-quote" className="button primary">Request Our Full Certification Pack</a>
        </div>
      </div>
    </div>
  );
}
