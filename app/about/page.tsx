export default function AboutPage() {
  return (
    <div className="content-page">
      <div className="container narrow">
        <p className="eyebrow">About Us</p>
        <h1>Built to simplify procurement and import execution for organisations in Northern Ghana.</h1>

        <div className="story-card">
          <p>
            KINGZ &amp; AMAZING IMPORT helps schools, clinics, NGOs, businesses and institutions source the goods they need from trusted Chinese suppliers and manage the import process with clarity and control.
          </p>
          <p>
            We are based in Tamale and built for organisations that need dependable support, transparent communication and practical delivery. From product sourcing and documentation to shipping coordination and door delivery, we manage the operational steps that often slow procurement down.
          </p>
          <p>
            Our work is centred on making import easier: fewer delays, clearer communication and better value without compromising quality or compliance.
          </p>
        </div>

        <div className="section-block">
          <p className="eyebrow">Our Mission</p>
          <h2>To remove procurement and logistics barriers by delivering dependable, transparent import support for organisations that need products delivered on time and without disruption.</h2>
        </div>

        <div className="stats-grid">
          <div className="stat-box"><strong>40–65%</strong><span>average savings</span></div>
          <div className="stat-box"><strong>Tamale</strong><span>door delivery</span></div>
          <div className="stat-box"><strong>CE / EMC / ISO</strong><span>quality standards</span></div>
          <div className="stat-box"><strong>Audit-ready</strong><span>documentation</span></div>
        </div>

        <div className="section-block">
          <p className="eyebrow">Our Locations</p>
          <ul className="plain-list">
            <li>Head Office: Tamale, Northern Region</li>
            <li>Operations Support: Accra and Tema</li>
            <li>Import focus: China to Ghana, with final delivery to Northern Ghana</li>
          </ul>
        </div>

        <div className="cta-box center">
          <a href="/request-quote" className="button primary">Work With Us — Request a Quote</a>
        </div>
      </div>
    </div>
  );
}
