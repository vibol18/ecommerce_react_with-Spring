function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{css}</style>

      <footer className="ft-footer">
        <div className="ft-inner">

          {/* ── Brand column ── */}
          <div className="ft-brand">
            <a href="/" className="ft-logo">
              <div className="ft-logo-mark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <span className="ft-logo-text">Shopify</span>
            </a>
            <p className="ft-tagline">Your one-stop shop for everything you love. Quality products, fast delivery.</p>

            {/* Social icons */}
            <div className="ft-socials">
              {/* Twitter / X */}
              <a href="#" aria-label="Twitter" className="ft-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="ft-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="ft-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="ft-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Shop column ── */}
          <div className="ft-col">
            <h4 className="ft-col-title">Shop</h4>
            <ul className="ft-col-list">
              {["New Arrivals", "Best Sellers", "Sale", "Collections", "Gift Cards"].map(item => (
                <li key={item}><a href="#" className="ft-col-link">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Company column ── */}
          <div className="ft-col">
            <h4 className="ft-col-title">Company</h4>
            <ul className="ft-col-list">
              {["About Us", "Careers", "Blog", "Press", "Affiliates"].map(item => (
                <li key={item}><a href="#" className="ft-col-link">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Support column ── */}
          <div className="ft-col">
            <h4 className="ft-col-title">Support</h4>
            <ul className="ft-col-list">
              {["Help Center", "Track Order", "Returns", "Shipping Info", "Contact Us"].map(item => (
                <li key={item}><a href="#" className="ft-col-link">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter column ── */}
          <div className="ft-col ft-newsletter-col">
            <h4 className="ft-col-title">Stay in the loop</h4>
            <p className="ft-newsletter-desc">Get exclusive deals and new arrivals delivered to your inbox.</p>
            <div className="ft-newsletter">
              <input
                type="email"
                placeholder="your@email.com"
                className="ft-newsletter-input"
              />
              <button className="ft-newsletter-btn" type="button">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Payment badges */}
            <div className="ft-payments">
              {["VISA", "MC", "AMEX", "PayPal"].map(p => (
                <span key={p} className="ft-payment-badge">{p}</span>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <p className="ft-copy">© {year} Shopify Inc. All rights reserved.</p>
            <div className="ft-legal">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                <span key={item} className="ft-legal-item">
                  {i > 0 && <span className="ft-dot">·</span>}
                  <a href="#" className="ft-legal-link">{item}</a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

const css = `
  .ft-footer {
    background: #111827;
    color: #d1d5db;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    margin-top: auto;
  }

  /* Main grid */
  .ft-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem 2rem;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr 1.5fr;
    gap: 2.5rem;
  }

  /* Brand */
  .ft-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; margin-bottom: 1rem; }
  .ft-logo-mark { width: 32px; height: 32px; background: #534AB7; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .ft-logo-text { font-size: 17px; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
  .ft-tagline { font-size: 13px; color: #9ca3af; line-height: 1.6; margin: 0 0 1.25rem; }

  /* Socials */
  .ft-socials { display: flex; gap: 8px; }
  .ft-social-btn { width: 34px; height: 34px; border: 1px solid #374151; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af; text-decoration: none; transition: border-color 0.15s, color 0.15s, background 0.15s; }
  .ft-social-btn:hover { border-color: #534AB7; color: #fff; background: #534AB7; }

  /* Columns */
  .ft-col-title { font-size: 13px; font-weight: 600; color: #fff; text-transform: uppercase; letter-spacing: 0.06em; margin: 0 0 1rem; }
  .ft-col-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
  .ft-col-link { font-size: 13.5px; color: #9ca3af; text-decoration: none; transition: color 0.15s; }
  .ft-col-link:hover { color: #fff; }

  /* Newsletter */
  .ft-newsletter-desc { font-size: 13px; color: #9ca3af; line-height: 1.5; margin: 0 0 0.875rem; }
  .ft-newsletter { display: flex; gap: 0; margin-bottom: 1rem; }
  .ft-newsletter-input { flex: 1; height: 36px; padding: 0 12px; font-size: 13px; border: 1px solid #374151; border-right: none; border-radius: 8px 0 0 8px; background: #1f2937; color: #f9fafb; outline: none; transition: border-color 0.15s; }
  .ft-newsletter-input::placeholder { color: #6b7280; }
  .ft-newsletter-input:focus { border-color: #534AB7; }
  .ft-newsletter-btn { width: 36px; height: 36px; background: #534AB7; border: none; border-radius: 0 8px 8px 0; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; transition: background 0.15s; }
  .ft-newsletter-btn:hover { background: #3C3489; }

  /* Payment badges */
  .ft-payments { display: flex; gap: 6px; flex-wrap: wrap; }
  .ft-payment-badge { font-size: 10px; font-weight: 700; color: #9ca3af; border: 1px solid #374151; border-radius: 4px; padding: 2px 6px; letter-spacing: 0.04em; }

  /* Bottom bar */
  .ft-bottom { border-top: 1px solid #1f2937; }
  .ft-bottom-inner { max-width: 1200px; margin: 0 auto; padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; }
  .ft-copy { font-size: 12.5px; color: #6b7280; margin: 0; }
  .ft-legal { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .ft-legal-item { display: flex; align-items: center; gap: 6px; }
  .ft-dot { color: #374151; font-size: 12px; }
  .ft-legal-link { font-size: 12.5px; color: #6b7280; text-decoration: none; transition: color 0.15s; }
  .ft-legal-link:hover { color: #fff; }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .ft-inner { grid-template-columns: 1fr 1fr 1fr; }
    .ft-brand { grid-column: 1 / -1; }
    .ft-newsletter-col { grid-column: 1 / -1; }
    .ft-newsletter { max-width: 360px; }
    .ft-tagline { max-width: 400px; }
  }

  @media (max-width: 600px) {
    .ft-inner { grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem 1.25rem 1.5rem; }
    .ft-brand { grid-column: 1 / -1; }
    .ft-newsletter-col { grid-column: 1 / -1; }
    .ft-newsletter { max-width: 100%; }
    .ft-bottom-inner { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  }
`;

export default Footer;