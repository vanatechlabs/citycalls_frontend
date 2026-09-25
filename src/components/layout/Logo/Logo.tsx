"use client";

import Link from "next/link";

export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`inline-flex flex-col items-start leading-none ${className}`}>
      <img src="/logo.png" alt="CityCalls Logo" className="h-8 md:h-10 w-auto object-contain" />
      <span
        className="text-[10px] font-semibold tracking-[0.08em] text-white/70 mt-[2px] pl-1.5"
        style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.06em" }}
      >
        built for brand services
      </span>
    </Link>
  );
}
