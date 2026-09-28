import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export function NotFound() {
  return (
    <main className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-[#fffaf0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(#ffc541_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="mx-auto flex min-h-[calc(100vh-145px)] max-w-6xl flex-col items-center justify-center text-center">
        <div className="w-full max-w-5xl" aria-hidden="true">
          {/* The supplied SVG contains its own scoped animation styles. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/404-animated.svg"
            alt=""
            className="mx-auto h-auto w-full max-h-[58vh] object-contain"
          />
        </div>

        <div className="relative z-10 -mt-4 max-w-xl sm:-mt-10">
          <span className="inline-flex items-center border border-[#6f5b92]/20 bg-white/80 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.24em] text-[#6f5b92] shadow-sm backdrop-blur">
            Page not found
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#4e4066] sm:text-4xl">
            Looks like this page rode away.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-6 text-[#6f5b92]/80 sm:text-base">
            The address may be incorrect or the page may have moved. Let&apos;s take you back somewhere useful.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-w-40 items-center justify-center gap-2 bg-[#ffc541] px-6 py-3 text-sm font-extrabold text-[#4e4066] shadow-[4px_4px_0_#4e4066] transition-transform hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              href="/#services"
              className="inline-flex min-w-40 items-center justify-center gap-2 border-2 border-[#4e4066] bg-white px-6 py-2.5 text-sm font-bold text-[#4e4066] transition-colors hover:bg-[#4e4066] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Explore Services
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
