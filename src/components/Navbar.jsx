import { useState } from "react";
import { Link } from "react-router"; 
function Navbar() {
  const storedUser = JSON.parse(
  localStorage.getItem("username")
);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3); // wire to your cart state
  return (
    <>
      <style>{css}</style>

      <nav className="nb-nav">
        <div className="nb-inner">

          <a href="/" className="nb-logo">
            <div className="nb-logo-mark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="nb-logo-text">Bol Eccommerce</span>
          </a>
         

          {/* ── Search bar ── */}
          <div className="nb-search">
            <svg className="nb-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search products…" className="nb-search-input" />
          </div>

          {/* ── Desktop links ── */}
          <ul className="nb-links">
            {["Home", "Shop", "About", "Contact"].map(link => (
              <li key={link}>
                <a href={`/${link.toLowerCase()}`} className="nb-link">{link}</a>
              </li>
            ))}
          </ul>

          {/* ── Actions ── */}
          <div className="nb-actions">

            {/* Wishlist */}
            <button className="nb-icon-btn" aria-label="Wishlist">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            {/* Cart */}
            <button className="nb-icon-btn" aria-label="Cart">
              <Link to={"/cart"}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="nb-badge">{cartCount}</span>}
              </Link>
            </button>
            {/* Sign in (desktop) */}
             {storedUser && <span style={{ marginLeft: "8px", fontSize: "13px", color: "#6b7280" }}>Hello, {storedUser.username}</span>}
            <a href="/login" className="nb-signin">Sign in</a>

            {/* Hamburger (mobile) */}
            <button
              className="nb-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div className={`nb-mobile-menu${menuOpen ? " nb-mobile-open" : ""}`}>
          <div className="nb-search nb-mobile-search">
            <svg className="nb-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search products…" className="nb-search-input" />
          </div>

          {["Home", "Shop", "About", "Contact"].map(link => (
            <a key={link} href={`/${link.toLowerCase()}`} className="nb-mobile-link">{link}</a>
          ))}

          <a href="/login" className="nb-mobile-signin">Sign in</a>
        </div>
      </nav>
    </>
  );
}

const css = `
  .nb-nav {
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
  .nb-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.25rem;
    height: 60px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* Logo */
  .nb-logo { display: flex; align-items: center; gap: 8px; text-decoration: none; flex-shrink: 0; }
  .nb-logo-mark { width: 32px; height: 32px; background: #534AB7; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .nb-logo-text { font-size: 17px; font-weight: 700; color: #111827; letter-spacing: -0.3px; }

  /* Search */
  .nb-search { position: relative; display: flex; align-items: center; flex: 1; max-width: 380px; }
  .nb-search-icon { position: absolute; left: 10px; color: #9ca3af; pointer-events: none; }
  .nb-search-input { width: 100%; height: 36px; padding: 0 12px 0 32px; font-size: 13px; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb; color: #111827; outline: none; transition: border-color 0.15s, box-shadow 0.15s; box-sizing: border-box; }
  .nb-search-input:focus { border-color: #534AB7; box-shadow: 0 0 0 3px rgba(83,74,183,0.12); }

  /* Desktop links */
  .nb-links { display: flex; list-style: none; margin: 0; padding: 0; gap: 0.1rem; flex-shrink: 0; }
  .nb-link { font-size: 14px; font-weight: 500; color: #374151; text-decoration: none; padding: 6px 10px; border-radius: 6px; transition: color 0.15s, background 0.15s; white-space: nowrap; }
  .nb-link:hover { color: #534AB7; background: #f5f3ff; }

  /* Actions */
  .nb-actions { display: flex; align-items: center; gap: 0.5rem; margin-left: auto; flex-shrink: 0; }
  .nb-icon-btn { position: relative; width: 36px; height: 36px; background: none; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #374151; box-shadow: none; transition: border-color 0.15s, color 0.15s; }
  .nb-icon-btn:hover { border-color: #534AB7; color: #534AB7; }
  .nb-badge { position: absolute; top: -5px; right: -5px; background: #534AB7; color: #fff; font-size: 10px; font-weight: 700; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }
  .nb-signin { height: 36px; padding: 0 14px; background: #534AB7; color: #fff; border: none; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; display: flex; align-items: center; white-space: nowrap; transition: background 0.15s; }
  .nb-signin:hover { background: #3C3489; }

  /* Hamburger — desktop hidden */
  .nb-hamburger { display: none; width: 36px; height: 36px; background: none; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; align-items: center; justify-content: center; color: #374151; box-shadow: none; }

  /* Mobile menu */
  .nb-mobile-menu { display: none; flex-direction: column; gap: 2px; padding: 0.75rem 1.25rem 1rem; border-top: 1px solid #e5e7eb; background: #fff; }
  .nb-mobile-open { display: flex; }
  .nb-mobile-search { max-width: 100% !important; margin-bottom: 6px; }
  .nb-mobile-link { font-size: 15px; foimport { Link } from 'react-router-dom';
nt-weight: 500; color: #374151; text-decoration: none; padding: 10px 8px; border-radius: 8px; display: block; border-bottom: 1px solid #f3f4f6; transition: color 0.15s; }
  .nb-mobile-link:hover { color: #534AB7; }
  .nb-mobile-signin { margin-top: 10px; height: 40px; background: #534AB7; color: #fff; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .nb-mobile-signin:hover { background: #3C3489; }

  /* ── Responsive breakpoint ── */
  @media (max-width: 767px) {
    .nb-search { display: none; }
    .nb-links { display: none; }
    .nb-signin { display: none; }
    .nb-hamburger { display: flex; }
  }
`;

export default Navbar;