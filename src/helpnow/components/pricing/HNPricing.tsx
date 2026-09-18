import s1 from "@/assets/Services/s1.png";
import s2 from "@/assets/Services/s2.png";
import s3 from "@/assets/Services/s3.png";
import s4 from "@/assets/Services/s4.png";
import s5 from "@/assets/Services/s5.png";

const pricingItems = [
  { img: s1, title: "Dish Washing", price: "₹159", min: "Minimum 1 hour" },
  { img: s2, title: "Kitchen Cleaning", price: "₹149", min: "Minimum 2 hours" },
  { img: s3, title: "Fan Cleaning", price: "₹149", min: "Minimum 1 hour" },
  { img: s4, title: "Window Cleaning", price: "₹179", min: "Minimum 1 hour" },
  { img: s5, title: "Laundry & Ironing", price: "₹199", min: "Minimum 2 hours" },
];

export function HNPricing() {
  return (
    <>
      <style>{`
        .hn-pricing {
          font-family: 'Inter', sans-serif;
          padding: 64px 24px;
          background: #f9f9f9;
        }
        .hn-pricing-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .hn-pricing-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .hn-pricing-tag {
          font-size: 11px;
          font-weight: 700;
          color: #f5a623;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .hn-pricing-title {
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }
        .hn-pricing-subtitle {
          font-size: 14px;
          color: #888;
          margin-top: 8px;
        }
        .hn-pricing-grid {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hn-pricing-card {
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #f0f0f0;
          width: calc(20% - 16px);
          min-width: 180px;
          flex: 1;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .hn-pricing-card:hover {
          box-shadow: 0 10px 30px rgba(245,166,35,0.14);
          transform: translateY(-4px);
        }
        .hn-pricing-img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        .hn-pricing-body {
          padding: 14px;
        }
        .hn-pricing-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }
        .hn-pricing-amount {
          font-size: 18px;
          font-weight: 800;
          color: #f5a623;
          margin-bottom: 2px;
        }
        .hn-pricing-min {
          font-size: 11px;
          color: #aaa;
          margin-bottom: 12px;
        }
        .hn-pricing-btn {
          display: block;
          width: 100%;
          text-align: center;
          background: #fff7e6;
          color: #f5a623;
          font-size: 12px;
          font-weight: 700;
          padding: 8px;
          border-radius: 6px;
          text-decoration: none;
          border: 1px solid #f5a623;
          transition: background 0.2s, color 0.2s;
        }
        .hn-pricing-btn:hover {
          background: #f5a623;
          color: #fff;
        }
        @media (max-width: 768px) {
          .hn-pricing-card { width: calc(50% - 16px); }
          .hn-pricing { padding: 48px 16px; }
        }
        @media (max-width: 480px) {
          .hn-pricing-card { width: 100%; }
        }
      `}</style>

      <section className="hn-pricing" id="pricing">
        <div className="hn-pricing-inner">
          <div className="hn-pricing-header">
            <div className="hn-pricing-tag">Fair Pricing</div>
            <h2 className="hn-pricing-title">Hourly Services, Honest Pricing</h2>
            <p className="hn-pricing-subtitle">No hidden costs — pay only for what you book.</p>
          </div>
          <div className="hn-pricing-grid">
            {pricingItems.map((p) => (
              <div key={p.title} className="hn-pricing-card">
                <img src={p.img} alt={p.title} className="hn-pricing-img" />
                <div className="hn-pricing-body">
                  <div className="hn-pricing-name">{p.title}</div>
                  <div className="hn-pricing-amount">{p.price}</div>
                  <div className="hn-pricing-min">{p.min}</div>
                  <a href="#booking" className="hn-pricing-btn">Book Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
