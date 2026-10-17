"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/certifications", label: "Certifications" },
  { href: "/request-quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="Kingz and Amazing Import home">
            <img src="/logo.png" alt="KINGDOM AFRICA logo" className="brand-logo" />
            <span className="brand-copy">
              <strong>KINGDOM AFRICA</strong>
              <small>Import • Supply • Delivery</small>
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav id="main-navigation" className={`main-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/request-quote" className="button primary small-button quote-button">
            Get a Quote
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <img src="/logo.png" alt="KINGDOM AFRICA logo" className="footer-logo" />
              <h3>KINGDOM AFRICA</h3>
            </div>
            <p>Import and supply support for schools, clinics, NGOs and businesses across Northern Ghana.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/certifications">Certifications</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Phone: 055 188 9999</li>
              <li>WhatsApp: +233 55 188 9999</li>
              <li>Email: kingzamazingimport@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
