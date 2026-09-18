import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

export function HNNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Dish Washing", href: "/help-now/dish-washing" },
    { label: "Kitchen Cleaning", href: "/help-now#services" },
    { label: "Fan Cleaning", href: "/help-now#services" },
    { label: "Window Cleaning", href: "/help-now#services" },
    { label: "Laundry", href: "/help-now#services" },
  ];


  return (
    <>
      <style>{`
        .hn-navbar {
          font-family: 'Roboto', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: ${scrolled ? "rgba(12, 12, 12, 0.95)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
          border-bottom: ${scrolled ? "1px solid rgba(245, 166, 35, 0.25)" : "1px solid rgba(255, 255, 255, 0.12)"};
          box-shadow: ${scrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none"};
          transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.4s, border-bottom 0.4s, box-shadow 0.4s;
        }
        .hn-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 20px;
        }
        .hn-nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .hn-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
          filter: ${scrolled ? "none" : "brightness(0) invert(1)"};
          transition: filter 0.35s ease;
        }
        .hn-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .hn-nav-link-wrap {
          position: relative;
        }
        .hn-nav-link {
          font-family: 'Roboto', 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 600 !important;
          color: #ffffff !important;
          text-decoration: none;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 3px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
          border-radius: 6px;
          transition: color 0.3s;
          position: relative;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        }
        .hn-nav-link::after {
          content: '';
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: -1px;
          height: 2px;
          background: #f5a623;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .hn-nav-link:hover { color: #f5a623; }
        .hn-nav-link:hover::after { transform: scaleX(1); }
        .hn-nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        .hn-nav-phone {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #1a1a1a;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          padding: 6px 0;
          letter-spacing: -0.2px;
        }
        .hn-nav-phone:hover { color: #f5a623; }
        /* Uiverse Book Now button (mustard) */
        .hn-book-btn {
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          border: none;
          background: none;
          color: #1a1a1a;
          cursor: pointer;
          position: relative;
          padding: 6px;
          margin-bottom: 0;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 11.5px;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          letter-spacing: 0.08em;
          transition: all .15s ease;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }
        .hn-book-btn::before,
        .hn-book-btn::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          left: 0;
          height: calc(50% - 5px);
          border: 1px solid #f5a623;
          transition: all .15s ease;
        }
        .hn-book-btn::before {
          top: 0;
          border-bottom-width: 0;
        }
        .hn-book-btn::after {
          bottom: 0;
          border-top-width: 0;
        }
        .hn-book-btn:active::before,
        .hn-book-btn:active::after {
          right: 3px;
          left: 3px;
        }
        .hn-book-btn:active::before { top: 3px; }
        .hn-book-btn:active::after { bottom: 3px; }
        .hn-book-btn .hn-btn-lg {
          position: relative;
          display: block;
          padding: 8px 18px;
          color: #fff;
          background-color: #1a1a1a;
          overflow: hidden;
          box-shadow: inset 0px 0px 0px 1px transparent;
        }
        .hn-book-btn .hn-btn-lg::before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          background-color: #1a1a1a;
        }
        .hn-book-btn .hn-btn-lg::after {
          content: '';
          display: block;
          position: absolute;
          right: 0;
          bottom: 0;
          width: 4px;
          height: 4px;
          background-color: #1a1a1a;
          transition: all .2s ease;
        }
        .hn-book-btn .hn-btn-sl {
          display: block;
          position: absolute;
          top: 0;
          bottom: -1px;
          left: -8px;
          width: 0;
          background-color: #f5a623;
          transform: skew(-15deg);
          transition: all .2s ease;
        }
        .hn-book-btn .hn-btn-text {
          position: relative;
        }
        .hn-book-btn:hover { color: #1a1a1a; }
        .hn-book-btn:hover .hn-btn-sl { width: calc(100% + 15px); }
        .hn-book-btn:hover .hn-btn-text { color: #1a1a1a; }
        .hn-book-btn:hover .hn-btn-lg::after { background-color: #fff; }
        .hn-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: #1a1a1a;
        }
        @media (max-width: 1024px) {
          .hn-nav-links { display: none; }
          .hn-nav-phone { display: none; }
        }
        @media (max-width: 768px) {
          .hn-menu-btn { display: flex; }
        }
        /* Swinging pendant — reuses global .Btn from styles.css */
        @keyframes hn-swing {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        .hn-animate-swing {
          animation: hn-swing 1.8s ease-in-out infinite;
          transform-origin: top center;
        }
        /* Mobile Drawer */
        .hn-mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 300;
        }
        .hn-mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          background: #fff;
          z-index: 310;
          display: flex;
          flex-direction: column;
          padding: 0;
        }
        .hn-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
        }
        .hn-mobile-links {
          flex: 1;
          overflow-y: auto;
          padding: 8px 0;
        }
        .hn-mobile-link {
          display: block;
          padding: 14px 20px;
          font-family: 'Roboto', 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #ffffff;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: color 0.2s, background 0.2s;
        }
        .hn-mobile-link:hover { color: #f5a623; background: #fffaf0; }
        .hn-mobile-footer {
          padding: 16px 20px;
          border-top: 1px solid #f0f0f0;
        }
        .hn-mobile-book {
          display: block;
          width: 100%;
          background: linear-gradient(135deg, #f5a623, #e09500);
          color: #fff;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 13px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
        }
      `}</style>

      <nav className="hn-navbar">
        <div className="hn-nav-inner">
          {/* Brand — CityCalls logo */}
          <Link to="/help-now" className="hn-nav-brand">
            <img src="/logo.png" alt="CityCalls Logo" className="hn-logo-img" />
          </Link>

          {/* Desktop Nav Links — uppercase, semibold, Inter, tracking-wider (matches CityCalls) */}
          <ul className="hn-nav-links">
            {navLinks.map((l) => (
              <li key={l.label} className="hn-nav-link-wrap">
                {l.href.startsWith("/") && !l.href.includes("#") ? (
                  <Link to={l.href} className="hn-nav-link">{l.label}</Link>
                ) : (
                  <a href={l.href} className="hn-nav-link">{l.label}</a>
                )}
              </li>
            ))}
          </ul>
          {/* Right */}
          <div className="hn-nav-right">
            <button
              className="hn-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="hn-mobile-overlay" onClick={() => setMobileOpen(false)} />
          <div className="hn-mobile-drawer">
            <div className="hn-mobile-header">
              <Link to="/help-now" className="hn-nav-brand" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="CityCalls Logo" style={{ height: 32, width: "auto", objectFit: "contain" }} />
              </Link>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={22} />
              </button>
            </div>
            <div className="hn-mobile-links">
              {navLinks.map((l) => (
                l.href.startsWith("/") && !l.href.includes("#") ? (
                  <Link key={l.label} to={l.href} className="hn-mobile-link" onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.label} href={l.href} className="hn-mobile-link" onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </a>
                )
              ))}
              <Link to="/about" className="hn-mobile-link" onClick={() => setMobileOpen(false)}>About Us</Link>
              <Link to="/contact" className="hn-mobile-link" onClick={() => setMobileOpen(false)}>Contact</Link>
            </div>
            <div className="hn-mobile-footer">
              <a href="#booking" className="hn-mobile-book" onClick={() => setMobileOpen(false)}>
                📅 Book a Maid Now
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
