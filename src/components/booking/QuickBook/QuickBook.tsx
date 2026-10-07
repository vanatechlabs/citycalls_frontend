"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { ArrowRight, Check, CheckCircle, ChevronDown, Loader2, Phone, Search, ShieldCheck, X, Zap } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { fetchCityCallsNavbarMenus } from "@/lib/api/navbar";
import { submitQuickBooking } from "@/lib/api/bookings";
import { QuickBookSidePanel } from "./QuickBookSidePanel";

interface ServiceOption {
  name: string;
  path?: string;
  group: string;
}

// Used until Navbar List loads (or if it can't).
const FALLBACK_SERVICES: ServiceOption[] = serviceCategories.flatMap((cat) =>
  cat.services.map((s) => ({ name: s.name, path: `/services/${s.slug}`, group: cat.label }))
);
const NOT_SURE: ServiceOption = { name: "Not sure — please call me", group: "Other" };

// Same field styles as the main booking form (BookingModal → Step1).
const LABEL = "mb-1.5 block text-[11px] font-bold text-ink";
const INPUT =
  "w-full rounded border border-black/20 px-3 py-1.5 text-[12px] font-medium outline-none transition-colors placeholder:font-normal placeholder:text-ink/40 focus:border-primary-dark";
const SUPPORT_PHONE = "+91 74288 08884";
const SUPPORT_TEL = "+917428808884";
const HELPER_LOTTIE = "https://lottie.host/b43fbb7e-5f4c-420a-b516-1e9cd26810ec/gf22SDhjCv.lottie";

// The services people ask for most — one tap instead of opening the list.
const POPULAR = ["AC", "Refrigerator", "Washing Machine", "RO", "Pest Control", "Home Cleaning"];

// subscribe/getSnapshot for "are we in the browser" — true after hydration,
// false on the server, without a mounted-state effect.
const noopSubscribe = () => () => {};

// Round "Quick Book" button for the floating stack beside Call and WhatsApp.
// Opens a short form — name, phone, service (searchable) and an optional
// message — that lands in Admin → Enquiry Section → Quick Booking for the team to call back.
// Uses the stack's .glass-float-btn styles (FloatingActionButtons).
export function QuickBookFloat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const inBrowser = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Other parts of the site (e.g. a blog's "Book a Service" button) open the
  // form with window.dispatchEvent(new Event("quick-book:open")).
  useEffect(() => {
    const openForm = () => setOpen(true);
    window.addEventListener("quick-book:open", openForm);
    return () => window.removeEventListener("quick-book:open", openForm);
  }, []);

  // Lock page scroll and close on Escape while the form is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <QuickBookButton onOpen={() => setOpen(true)} />

      {inBrowser &&
        createPortal(
          <AnimatePresence>
            {open && <QuickBookDialog page={pathname} onClose={() => setOpen(false)} />}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

const LABEL_TEXT = "Quick Book";

// Lightning: one bolt slot every 45° all the way round the button. Each strike
// draws fresh random bolts (jagged, with a fork), so no two look the same.
const BOLT_SLOTS = 8;
type Pt = [number, number];
const rand = (min: number, max: number) => min + Math.random() * (max - min);

// Midpoint displacement: split the line and nudge each midpoint sideways.
function jagged(a: Pt, b: Pt, depth: number, rough: number): Pt[] {
  if (depth === 0) return [a, b];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const off = (Math.random() - 0.5) * len * rough;
  const mid: Pt = [(a[0] + b[0]) / 2 - ((b[1] - a[1]) / len) * off, (a[1] + b[1]) / 2 + ((b[0] - a[0]) / len) * off];
  return [...jagged(a, mid, depth - 1, rough).slice(0, -1), ...jagged(mid, b, depth - 1, rough)];
}
const toD = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

function boltPath(baseDeg: number, rMax: number) {
  const a = ((baseDeg + rand(-18, 18)) * Math.PI) / 180;
  const r0 = 25;
  const r1 = rand(rMax * 0.7, rMax);
  const pts = jagged([Math.cos(a) * r0, Math.sin(a) * r0], [Math.cos(a) * r1, Math.sin(a) * r1], 4, 0.5);
  if (rMax < 50) return toD(pts);
  // A side fork from somewhere along the bolt
  const from = pts[Math.floor(pts.length * rand(0.3, 0.6))];
  const fa = a + (Math.random() < 0.5 ? -1 : 1) * rand(0.45, 0.9);
  const fl = rand(12, 24);
  return `${toD(pts)} ${toD(jagged(from, [from[0] + Math.cos(fa) * fl, from[1] + Math.sin(fa) * fl], 3, 0.55))}`;
}

// The Quick Book button with its own GSAP motion, so it stands apart from the
// Call / WhatsApp buttons:
//  - entrance: drops in spinning with an elastic bounce, label letters rise in
//  - always: amber rays pulse out and three sparks orbit the button
//  - every few seconds, a thunder strike: the bolt trembles while energy
//    gathers (glow swells, sparks pulled in, button tenses), then a white
//    flash, lightning cracks out, double shockwave and an elastic pop
//  - hover: the button leans magnetically toward the cursor
// Respects "reduce motion" (no looping animation then).
function QuickBookButton({ onOpen }: { onOpen: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const moverRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLSpanElement>(null);
  const waveRef = useRef<HTMLSpanElement>(null);
  const wave2Ref = useRef<HTMLSpanElement>(null);
  const orbitRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const mover = moverRef.current;
    if (!root || !mover) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>("[data-qb-letter]", root);
      const slots = gsap.utils.toArray<SVGGElement>("[data-qb-slot]", root);
      const bolts = gsap.utils.toArray<SVGPathElement>("[data-qb-bolt]", root);
      gsap.set(bolts, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 });

      // Fill `count` random slots with new bolts (reach up to rMax px); clear the rest.
      const regenBolts = (count: number, rMax: number) => {
        const order = gsap.utils.shuffle(slots.map((_, i) => i));
        slots.forEach((slot, i) => {
          const d = order.indexOf(i) < count ? boltPath(i * (360 / BOLT_SLOTS), rMax) : "";
          slot.querySelectorAll("path").forEach((p) => p.setAttribute("d", d));
        });
      };

      // Entrance
      const intro = gsap.timeline({ delay: 1 });
      intro
        .from(mover, { scale: 0, rotate: -220, duration: 1.1, ease: "elastic.out(1, 0.55)" })
        .from(labelRef.current, { x: 24, autoAlpha: 0, duration: 0.45, ease: "power3.out" }, "-=0.55")
        .from(letters, { yPercent: 120, autoAlpha: 0, stagger: 0.035, duration: 0.45, ease: "back.out(3)" }, "-=0.25");

      if (reduce) return;

      // Sparks orbiting the button
      gsap.to(orbitRef.current, { rotate: 360, duration: 7, repeat: -1, ease: "none" });
      gsap.to("[data-qb-spark]", {
        scale: 0.4,
        opacity: 0.35,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.3, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });

      // Thunder strike, every few seconds
      // The strike lands 0.72s into this timeline; delay / repeatDelay are set
      // below so it lands 3s after load and then every 3s.
      const tl = gsap.timeline({ repeat: -1, delay: 3 - 0.72 });
      // 1. Charging up — the bolt trembles, energy gathers
      tl.to(iconRef.current, { x: "random(-2.5, 2.5)", y: "random(-2, 2)", rotate: "random(-16, 16)", duration: 0.05, repeat: 13, repeatRefresh: true, ease: "none" }, 0)
        .to(glowRef.current, { scale: 1.5, opacity: 0.95, duration: 0.7, ease: "power2.in" }, 0)
        .to(orbitRef.current, { scale: 0.55, duration: 0.7, ease: "power2.in" }, 0)
        .to(mover, { scale: 0.9, duration: 0.7, ease: "power2.in" }, 0)
        // 2. Strike
        .addLabel("strike", 0.72)
        .set(iconRef.current, { x: 0, y: 0, rotate: 0 }, "strike")
        .fromTo(flashRef.current, { opacity: 1 }, { opacity: 0, duration: 0.45, ease: "power2.out", immediateRender: false }, "strike")
        .fromTo(mover, { scale: 1.25 }, { scale: 1, duration: 0.9, ease: "elastic.out(1.1, 0.35)", immediateRender: false }, "strike")
        .fromTo(iconRef.current, { scale: 1.6 }, { scale: 1, duration: 0.8, ease: "elastic.out(1.2, 0.3)", immediateRender: false }, "strike")
        .to(orbitRef.current, { scale: 1.4, duration: 0.15, ease: "power3.out" }, "strike")
        .to(orbitRef.current, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" }, "strike+=0.15")
        .to(glowRef.current, { scale: 2.4, opacity: 0, duration: 0.6, ease: "power2.out" }, "strike")
        .to(glowRef.current, { scale: 1, opacity: 0.35, duration: 0.8, ease: "power1.out" }, "strike+=0.6")
        .fromTo(waveRef.current, { scale: 1, opacity: 0.95 }, { scale: 2.9, opacity: 0, duration: 0.9, ease: "power3.out", immediateRender: false }, "strike")
        .fromTo(wave2Ref.current, { scale: 1, opacity: 0.7 }, { scale: 2.1, opacity: 0, duration: 0.75, ease: "power2.out", immediateRender: false }, "strike+=0.12")
        // Re-strike: a second, smaller flash like real lightning
        .fromTo(flashRef.current, { opacity: 0.7 }, { opacity: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, "strike+=0.4")
        // The label takes the jolt
        .fromTo(labelRef.current, { x: -5 }, { x: 0, duration: 0.7, ease: "elastic.out(1.2, 0.3)", immediateRender: false }, "strike")
        .to(letters, { y: -3, duration: 0.12, stagger: 0.025, yoyo: true, repeat: 1, ease: "power2.out" }, "strike+=0.05");

      // Lightning: new random bolts crack out (glow + core of a slot draw
      // together), then flicker on and off like a real strike before dying.
      const zap = (at: number, count: number, rMax: number, peak: number, life: number) => {
        tl.call(regenBolts, [count, rMax], at)
          .fromTo(
            bolts,
            { strokeDashoffset: 1, opacity: 1 },
            { strokeDashoffset: 0, duration: 0.08, stagger: (i: number) => Math.floor(i / 2) * 0.012, ease: "none", immediateRender: false },
            at
          )
          .to(bolts, { keyframes: { opacity: [1, 0.12, peak, 0.3, peak * 0.85, 0] }, duration: life, ease: "none" }, at + 0.09);
      };
      zap(0.1, 3, 40, 0.8, 0.2); // small crackles while charging
      zap(0.42, 4, 44, 0.9, 0.2);
      zap(0.72, BOLT_SLOTS, 82, 1, 0.32); // the main strike, all the way round
      zap(1.14, 6, 70, 0.85, 0.3); // re-strike
      tl.repeatDelay(Math.max(0, 3 - tl.duration()));
    }, root);

    // Magnetic hover — the button leans toward the cursor.
    const xTo = gsap.quickTo(mover, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(mover, "y", { duration: 0.4, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = mover.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const onLeave = () => {
      gsap.to(mover, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
    };
    if (!reduce) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
    }

    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative flex items-center justify-center p-2">
      {/* Label — always visible, plain amber pill, letters animate */}
      <span
        ref={labelRef}
        className="pointer-events-none absolute right-full mr-1 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-br from-[#fbbf24] to-[#d97706] px-3 py-1 text-[11px] font-bold text-white"
      >
        <span className="inline-flex" aria-hidden>
          {LABEL_TEXT.split("").map((ch, i) => (
            <span key={i} data-qb-letter className="inline-block">{ch === " " ? " " : ch}</span>
          ))}
        </span>
      </span>

      <div ref={moverRef} className="relative">
        {/* Energy glow behind the button */}
        <span
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.75)_0%,rgba(245,158,11,0.25)_45%,transparent_70%)]"
          style={{ opacity: 0.35 }}
        />
        {/* Lightning bolts — paths are drawn in by GSAP on every strike.
            Each slot: a wide amber glow under a thin white-hot core. */}
        <svg
          aria-hidden
          viewBox="-90 -90 180 180"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          style={{ filter: "drop-shadow(0 0 2px #fff) drop-shadow(0 0 5px #fbbf24) drop-shadow(0 0 10px #f59e0b)" }}
        >
          {Array.from({ length: BOLT_SLOTS }, (_, i) => (
            <g key={i} data-qb-slot fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path data-qb-bolt d="" pathLength={1} stroke="#fcd34d" strokeOpacity={0.55} strokeWidth={3.5} opacity={0} />
              <path data-qb-bolt d="" pathLength={1} stroke="#ffffff" strokeWidth={1.3} opacity={0} />
            </g>
          ))}
        </svg>
        {/* Orbiting sparks */}
        <span ref={orbitRef} aria-hidden className="pointer-events-none absolute -inset-2.5">
          {[0, 120, 240].map((deg) => (
            <span
              key={deg}
              data-qb-spark
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.9)]"
              style={{ transformOrigin: "50% calc(50% + 28px)", rotate: `${deg}deg` }}
            />
          ))}
        </span>
        {/* Shockwaves */}
        <span ref={waveRef} aria-hidden className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber-400 opacity-0" />
        <span ref={wave2Ref} aria-hidden className="pointer-events-none absolute inset-0 rounded-full border border-yellow-200 opacity-0" />

        <button
          type="button"
          onClick={onOpen}
          className="glass-float-btn"
          // GSAP moves the wrapper; the stack's CSS pulse is switched off here.
          style={{ "--tint": "245, 158, 11", "--from": "#fbbf24", "--to": "#d97706", animation: "none" } as React.CSSProperties}
          aria-label="Quick Book — book a service"
        >
          {/* Amber rays — only this button has them */}
          <span className="glass-float-ring" />
          <span className="glass-float-ring" />
          <span className="glass-float-ring" />
          {/* White flash on each strike */}
          <span
            ref={flashRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#fef3c7_45%,rgba(251,191,36,0)_100%)] opacity-0"
          />
          <span ref={iconRef} className="relative inline-flex">
            <Zap className="glass-float-icon fill-white" size={18} strokeWidth={2.5} />
          </span>
        </button>
      </div>
    </div>
  );
}

// Laid out like the main booking modal: help panel on the left, a short
// form on the right.
function QuickBookDialog({ page, onClose }: { page: string; onClose: () => void }) {
  const [services, setServices] = useState<ServiceOption[]>(FALLBACK_SERVICES);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<ServiceOption[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ referenceNo: string; phone: string; name: string; service: string } | null>(null);

  // Services from Admin → Navbar List, grouped by menu.
  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsNavbarMenus(controller.signal)
      .then((menus) => {
        const list = menus.flatMap((m) => m.services.map((s) => ({ name: s.name, path: s.path, group: m.name })));
        if (list.length) setServices(list);
      })
      .catch(() => {
        // Keep the built-in list.
      });
    return () => controller.abort();
  }, []);

  // "AC" → the first service whose name contains it ("AC Service").
  const popular = useMemo(
    () =>
      POPULAR.map((label) => ({
        label,
        option: services.find((s) => new RegExp(`\\b${label}\\b`, "i").test(s.name)),
      })).filter((p): p is { label: string; option: ServiceOption } => !!p.option),
    [services]
  );

  const isSelected = (s: ServiceOption) => selected.some((x) => x.name === s.name && x.group === s.group);
  function toggleService(s: ServiceOption) {
    setSelected((prev) => (isSelected(s) ? prev.filter((x) => !(x.name === s.name && x.group === s.group)) : [...prev, s]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[6-9]\d{9}$/.test(phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (selected.length === 0) return setError("Please choose at least one service.");
    const serviceNames = selected.map((s) => s.name).join(", ");

    setSending(true);
    try {
      const result = await submitQuickBooking({
        name: name.trim(),
        phone,
        serviceName: serviceNames,
        servicePath: selected[0].path,
        message: message.trim() || undefined,
        page,
      });
      setDone({ referenceNo: result.referenceNo, phone, name: name.trim().split(/\s+/)[0], service: serviceNames });
      // Like the Contact page form: success card, then a fresh form after 4s.
      setTimeout(reset, 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again, or call us.");
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setName("");
    setPhone("");
    setSelected([]);
    setMessage("");
    setError("");
    setDone(null);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6" role="dialog" aria-modal="true" aria-labelledby="quick-book-title">
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 16, scale: 0.97, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[90vh] w-[95vw] max-w-[860px] flex-col overflow-hidden rounded-md bg-white md:flex-row"
        style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-md bg-red-500 p-1 text-white shadow-sm transition-colors hover:bg-red-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Left: "Book a Service in 30 Seconds" panel */}
        <div className="hidden w-[36%] min-w-[280px] border-r border-black/5 md:block">
          <QuickBookSidePanel />
        </div>

        {/* Right: the form */}
        <div data-lenis-prevent className="relative flex-1 overflow-y-auto p-6 pt-5 md:p-8 md:pt-6">
          <div className="pointer-events-none absolute right-16 top-1 z-10">
            <DotLottieReact src={HELPER_LOTTIE} loop autoplay className="h-[64px] w-[64px]" />
          </div>

          <div className="mb-5 pr-24">
            <h2 id="quick-book-title" className="flex flex-wrap items-center gap-x-1 font-sans text-[22px] font-black uppercase leading-tight tracking-tight text-ink">
              <span>Quick</span>
              <span className="relative inline-block text-[#f59e0b]">
                Booking
                <svg className="absolute -bottom-1 left-0 h-2.5 w-full" viewBox="0 0 150 10" fill="none" aria-hidden>
                  <motion.path
                    d="M0 8 L 150 8"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </svg>
              </span>
            </h2>
            <p className="mt-1.5 text-xs font-medium text-ink/60">
              Verified technicians <span className="mx-1 inline-block h-1 w-1 rounded-full bg-black/20 align-middle" /> We call you back to confirm
            </p>
          </div>

          <div
            className={`relative overflow-hidden rounded-xl ${
              done ? "border-2 border-green-500 bg-green-50 shadow-lg" : "border border-black/10 bg-white"
            }`}
          >
            {done ? (
              // Same success card as the Contact page form (green box, big tick,
              // auto-reset after 4 seconds).
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[460px] flex-col items-center justify-center p-8 text-center md:p-12"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
                  <CheckCircle className="mb-6 h-24 w-24 text-green-500" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl"
                >
                  Booking Received Successfully!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-3 max-w-md text-base text-gray-600 md:text-lg"
                >
                  Thank you, {done.name}! Our team will call you on <strong className="text-gray-900">+91 {done.phone}</strong> to confirm your visit.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="mb-8 text-sm text-gray-500"
                >
                  Reference No: <span className="font-mono font-bold text-gray-900">{done.referenceNo}</span>
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 text-sm text-gray-500"
                >
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  Form will reset automatically...
                </motion.div>
              </motion.div>
            ) : (
              <>
                <form id="quick-book-form" onSubmit={(e) => void submit(e)} className="px-4 pb-4 pt-3 md:px-5 md:pb-5" noValidate>
                  <h3 className="text-[14px] font-bold text-ink">Your Details</h3>
                  <p className="mb-4 mt-0.5 text-[11px] font-medium text-ink/60">Tell us what you need — we&apos;ll call you back to book the visit.</p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className={LABEL} htmlFor="qb-name">Full Name <span className="text-red-500">*</span></label>
                        <input id="qb-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} placeholder="Enter your full name" className={INPUT} autoComplete="name" />
                      </div>
                      <div>
                        <label className={`${LABEL} flex items-baseline gap-x-1.5 whitespace-nowrap`} htmlFor="qb-phone">
                          <span>Phone number <span className="text-red-500">*</span></span>
                          <span className="truncate text-[10px] font-medium text-red-500">— we&apos;ll call you here</span>
                        </label>
                        <div className="flex items-center overflow-hidden rounded border border-black/20 bg-white transition-colors focus-within:border-primary-dark">
                          <span className="border-r border-black/20 px-2 py-1.5 text-[12px] font-medium text-ink">+91</span>
                          <input
                            id="qb-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            inputMode="numeric"
                            autoComplete="tel-national"
                            placeholder="Enter your phone number"
                            className="min-w-0 flex-1 bg-transparent px-2 py-1.5 text-[12px] font-medium outline-none placeholder:font-normal placeholder:text-ink/40"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className={LABEL}>
                        Select Services <span className="text-red-500">*</span>{" "}
                        <span className="font-medium text-ink/50">(you can pick more than one)</span>
                      </span>
                      <ServicePicker services={services} selected={selected} isSelected={isSelected} onToggle={toggleService} />
                      {popular.length > 0 && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] font-semibold text-ink/50">Popular:</span>
                          {popular.map(({ label, option }) => {
                            const active = isSelected(option);
                            return (
                              <button
                                key={label}
                                type="button"
                                onClick={() => toggleService(option)}
                                className={`rounded border px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                                  active ? "border-[#3e8914] bg-[#3e8914] text-white" : "border-[#3e8914]/25 bg-[#3e8914]/10 text-[#2f6b0f] hover:bg-[#3e8914]/20"
                                }`}
                              >
                                {active && <Check className="mr-0.5 inline h-3 w-3" strokeWidth={3} />}
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={LABEL} htmlFor="qb-message">Message (Optional)</label>
                      <textarea
                        id="qb-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={500}
                        rows={3}
                        placeholder="e.g. Fridge not cooling since yesterday, evening visit preferred"
                        className={`${INPUT} resize-none`}
                      />
                    </div>
                  </div>

                  {error && <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-600">{error}</p>}
                </form>

                <div className="flex flex-col justify-between gap-3 border-t border-black/5 bg-black/[0.01] p-4 md:flex-row md:items-center">
                  <div className="flex items-center justify-center gap-1.5 text-blue-600 md:justify-start">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    <span className="text-[10px] font-medium">Your information is 100% secure and will never be shared.</span>
                  </div>
                  <button
                    form="quick-book-form"
                    type="submit"
                    disabled={sending}
                    className="flex shrink-0 items-center justify-center gap-2 rounded bg-[#3e8914] px-6 py-2 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#347311] disabled:opacity-70"
                  >
                    {sending ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…</> : <>Submit <ArrowRight className="h-3 w-3" /></>}
                  </button>
                </div>
              </>
            )}
          </div>

          <p className="mt-4 text-center text-[11px] font-medium text-ink/60">
            Prefer to talk now?{" "}
            <a href={`tel:${SUPPORT_TEL}`} className="inline-flex items-center gap-1 font-bold text-[#3e8914] hover:underline">
              <Phone className="h-3 w-3" /> {SUPPORT_PHONE}
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Searchable multi-select of services, grouped by Navbar List menu. Picked
// services show as removable chips in the field; the list stays open so
// several can be ticked.
function ServicePicker({
  services, selected, isSelected, onToggle,
}: {
  services: ServiceOption[];
  selected: ServiceOption[];
  isSelected: (s: ServiceOption) => boolean;
  onToggle: (s: ServiceOption) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = [...services, NOT_SURE].filter((s) => !q || s.name.toLowerCase().includes(q) || s.group.toLowerCase().includes(q));
    const byGroup = new Map<string, ServiceOption[]>();
    list.forEach((s) => byGroup.set(s.group, [...(byGroup.get(s.group) ?? []), s]));
    return [...byGroup.entries()];
  }, [services, query]);

  return (
    <div ref={boxRef} className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setOpen((v) => !v))}
        className={`${INPUT} flex min-h-[34px] cursor-pointer items-center justify-between gap-2 text-left ${open ? "border-primary-dark" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected.length === 0 ? (
          <span className="font-normal text-ink/40">Select one or more services</span>
        ) : (
          <span className="flex min-w-0 flex-wrap gap-1">
            {selected.map((s) => (
              <span key={`${s.group}-${s.name}`} className="inline-flex items-center gap-1 rounded border border-[#3e8914]/30 bg-[#3e8914]/10 px-1.5 py-0.5 text-[11px] font-semibold text-[#2f6b0f]">
                {s.name}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onToggle(s); }}
                  className="rounded text-[#2f6b0f]/70 hover:text-red-600"
                  aria-label={`Remove ${s.name}`}
                >
                  <X className="h-3 w-3" strokeWidth={2.5} />
                </button>
              </span>
            ))}
          </span>
        )}
        <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-ink/50 transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded border border-black/15 bg-white shadow-lg">
          <div className="relative border-b border-black/5 p-2">
            <Search className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/40" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              className="w-full rounded border border-black/15 py-1.5 pl-7 pr-3 text-[12px] font-medium outline-none placeholder:font-normal placeholder:text-ink/40 focus:border-primary-dark"
            />
          </div>
          <ul role="listbox" aria-multiselectable="true" data-lenis-prevent className="max-h-52 overflow-y-auto py-1">
            {groups.length === 0 ? (
              <li className="px-3 py-3 text-[12px] text-ink/50">No service found — choose &quot;Not sure&quot; and tell us in the message.</li>
            ) : (
              groups.map(([group, items]) => (
                <li key={group}>
                  <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-[#3e8914]">{group}</p>
                  {items.map((s) => {
                    const checked = isSelected(s);
                    return (
                      <button
                        key={`${s.group}-${s.name}`}
                        type="button"
                        role="option"
                        aria-selected={checked}
                        onClick={() => onToggle(s)}
                        className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] transition-colors hover:bg-[#3e8914]/5 ${checked ? "font-bold text-[#2f6b0f]" : "font-medium text-ink"}`}
                      >
                        <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border ${checked ? "border-[#3e8914] bg-[#3e8914]" : "border-black/30"}`}>
                          {checked && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />}
                        </span>
                        {s.name}
                      </button>
                    );
                  })}
                </li>
              ))
            )}
          </ul>
          <div className="flex items-center justify-between border-t border-black/5 px-3 py-2">
            <span className="text-[11px] font-medium text-ink/60">{selected.length} selected</span>
            <button type="button" onClick={() => setOpen(false)} className="rounded bg-[#3e8914] px-3 py-1 text-[11px] font-bold text-white hover:bg-[#347311]">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
