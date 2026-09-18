import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";

export function HNTopbar() {
  const marqueeItems = [
    "Verified & Background-Checked Maids",
    "Flexible Hourly Booking",
    "Safe & Secure Payments",
    "100% Satisfaction Guarantee",
    "On-Time Service Assured",
    "No Hidden Charges Ever",
  ];

  return (
    <div className="hn-topbar">
      <style>{`
        .hn-topbar {
          background: #1a1a1a;
          color: #fff;
          font-family: 'Roboto', 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          padding: 6px 0;
          position: relative;
          z-index: 200;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .hn-topbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .hn-top-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .hn-top-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ddd;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hn-top-link:hover { color: #f5a623; }
        .hn-top-link svg { color: #f5a623; }
        .hn-top-marquee {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hn-marquee-track {
          display: flex;
          width: max-content;
          animation: hn-marquee 28s linear infinite;
          align-items: center;
          gap: 0;
        }
        @keyframes hn-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hn-marquee-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #f5a623;
          font-weight: 600;
          font-size: 10.5px;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0 18px;
        }
        .hn-marquee-dot {
          color: #f5a623;
          font-size: 14px;
          line-height: 1;
        }
        .hn-top-right {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .hn-timing {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #ddd;
          font-weight: 500;
          white-space: nowrap;
        }
        .hn-login-btn {
          background: #f5a623;
          color: #000;
          padding: 4px 12px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .hn-login-btn:hover { background: #e09500; }
        @media (max-width: 768px) {
          .hn-top-right, .hn-top-marquee { display: none; }
          .hn-top-left { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="hn-topbar-inner">
        <div className="hn-top-left">
          <a href="tel:+919876543210" className="hn-top-link">
            <Phone size={12} />
            <span>+91 98765 43210</span>
          </a>
          <a href="mailto:hello@helpnow.in" className="hn-top-link" style={{ display: "flex" }}>
            <Mail size={12} />
            <span>hello@helpnow.in</span>
          </a>
        </div>

        <div className="hn-top-marquee">
          <div className="hn-marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="hn-marquee-item">
                <ShieldCheck size={11} style={{ color: "#f5a623" }} />
                <span>{item}</span>
                <span className="hn-marquee-dot">✦</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hn-top-right">
          <div className="hn-timing">
            <Clock size={11} style={{ color: "#f5a623" }} />
            <span>Mon–Sat: 9:00 AM – 8:00 PM</span>
          </div>
          <a href="#" className="hn-login-btn">Customer Login</a>
        </div>
      </div>
    </div>
  );
}
