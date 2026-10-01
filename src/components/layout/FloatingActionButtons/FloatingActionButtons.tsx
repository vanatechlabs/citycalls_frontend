"use client";

import React, { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import type { PublicSocialLinks } from "@/lib/api/socialLinks";

// Glossy glass buttons on a solid brand colour: `--from` / `--to` are the
// colour gradient, `--tint` ("r, g, b") drives the glow and rings.
const FLOAT_STYLES = `
  @keyframes floatPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes floatRing {
    0% { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(1.75); opacity: 0; }
  }

  .glass-float-btn {
    position: relative;
    z-index: 50;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.38);
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 55%),
      linear-gradient(145deg, var(--from), var(--to));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.55),
      inset 0 -2px 6px rgba(var(--tint), 0.35),
      0 10px 26px -8px rgba(var(--tint), 0.75),
      0 4px 12px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
    animation: floatPulse 2.4s ease-in-out infinite;
  }

  /* glossy top half */
  .glass-float-btn::before {
    content: "";
    position: absolute;
    inset: 1px 4px 50% 4px;
    border-radius: 9999px 9999px 40% 40%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  .glass-float-btn:hover {
    transform: scale(1.1) !important;
    animation-play-state: paused;
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.04) 55%),
      linear-gradient(145deg, var(--from), var(--to));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      0 0 0 5px rgba(var(--tint), 0.16),
      0 14px 32px -8px rgba(var(--tint), 0.9);
  }

  .glass-float-ring {
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    border: 1.5px solid rgba(var(--tint), 0.7);
    animation: floatRing 2.4s ease-out infinite;
    pointer-events: none;
  }
  .glass-float-ring:nth-of-type(2) { animation-delay: 0.8s; }
  .glass-float-ring:nth-of-type(3) { animation-delay: 1.6s; }

  .glass-float-icon {
    position: relative;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  @media (max-width: 1024px) {
    .glass-float-btn { width: 42px; height: 42px; }
  }
  @media (max-width: 640px) {
    .glass-float-btn { width: 38px; height: 38px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .glass-float-btn, .glass-float-ring { animation: none; }
  }
`;

const CallFloat = ({ phoneNumber }: { phoneNumber: string }) => (
  <a
    href={`tel:${phoneNumber}`}
    className="glass-float-btn"
    style={{ "--tint": "37, 99, 235", "--from": "#3b82f6", "--to": "#1e3a8a" } as React.CSSProperties}
    aria-label="Call us"
  >
    <span className="glass-float-ring" />
    <span className="glass-float-ring" />
    <span className="glass-float-ring" />
    <Phone className="glass-float-icon" size={18} strokeWidth={2.5} />
    <span className="sr-only">Call Us</span>
  </a>
);

const WhatsAppFloat = ({ phoneNumber, message }: { phoneNumber: string; message: string }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="glass-float-btn"
      style={{ "--tint": "37, 211, 102", "--from": "#3ee07f", "--to": "#128c4a" } as React.CSSProperties}
    >
      <span className="glass-float-ring" />
      <span className="glass-float-ring" />
      <svg className="glass-float-icon h-5 w-5" fill="white" viewBox="0 0 24 24" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
};

export const FloatingActionButtons = ({ links }: { links: PublicSocialLinks }) => {
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
      <style>{FLOAT_STYLES}</style>
      {/* A number left empty in admin hides its button. */}
      {links.callNumber && <CallFloat phoneNumber={links.callNumber} />}
      {links.whatsappNumber && <WhatsAppFloat phoneNumber={links.whatsappNumber} message={links.whatsappMessage ?? ""} />}
    </div>
  );
};
