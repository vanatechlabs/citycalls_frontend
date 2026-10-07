"use client";

import Link from "next/link";

// `large`: the bigger version used in the footer.
export function Logo({ dark = false, className = "", large = false }: { dark?: boolean; className?: string; large?: boolean }) {
  return (
    <Link href="/" className={`inline-flex flex-col items-start leading-none ${className}`}>
      <img src="/logo.png" alt="CityCalls Logo" className={`${large ? "h-14 md:h-[72px]" : "h-8 md:h-10"} w-auto object-contain`} />
      <span
        className={`${large ? "text-[13px] pl-2.5" : "text-[10px] pl-1.5"} font-semibold tracking-[0.08em] text-white/70 mt-[2px]`}
        style={{ fontFamily: "var(--font-inter), sans-serif", letterSpacing: "0.06em" }}
      >
        built for brand services
      </span>
    </Link>
  );
}
