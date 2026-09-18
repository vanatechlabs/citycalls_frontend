import { Home, CalendarDays, MapPin, CreditCard, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Home, number: "01", title: "Choose Service", desc: "Select the service you need from our wide range of cleaning options." },
  { icon: CalendarDays, number: "02", title: "Select Date & Time", desc: "Pick your preferred date and convenient time slot for the service." },
  { icon: MapPin, number: "03", title: "Add Details", desc: "Enter your address and any additional details about your home." },
  { icon: CreditCard, number: "04", title: "Make Payment", desc: "Pay securely online via UPI, card, or net banking. Safe & easy." },
  { icon: CheckCircle2, number: "05", title: "Maid Arrives", desc: "Your verified maid arrives on time and clean. Guaranteed satisfaction." },
];

export function HNHowItWorks() {
  return (
    <>
      <style>{`
        .hn-hiw {
          font-family: 'Inter', sans-serif;
          padding: 64px 24px;
          background: #fffbf2;
          position: relative;
          overflow: hidden;
        }
        .hn-hiw-inner {
          max-width: 1280px;
          margin: 0 auto;
        }
        .hn-hiw-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .hn-hiw-tag {
          font-size: 11px;
          font-weight: 700;
          color: #f5a623;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .hn-hiw-title {
          font-size: clamp(24px, 3.5vw, 34px);
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }
        .hn-hiw-steps {
          display: flex;
          align-items: flex-start;
          gap: 0;
          position: relative;
        }
        .hn-hiw-steps::before {
          content: '';
          position: absolute;
          top: 32px;
          left: calc(10% + 32px);
          right: calc(10% + 32px);
          height: 2px;
          background: repeating-linear-gradient(
            90deg, #f5a623 0px, #f5a623 8px, transparent 8px, transparent 18px
          );
          z-index: 0;
        }
        .hn-hiw-step {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 12px;
          position: relative;
          z-index: 1;
        }
        .hn-hiw-num-wrap {
          width: 64px;
          height: 64px;
          background: #fff;
          border: 2.5px solid #f5a623;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 4px 16px rgba(245,166,35,0.18);
          position: relative;
        }
        .hn-hiw-step-num {
          position: absolute;
          top: -8px;
          right: -8px;
          width: 22px;
          height: 22px;
          background: #f5a623;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hn-hiw-step-title {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        .hn-hiw-step-desc {
          font-size: 12px;
          color: #888;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .hn-hiw-steps {
            flex-direction: column;
            align-items: center;
            gap: 28px;
          }
          .hn-hiw-steps::before { display: none; }
          .hn-hiw { padding: 48px 16px; }
        }
      `}</style>

      <section className="hn-hiw" id="how-it-works">
        <div className="hn-hiw-inner">
          <div className="hn-hiw-header">
            <div className="hn-hiw-tag">Your Guide</div>
            <h2 className="hn-hiw-title">Simple Steps to Book a Maid</h2>
          </div>
          <div className="hn-hiw-steps">
            {steps.map((s) => (
              <div key={s.number} className="hn-hiw-step">
                <div className="hn-hiw-num-wrap">
                  <s.icon size={26} style={{ color: "#f5a623" }} />
                  <span className="hn-hiw-step-num">{s.number}</span>
                </div>
                <div className="hn-hiw-step-title">{s.title}</div>
                <div className="hn-hiw-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
