import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";

const CallFloat = () => {
  const [phoneNumber] = useState("919876543210");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes phonePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .call-float-btn {
          position: relative;
          z-index: 50;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(30, 58, 138, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: phonePulse 2s ease-in-out infinite;
        }

        .call-float-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 8px 24px rgba(30, 58, 138, 0.6);
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
        }

        .call-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: ringPulse 2s ease-out infinite;
        }

        .call-ring:nth-child(2) {
          animation-delay: 0.5s;
        }

        .call-ring:nth-child(3) {
          animation-delay: 1s;
        }

        .call-icon {
          color: white;
          animation: phonePulse 2s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .call-float-btn {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 640px) {
          .call-float-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      <a
        href={`tel:${phoneNumber}`}
        className="call-float-btn"
        aria-label="Call us"
      >
        <div className="call-ring"></div>
        <div className="call-ring"></div>
        <div className="call-ring"></div>
        <Phone className="call-icon" size={18} strokeWidth={2.5} />
        <span className="sr-only">Call Us</span>
      </a>
    </>
  );
};

const WhatsAppFloat = () => {
  const [phoneNumber] = useState("919876543210");
  const [mounted, setMounted] = useState(false);
  const [message] = useState("Hello! I would like to book a home service.");

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  if (!mounted) return null;

  return (
    <>
      {phoneNumber && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative block"
        >
          <div className="relative w-9 h-9 md:w-11 md:h-11 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
            <svg className="w-4 h-4 md:w-5 md:h-5 relative z-10" fill="white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="sr-only">Chat on WhatsApp</span>
            <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </a>
      )}
    </>
  );
};

export const FloatingActionButtons = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (customEvt.detail && typeof customEvt.detail.collapsed === "boolean") {
        setIsCollapsed(customEvt.detail.collapsed);
      }
    };
    window.addEventListener("social-sidebar-toggle", handleToggle);
    return () => window.removeEventListener("social-sidebar-toggle", handleToggle);
  }, []);

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      style={{
        transform: isCollapsed ? "translateY(40px) scale(0)" : "translateY(0) scale(1)",
        opacity: isCollapsed ? 0 : 1,
        pointerEvents: isCollapsed ? "none" : "auto",
      }}
    >
      <CallFloat />
      <WhatsAppFloat />
    </div>
  );
};
