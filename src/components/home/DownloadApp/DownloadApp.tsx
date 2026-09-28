"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Apple,
  Play,
  Wifi,
  Wind,
  SprayCan,
  Bug,
  Scissors,
  Bell,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  CheckCircle2,
  Navigation,
  Home as HomeIcon,
  Calendar,
  User as UserIcon,
  ChevronRight,
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

/* ================================ TYPES ================================ */

interface TabItem {
  icon: React.ElementType;
  label: string;
}

interface ScreenItem {
  key: string;
  tab: number;
  render: () => React.ReactNode;
}

interface BottomNavProps {
  tabs: TabItem[];
  activeIndex: number;
}

interface AvatarProps {
  initials: string;
  size?: number;
}

interface MapPreviewProps {
  etaLabel?: string;
}

interface PhoneMockupProps {
  screens: ScreenItem[];
  tabs: TabItem[];
  isInView: boolean;
  intervalMs?: number;
  startDelay?: number;
  tag?: string;
}

/* ============================== STATUS BAR ============================== */

function StatusBar() {
  return (
    <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-6 pt-2.5 text-white pointer-events-none">
      <span className="text-[11px] font-semibold tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className="w-[2.5px] h-[40%] bg-white rounded-full" />
          <span className="w-[2.5px] h-[60%] bg-white rounded-full" />
          <span className="w-[2.5px] h-[80%] bg-white rounded-full" />
          <span className="w-[2.5px] h-full bg-white rounded-full" />
        </div>
        <Wifi size={11} strokeWidth={2.5} />
        <div className="w-5 h-2.5 rounded-[3px] border border-white/70 flex items-center px-[1.5px]">
          <div className="w-full h-full bg-white rounded-[1px] scale-x-[0.8] origin-left" />
        </div>
      </div>
    </div>
  );
}

/* ============================ BOTTOM NAV BAR ============================= */

function BottomNav({ tabs, activeIndex }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-black/[0.06] px-2 pt-1.5 pb-3 flex items-center justify-between z-30 rounded-b-[1.75rem]">
      {tabs.map((tab: TabItem, i: number) => {
        const Icon = tab.icon;
        const active = i === activeIndex;
        return (
          <div key={tab.label} className="flex-1 flex flex-col items-center gap-0.5">
            <Icon
              size={15}
              strokeWidth={active ? 2.4 : 2}
              className={active ? "text-primary" : "text-ink/30"}
            />
            <span
              className={`text-[8px] font-semibold ${
                active ? "text-primary" : "text-ink/30"
              }`}
            >
              {tab.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ================================ SHARED BITS ============================ */

function Avatar({ initials, size = 32 }: AvatarProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold shrink-0 ring-2 ring-white/20"
    >
      <span style={{ fontSize: size * 0.36 }}>{initials}</span>
    </div>
  );
}

function LiveBadge({ label = "Live" }) {
  return (
    <span className="inline-flex items-center gap-1 bg-white/10 border border-white/15 rounded-full px-2 py-[3px]">
      <span className="relative flex w-1.5 h-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
      </span>
      <span className="text-[8.5px] font-bold text-white/80 uppercase tracking-wide">{label}</span>
    </span>
  );
}

function MapPreview({ etaLabel }: MapPreviewProps) {
  return (
    <div className="relative h-24 rounded-xl overflow-hidden bg-[#e9ebe4]">
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full opacity-70">
        <path d="M0 70 Q 50 20 100 55 T 200 30" stroke="#c9cdbf" strokeWidth="10" fill="none" />
        <path
          d="M0 70 Q 50 20 100 55 T 200 30"
          stroke="var(--tw-color-primary, #D97757)"
          strokeWidth="3"
          strokeDasharray="6 5"
          fill="none"
        />
      </svg>
      <div className="absolute left-4 bottom-5 w-3 h-3 rounded-full bg-ink ring-4 ring-ink/15" />
      <div className="absolute right-6 top-5 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20" />
      {etaLabel && (
        <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white rounded-lg px-2.5 py-1.5 shadow-md flex items-center gap-1.5">
          <Navigation size={10} className="text-primary shrink-0" />
          <span className="text-[9.5px] font-bold text-ink">{etaLabel}</span>
        </div>
      )}
    </div>
  );
}

/* ========================= USER APP SCREENS ========================= */

function UserHomeScreen() {
  const categories = [
    { icon: Wind, label: "AC Service" },
    { icon: SprayCan, label: "Sofa Cleaning" },
    { icon: Bug, label: "Pest Control" },
    { icon: Scissors, label: "Salon" },
  ];
  return (
    <>
      <div className="pt-9 px-4 pb-3 bg-ink text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar initials="R" size={28} />
            <div>
              <div className="text-[9px] text-white/45 leading-none">Hi, Rohit</div>
              <div className="flex items-center gap-0.5 text-[8.5px] text-white/60 mt-0.5">
                <MapPin size={8} />
                Indirapuram, GZB
              </div>
            </div>
          </div>
          <div className="relative">
            <Bell size={15} className="text-white/70" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>
        <div className="font-semibold text-[13px] leading-snug mt-2.5">What needs fixing today?</div>
        <div className="mt-2 h-7 rounded-full bg-white/[0.08] border border-white/10 flex items-center px-3 text-[9.5px] text-white/40">
          Search services...
        </div>
      </div>

      <div className="p-3 space-y-2 flex-1 pb-11 bg-neutral-50 overflow-hidden">
        <div className="rounded-xl bg-gradient-to-r from-primary to-primary/70 p-2.5 flex items-center justify-between text-white shadow-sm">
          <div>
            <div className="text-[10px] font-bold leading-tight">20% off first AC service</div>
            <div className="text-[8px] text-white/75 mt-0.5">Use code CITY20</div>
          </div>
          <ChevronRight size={14} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {categories.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="rounded-xl bg-white border border-black/[0.05] shadow-sm p-2 flex flex-col gap-1.5"
            >
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon size={13} className="text-primary" />
              </div>
              <span className="text-[9.5px] font-semibold text-ink leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function UserTrackingScreen() {
  const steps = ["Confirmed", "Assigned", "On the way", "Done"];
  const activeStep = 2;
  return (
    <>
      <div className="pt-9 px-4 pb-3 bg-ink text-white">
        <div className="flex items-center justify-between">
          <div className="text-[9px] text-white/45">Booking #CC1042</div>
          <LiveBadge />
        </div>
        <div className="font-semibold text-[13px] leading-snug mt-1">
          Technician is on the way
        </div>
      </div>

      <div className="p-3 space-y-2 flex-1 pb-11 bg-neutral-50 overflow-hidden">
        <MapPreview etaLabel="Arriving in 8 mins" />

        <div className="rounded-xl bg-white border border-black/[0.05] shadow-sm p-2 flex items-center gap-2">
          <Avatar initials="SK" size={28} />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-ink truncate">Suresh Kumar</div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={9} className="text-primary fill-primary" />
              <span className="text-[8px] text-ink/45">4.9 · AC Technician</span>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="w-5.5 h-5.5 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone size={10} className="text-primary" />
            </div>
            <div className="w-5.5 h-5.5 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageCircle size={10} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-black/[0.05] shadow-sm p-2.5">
          <div className="flex items-center">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold shrink-0 ${
                    i <= activeStep ? "bg-primary text-white" : "bg-black/[0.06] text-ink/30"
                  }`}
                >
                  {i < activeStep ? "✓" : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-0.5 rounded-full ${
                      i < activeStep ? "bg-primary" : "bg-black/[0.08]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-[8px] font-semibold text-ink/50 mt-1">{steps[activeStep]}</div>
        </div>
      </div>
    </>
  );
}

function UserInvoiceScreen() {
  return (
    <>
      <div className="pt-9 px-4 pb-3 bg-ink text-white">
        <div className="w-7 h-7 rounded-full bg-emerald-400/15 flex items-center justify-center mb-1.5">
          <CheckCircle2 size={15} className="text-emerald-400" />
        </div>
        <div className="font-semibold text-[13px] leading-snug">Service completed</div>
        <div className="text-[9px] text-white/45 mt-0.5">Rate your experience</div>
      </div>

      <div className="p-3 space-y-2 flex-1 pb-11 bg-neutral-50 overflow-hidden">
        <div className="flex items-center justify-center gap-1.5 py-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} className="text-primary fill-primary" />
          ))}
        </div>
        <div className="h-9 rounded-lg bg-white border border-black/[0.06] px-2.5 flex items-center text-[8.5px] text-ink/35">
          Add a comment (optional)
        </div>

        <div className="rounded-xl bg-white border border-black/[0.05] shadow-sm p-2.5 space-y-1">
          <div className="flex justify-between text-[9px]">
            <span className="text-ink/50">Service charge</span>
            <span className="font-semibold text-ink">₹599</span>
          </div>
          <div className="flex justify-between text-[9px]">
            <span className="text-ink/50">Visiting charge</span>
            <span className="font-semibold text-ink">₹50</span>
          </div>
          <div className="h-px bg-black/[0.06] my-0.5" />
          <div className="flex justify-between text-[10px]">
            <span className="font-bold text-ink">Total paid</span>
            <span className="font-bold text-primary">₹649</span>
          </div>
        </div>
      </div>
    </>
  );
}

const userScreens = [
  { key: "home", tab: 0, render: () => <UserHomeScreen /> },
  { key: "tracking", tab: 2, render: () => <UserTrackingScreen /> },
  { key: "invoice", tab: 1, render: () => <UserInvoiceScreen /> },
];

const userTabs = [
  { icon: HomeIcon, label: "Home" },
  { icon: Calendar, label: "Bookings" },
  { icon: MapPin, label: "Track" },
  { icon: UserIcon, label: "Profile" },
];

/* ===================== PHONE SHELL — auto-cycles screens ===================== */

function PhoneMockup({ screens, tabs, isInView, intervalMs = 3400, startDelay = 0, tag }: PhoneMockupProps) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isInView) return;
    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % screens.length);
      }, intervalMs);
    }, startDelay);
    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const current = screens[index];

  return (
    <div className="flex flex-col items-center gap-3">
      {tag && (
        <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/15 border border-primary/25 px-2.5 py-1 rounded-full">
          {tag}
        </span>
      )}

      {/* Bezel */}
      <div className="relative w-[184px] h-[380px] rounded-[2.3rem] bg-neutral-900 p-[7px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.55)] ring-1 ring-white/10 overflow-hidden">
        {/* side buttons */}
        <div className="absolute -left-[2px] top-16 w-[3px] h-6 bg-neutral-700 rounded-r z-30" />
        <div className="absolute -left-[2px] top-24 w-[3px] h-9 bg-neutral-700 rounded-r z-30" />
        <div className="absolute -right-[2px] top-20 w-[3px] h-11 bg-neutral-700 rounded-l z-30" />

        {/* Screen */}
        <div className="relative w-full h-full rounded-[1.75rem] bg-white overflow-hidden [isolation:isolate] [transform:translateZ(0)]">
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-40" />
          <StatusBar />

          <div className="absolute inset-0 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col overflow-hidden"
              >
                {current.render()}
              </motion.div>
            </AnimatePresence>
          </div>

          <BottomNav tabs={tabs} activeIndex={current.tab} />

          {/* subtle glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none z-30" />
          {/* home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black/30 z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

/* ================================ MAIN SECTION ================================ */

export function DownloadApp() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="bg-background">
      <div className="container-x pb-10 pt-2">
        <div className="relative overflow-hidden rounded-2xl bg-ink text-white pl-7 pb-7 pt-5 pr-4 md:pl-10 md:pb-10 md:pt-8 md:pr-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center border border-white/10">
          {/* subtle ambient glow, no loud gradient */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="h-px w-6 bg-primary"
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                Get the app
              </span>
            </div>

            <h2 className="text-2xl md:text-[28px] font-semibold leading-snug tracking-tight">
              Book, track &amp; reschedule
              <br />
              all from your phone.
            </h2>

            <p className="mt-3 text-white/55 text-[13.5px] leading-relaxed max-w-sm">
              Live technician tracking, one-tap rebooking, digital invoices, and exclusive
              app-only offers.
            </p>

            <div className="mt-6 p-5 rounded-2xl bg-white/[0.06] border border-[#f5a623]/30 backdrop-blur-md max-w-lg shadow-xl">
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#f5a623] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5a623]">
                  Launching Soon
                </span>
                <span className="text-[10px] font-medium text-white/60 bg-white/10 px-2 py-0.5 rounded-full ml-auto">
                  Coming Very Soon
                </span>
              </div>
              <h3 className="text-[17px] font-bold text-white mb-1.5 leading-snug">
                CityCalls Mobile App is Launching Soon!
              </h3>
              <p className="text-[13px] text-slate-300 leading-relaxed">
                We are putting the final touches on our high-speed mobile app. Very soon, you will be able to download CityCalls on iOS &amp; Android for instant 1-tap bookings, live technician tracking, and exclusive discounts.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-3.5 border-t border-white/10 text-[12px] text-white/80">
                <div className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] px-3.5 py-1.5 rounded-xl border border-white/10 transition-colors">
                  <Apple size={16} className="text-white/90" />
                  <span className="font-medium text-[12.5px]">Apple App Store</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] px-3.5 py-1.5 rounded-xl border border-white/10 transition-colors">
                  <Play size={15} className="text-white/90" />
                  <span className="font-medium text-[12.5px]">Google Play Store</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex justify-center items-center z-10"
          >
            <PhoneMockup
              screens={userScreens}
              tabs={userTabs}
              isInView={isInView}
              intervalMs={3400}
              startDelay={500}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
