import { Link } from "react-router-dom";

export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      <img src="/logo.png" alt="CityCalls Logo" className="h-8 md:h-10 w-auto object-contain" />
    </Link>
  );
}
