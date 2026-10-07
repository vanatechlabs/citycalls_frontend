"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Check, Facebook, Link2, Linkedin, Twitter, Zap } from "lucide-react";

// Thin green bar at the very top that fills as the article is read.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[150] h-[3px] origin-left bg-gradient-to-r from-primary to-emerald-400" style={{ scaleX }} />;
}

// Opens the site's Quick Book form (QuickBookFloat listens for this event).
export function BookServiceButton({ className = "", label = "Book a Service" }: { className?: string; label?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("quick-book:open"))} className={className}>
      <Zap className="h-4 w-4 fill-current" />
      {label}
    </button>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  );
}

const noopSubscribe = () => () => {};

// Share the current article. The page URL is read in the browser.
export function ShareButtons({ title, compact = false }: { title: string; compact?: boolean }) {
  // The page URL only exists in the browser ("" while server-rendering).
  const url = useSyncExternalStore(noopSubscribe, () => window.location.href, () => "");
  const [copied, setCopied] = useState(false);

  const enc = encodeURIComponent;
  const links = [
    { label: "WhatsApp", icon: WhatsAppIcon, href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, color: "hover:bg-[#25d366] hover:border-[#25d366]" },
    { label: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, color: "hover:bg-[#1877f2] hover:border-[#1877f2]" },
    { label: "X", icon: Twitter, href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`, color: "hover:bg-black hover:border-black" },
    { label: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, color: "hover:bg-[#0a66c2] hover:border-[#0a66c2]" },
  ];

  const copy = () => {
    void navigator.clipboard?.writeText(url || window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const size = compact ? "h-9 w-9" : "h-10 w-10";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ label, icon: Icon, href, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
          className={`flex ${size} items-center justify-center rounded-full border border-border bg-card text-ink transition-all hover:-translate-y-0.5 hover:text-white ${color}`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label="Copy link"
        title="Copy link"
        className={`flex ${size} items-center justify-center rounded-full border transition-all hover:-translate-y-0.5 ${
          copied ? "border-primary bg-primary text-ink" : "border-border bg-card text-ink hover:border-ink hover:bg-ink hover:text-white"
        }`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
