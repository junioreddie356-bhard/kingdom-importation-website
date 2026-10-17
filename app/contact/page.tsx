import { QuoteForm } from "@/components/quote-form";

export default function ContactPage() {
  return (
    <div className="content-page">
      <div className="container narrow">
        <p className="eyebrow">Contact</p>
        <h1>Talk to our import and supply team.</h1>

        <div className="contact-layout">
          <div className="info-card contact-panel">
            <h3>Contact details</h3>
            <ul className="plain-list">
              <li><strong>Phone:</strong> 055 188 9999</li>
              <li><strong>WhatsApp:</strong> +233 55 188 9999</li>
              <li><strong>Email:</strong> kingzamazingimport@gmail.com</li>
              <li><strong>Location:</strong> BA288 Chinkara Street, Gumani, Tamale</li>
              <li><strong>Hours:</strong> Monday to Friday, 8am to 6pm</li>
            </ul>
          </div>

          <div className="info-card contact-panel accent-panel">
            <h3>Business support</h3>
            <ul className="plain-list">
              <li>Fast WhatsApp support for urgent quotations</li>
              <li>Email for procurement planning and specification review</li>
              <li>Direct calls for shipment updates and delivery coordination</li>
            </ul>
          </div>
        </div>

        <div className="map-block">
          <iframe
            title="Tamale location map"
            src="https://www.google.com/maps?q=Tamale%20Ghana&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <h2 className="contact-form-title">Send a message</h2>
        <QuoteForm />
      </div>
    </div>
  );
}
