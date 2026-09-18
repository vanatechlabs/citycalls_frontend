import { Link } from "react-router-dom";

export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link to="/" className={`inline-flex flex-col items-start leading-none ${className}`}>
      <img src="/logo.png" alt="CityCalls Logo" className="h-8 md:h-10 w-auto object-contain" />
      <span
        className="text-[10px] font-semibold tracking-[0.08em] text-white/70 mt-[2px] pl-1.5"
        style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.06em" }}
      >
        built for brand services
      </span>
    </Link>
  );
}
