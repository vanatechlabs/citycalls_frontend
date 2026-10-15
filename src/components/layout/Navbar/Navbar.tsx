"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, ChevronDown, ChevronRight, FileText, House, Info, LayoutGrid, Mail, Newspaper, Phone, Scissors,
  ShieldCheck, Sofa, SprayCan, WashingMachine, X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { serviceCategories } from "@/data/services";
import { fetchCityCallsNavbarMenus } from "@/lib/api/navbar";
import { Logo } from "@/components/layout/Logo/Logo";
import { MegaMenu } from "./MegaMenu";

const NAV_ORDER = ["home-appliance", "home-cleaning", "pest-control"];
// Not a menu of its own — its services are listed under Home Cleaning.
const MERGED_INTO: Record<string, string> = { "sofa-cleaning": "home-cleaning" };
// One-word pages that open on a light section (no photo hero).
const SOLID_NAV_PAGES = ["/about", "/contact", "/privacy", "/terms"];

// Looser than the catalog's own ServiceCategory/SubService types (which key
// `id` to a closed ServiceCategoryId union) — the admin-managed menus can
// have any slug, so the navbar's own state needs a wider shape. Structurally
// compatible with both the hardcoded fallback and MegaMenu's local types.
interface NavServiceItem {
  slug: string;
  name: string;
  image?: string | null;
  path?: string;
}
interface NavCategory {
  id: string;
  label: string;
  services: NavServiceItem[];
}

// The four category dropdowns this navbar has always shown, built from the
// hardcoded catalog data (which also powers the /services/:slug detail
// pages — those keep working unchanged regardless of where the navbar link
// itself came from).
// Menu items inside the glass pill (roomier from 1760px wide).
const NAV_ITEM =
  "relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-semibold tracking-wide transition-all duration-200 2xl:px-2.5 min-[1760px]:gap-2 min-[1760px]:px-3.5 min-[1760px]:text-[14.5px]";
const NAV_ITEM_IDLE = "text-white/90 hover:bg-white/[0.08] hover:text-white";
// Its dropdown is open.
const NAV_ITEM_OPEN = "bg-white/[0.10] text-white";
// The page being viewed: olive-green pill, with a thin green line and a
// glowing dot on the pill's bottom edge right under it.
const NAV_ITEM_ACTIVE =
  "bg-[#4c8a1a]/45 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] before:absolute before:-bottom-[7px] before:left-1 before:right-1 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#7ed321] before:to-transparent after:absolute after:-bottom-[10px] after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:rounded-full after:bg-[#7ed321] after:shadow-[0_0_8px_2px_rgba(126,211,33,0.7)]";
const NAV_ICON = "h-[15px] w-[15px] shrink-0 min-[1760px]:h-[17px] min-[1760px]:w-[17px]";
const navIconTone = (active: boolean) => (active ? "text-[#7ed321]" : "text-white/90");

// Solid house (with a door) for the active Home item.
function HouseFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M11.3 2.6a1.1 1.1 0 0 1 1.4 0l8.4 7.1c.25.21.4.52.4.85V20a1.5 1.5 0 0 1-1.5 1.5H15v-6.2a.8.8 0 0 0-.8-.8H9.8a.8.8 0 0 0-.8.8v6.2H4A1.5 1.5 0 0 1 2.5 20v-9.45c0-.33.15-.64.4-.85l8.4-7.1z" />
    </svg>
  );
}

// Icon for a navbar menu (desktop pill and mobile drawer), by its slug.
function categoryIcon(id: string) {
  if (/appliance/.test(id)) return WashingMachine;
  if (/pest/.test(id)) return ShieldCheck;
  if (/sofa/.test(id)) return Sofa;
  if (/clean/.test(id)) return SprayCan;
  return LayoutGrid;
}

// True when `pathname` is `href` itself or a page below it.
export function isCurrentPath(pathname: string, href: string) {
  const clean = (value: string) => value.replace(/\/+$/, "") || "/";
  const current = clean(pathname);
  const target = clean(href);
  return current === target || (target !== "/" && current.startsWith(`${target}/`));
}

const serviceHref = (service: NavServiceItem) => service.path || `/services/${service.slug}`;

const MOBILE_LINKS = [
  { href: "/about", label: "About", icon: Info },
  { href: "/blogs", label: "Blogs", icon: Newspaper },
  { href: "/contact", label: "Contact", icon: Phone },
];

// Mobile menu opens as a circle growing out of the hamburger button
// (16px header padding + half of the 40px button = 36px from the right; the
// 64px-tall header puts its centre 32px down).
const MENU_ORIGIN = "calc(100% - 36px) 32px";
const MENU_CLOSED = `circle(0% at ${MENU_ORIGIN})`;
const MENU_OPEN = `circle(150% at ${MENU_ORIGIN})`;

// Menu contents rise in one after another once the circle has opened.
const drawerListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};
const drawerItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const fallbackNavCategories: NavCategory[] = serviceCategories
  .filter((cat) => NAV_ORDER.includes(cat.id))
  .sort((a, b) => NAV_ORDER.indexOf(a.id) - NAV_ORDER.indexOf(b.id))
  .map((cat) => ({
    id: cat.id,
    label: cat.label,
    services: [...cat.services, ...serviceCategories.filter((other) => MERGED_INTO[other.id] === cat.id).flatMap((other) => other.services)],
  }));

// `solid` (Admin → Settings → Website Navbar): the black navbar on every page.
export function Navbar({ solid = false }: { solid?: boolean } = {}) {
  const pathname = usePathname() ?? "/";
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState<string | null>(null);
  // The drawer is portalled to <body> once first opened: inside the header
  // its position: fixed would be trapped by the header's backdrop-filter.
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false);

  function openMobileMenu() {
    setMobileMenuMounted(true);
    // Start with the current page's category (else the first one) showing.
    setMobileCat(currentCat ?? navCategories[0]?.id ?? null);
    setMobileOpen(true);
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }
  const [scrolled, setScrolled] = useState(false);
  // Pages that open with a dark photo hero (it carries data-nav-overlay): the
  // navbar floats over it, see-through, until the page is scrolled. The route
  // check decides the first paint; the hero's marker confirms it afterwards
  // (e.g. a 404 under /services has no hero, so the navbar goes solid).
  // Any other one-word path is a city location page (/ac-service-in-noida).
  const overlayRoute =
    pathname === "/" || pathname === "/blogs" || pathname === "/services" || pathname.startsWith("/services/") ||
    (/^\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pathname) && !SOLID_NAV_PAGES.includes(pathname));
  const [heroPresent, setHeroPresent] = useState(true);
  const overlay = !solid && overlayRoute && heroPresent;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setHeroPresent(!!document.querySelector("[data-nav-overlay]")));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);
  // Managed from Admin → Website Section → Navbar List. Starts as the
  // hardcoded fallback (so there's no flash of an empty navbar) and is
  // replaced once the admin-configured menus load successfully.
  const [navCategories, setNavCategories] = useState(fallbackNavCategories);
  // The menu whose services include the page being viewed.
  const currentCat =
    navCategories.find((cat) => cat.services.some((service) => isCurrentPath(pathname, serviceHref(service))))?.id ?? null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [mobileOpen]);

  useEffect(() => {
    const controller = new AbortController();

    const loadNavbarMenus = () => {
      fetchCityCallsNavbarMenus(controller.signal)
      .then((menus) => {
        // An empty admin response means no dynamic menu has been configured yet.
        // Keep showing the static catalog until at least one admin menu exists.
        if (menus.length === 0) return;

        setNavCategories(
          menus.map((menu) => ({
            id: menu.slug,
            label: menu.name,
            services: menu.services.map((service) => ({
              slug: service.path.split("/").filter(Boolean).pop() || service.id,
              name: service.name,
              image: service.image,
              path: service.path,
            })),
          }))
        );
      })
      .catch(() => {
        // Keep the hardcoded fallback — the rest of the site still works.
      });
    };

    loadNavbarMenus();
    window.addEventListener("focus", loadNavbarMenus);

    return () => {
      window.removeEventListener("focus", loadNavbarMenus);
      controller.abort();
    };
  }, []);

  return (
    <header
      className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-[100] text-white transition-[background-color,box-shadow] duration-500 ${
        // Scrolled: real frosted glass over the page content behind it.
        scrolled
          ? "bg-ink/55 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.75)]"
          : overlay
            ? "bg-transparent"
            : "bg-ink"
      }`}
    >
      {/* Soft gold light behind the buttons + a glass top edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Over a hero: only a faint shade at the very top so the menu stays readable on bright photos */}
        {overlay && !scrolled && <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent" />}
        <div className={`absolute -top-20 right-[6%] h-40 w-80 rounded-full bg-[#d4af37]/20 blur-3xl ${overlay && !scrolled ? "opacity-0" : ""}`} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      <div
        className={`relative mx-auto flex w-full max-w-[1760px] items-center justify-between gap-3 px-4 transition-[height] duration-300 lg:px-6 2xl:px-10 ${
          scrolled ? "h-16" : "h-16 md:h-[76px]"
        }`}
      >
        {/* Nudged right to line up with the content below (see .nav-logo-* in globals.css) */}
        <Logo className={`shrink-0 ${pathname === "/" ? "nav-logo-home" : "nav-logo-page"}`} />

        {/* Glass menu pill — dropdowns open below each item (MegaMenu). No
            backdrop-filter here: it would stop the dropdown's own blur from
            seeing the page behind it. */}
        {/* Full menu from xl (1280px) up — below that it doesn't fit beside the
            buttons, so the hamburger menu takes over. */}
        <nav className="relative hidden xl:flex items-center gap-0.5 rounded-full border border-white/15 bg-white/[0.07] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(255,255,255,0.04),0_10px_30px_-10px_rgba(0,0,0,0.6)]">
          {/* top sheen */}
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.10] via-transparent to-transparent" />
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`${NAV_ITEM} ${pathname === "/" ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE}`}>
            {pathname === "/" ? <HouseFilled className={`${NAV_ICON} ${navIconTone(true)}`} /> : <House className={`${NAV_ICON} ${navIconTone(false)}`} />}
            Home
          </Link>
          {navCategories.map((cat) => {
            const isOpen = openCat === cat.id;
            // The page being viewed belongs to this menu — it stays highlighted.
            const isCurrent = currentCat === cat.id;
            const Icon = categoryIcon(cat.id);
            return (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setOpenCat(cat.id)}
                onMouseLeave={() => setOpenCat(null)}
              >
                <button
                  aria-current={isCurrent ? "page" : undefined}
                  className={`${NAV_ITEM} ${isCurrent ? NAV_ITEM_ACTIVE : isOpen ? NAV_ITEM_OPEN : NAV_ITEM_IDLE}`}
                >
                  <Icon className={`${NAV_ICON} ${navIconTone(isCurrent)}`} />
                  {cat.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-[#7ed321]" : isCurrent ? "text-[#7ed321]" : "opacity-80"}`}
                  />
                </button>
                {isOpen && <MegaMenu category={cat} onNavigate={() => setOpenCat(null)} />}
              </div>
            );
          })}
          <Link
            href="/blogs"
            aria-current={isCurrentPath(pathname, "/blogs") ? "page" : undefined}
            className={`${NAV_ITEM} ${isCurrentPath(pathname, "/blogs") ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE}`}
          >
            <FileText className={`${NAV_ICON} ${navIconTone(isCurrentPath(pathname, "/blogs"))}`} />
            Blogs
          </Link>
          <Link
            href="/contact"
            aria-current={isCurrentPath(pathname, "/contact") ? "page" : undefined}
            className={`${NAV_ITEM} ${isCurrentPath(pathname, "/contact") ? NAV_ITEM_ACTIVE : NAV_ITEM_IDLE}`}
          >
            <Mail className={`${NAV_ICON} ${navIconTone(isCurrentPath(pathname, "/contact"))}`} />
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2.5">
            {/* Beauty Saloon — gold glass pill (styles: .beauty-btn in globals.css) */}
            <a href="https://salon.citycalls.in/" target="_blank" rel="noopener noreferrer" className="beauty-btn group shrink-0 whitespace-nowrap">
              <Scissors size={15} className="beauty-btn__icon" />
              <span className="beauty-btn__text">Beauty Saloon</span>
              <ArrowUpRight size={14} className="text-[#e9c96a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Help Now — New UI Button */}
            <a href="https://helpnow.citycalls.in/" target="_blank" rel="noopener noreferrer" className="helpnow-btn flex shrink-0 items-center gap-1 whitespace-nowrap bg-gradient-to-b from-[#FFCF24] to-[#FDBA00] hover:from-[#FFE066] hover:to-[#F5B50A] rounded-full pl-2 pr-1 py-1.5 shadow-[0_4px_14px_rgba(253,186,0,0.4)] border border-[#E5A800]">
              {/* Left Icon (House + Sparkles) */}
              <div className="flex items-center gap-1">
                <div className="relative flex items-center pr-1">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <rect x="9" y="12" width="2.5" height="2.5" fill="black"></rect>
                    <rect x="12.5" y="12" width="2.5" height="2.5" fill="black"></rect>
                    <rect x="9" y="15.5" width="2.5" height="2.5" fill="black"></rect>
                    <rect x="12.5" y="15.5" width="2.5" height="2.5" fill="black"></rect>
                  </svg>
                  <div className="absolute -top-0.5 right-0">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="black">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
                    </svg>
                  </div>
                  <div className="absolute top-3 -right-1">
                    <svg width="5" height="5" viewBox="0 0 24 24" fill="black">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
                    </svg>
                  </div>
                </div>
                {/* Divider */}
                <div className="w-[1.5px] h-6.5 bg-black/80 rounded-full" />
              </div>

              {/* Middle Text */}
              <div className="flex flex-col items-start leading-none">
                <div className="text-black text-[14px] tracking-tight flex items-baseline">
                  <span className="font-extrabold font-sans">Help</span>
                  <span className="font-serif italic font-bold ml-[1px]">Now</span>
                </div>
                <span className="text-black font-bold text-[7.5px] uppercase tracking-tight mt-0.5">
                  House Help Services
                </span>
              </div>

              {/* Right Arrow */}
              <div className="w-6.5 h-6.5 bg-white/95 rounded-full flex items-center justify-center ml-0.5 shadow-sm">
                <ArrowRight size={14} className="text-black" strokeWidth={2.5} />
              </div>
            </a>
          </div>
          {/* Hamburger — three staggered lines on a glass button */}
          <button
            onClick={openMobileMenu}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="group xl:hidden grid place-items-center h-10 w-10 rounded-full border border-white/15 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-colors hover:bg-white/[0.14]"
          >
            <span className="flex w-[18px] flex-col items-end gap-[4px]">
              <span className="h-[2px] w-full rounded-full bg-white" />
              <span className="h-[2px] w-3/4 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
              <span className="h-[2px] w-1/2 rounded-full bg-white transition-all duration-300 group-hover:w-full" />
            </span>
          </button>
        </div>
      </div>

      {/* Thin brand-green accent line along the bottom edge */}
      <div className={`h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-opacity duration-500 ${overlay && !scrolled ? "opacity-0" : ""}`} />

      {mobileMenuMounted && createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ clipPath: MENU_CLOSED }}
              animate={{ clipPath: MENU_OPEN }}
              exit={{ clipPath: MENU_CLOSED, transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } }}
              transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
              className="fixed inset-0 z-[150] flex flex-col overflow-hidden bg-[#0b0f17] text-white xl:hidden"
            >
              {/* soft light from the top-right, where the menu grew from */}
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />

              <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
                <Logo />
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:rotate-90 hover:bg-white/[0.14]"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.div
                variants={drawerListVariants}
                initial="hidden"
                animate="visible"
                className="relative flex-1 overflow-y-auto px-4 py-5"
              >
                <motion.p variants={drawerItemVariants} className="px-1 pb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Our Services
                </motion.p>

                {/* Category tiles — tap one to show its services below */}
                <motion.div variants={drawerItemVariants} className="grid grid-cols-2 gap-2.5">
                  {navCategories.map((cat) => {
                    const Icon = categoryIcon(cat.id);
                    const isActive = mobileCat === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setMobileCat(cat.id)}
                        aria-pressed={isActive}
                        className={`relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                          isActive
                            ? "border-primary/40 bg-primary/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_24px_-12px_rgba(124,179,66,0.6)]"
                            : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                        }`}
                      >
                        <span className={`grid h-10 w-10 place-items-center rounded-xl ring-1 transition-colors ${
                          isActive ? "bg-primary text-[#0b0f17] ring-primary" : "bg-white/[0.06] text-primary ring-white/10"
                        }`}>
                          <Icon size={19} />
                        </span>
                        <span>
                          <span className="block text-[14px] font-semibold leading-tight">{cat.label}</span>
                          <span className="mt-0.5 block text-[11px] text-white/45">{cat.services.length} services</span>
                        </span>
                      </button>
                    );
                  })}
                </motion.div>

                {/* Services of the selected category */}
                <motion.div variants={drawerItemVariants} className="mt-3">
                  <AnimatePresence mode="wait" initial={false}>
                    {navCategories
                      .filter((cat) => cat.id === mobileCat)
                      .map((cat) => (
                        <motion.div
                          key={cat.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                        >
                          {cat.services.map((service) => {
                            const isCurrentService = isCurrentPath(pathname, serviceHref(service));
                            return (
                            <Link
                              key={service.slug}
                              href={serviceHref(service)}
                              onClick={closeMobileMenu}
                              aria-current={isCurrentService ? "page" : undefined}
                              className={`group flex items-center gap-3 border-b border-white/[0.06] px-3 py-2.5 transition-colors last:border-b-0 hover:bg-white/[0.06] ${
                                isCurrentService ? "bg-white/[0.06]" : ""
                              }`}
                            >
                              {service.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={service.image} alt="" className="h-8 w-8 shrink-0 rounded-lg bg-white/[0.06] object-contain p-0.5" />
                              ) : (
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06]">
                                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                </span>
                              )}
                              <span className={`flex-1 text-[13px] font-medium group-hover:text-white ${isCurrentService ? "text-white" : "text-white/85"}`}>{service.name}</span>
                              <ChevronRight size={14} className={`transition-transform group-hover:translate-x-0.5 group-hover:text-primary ${isCurrentService ? "text-primary" : "text-white/30"}`} />
                            </Link>
                            );
                          })}
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>

                <motion.p variants={drawerItemVariants} className="px-1 pb-3 pt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Company
                </motion.p>
                <motion.div variants={drawerItemVariants} className="grid grid-cols-3 gap-2">
                  {MOBILE_LINKS.map(({ href, label, icon: LinkIcon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMobileMenu}
                      aria-current={isCurrentPath(pathname, href) ? "page" : undefined}
                      className={`flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-[12px] font-semibold text-white/85 transition-colors hover:border-primary/30 hover:bg-white/[0.08] ${
                        isCurrentPath(pathname, href) ? "border-primary/30 bg-white/[0.08]" : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <LinkIcon size={17} className="text-primary" />
                      {label}
                    </Link>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col gap-2.5 border-t border-white/10 p-4"
              >
                {/* .beauty-btn padding/width come from globals.css, so override inline */}
                <a
                  href="https://salon.citycalls.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="beauty-btn"
                  style={{ width: "100%", justifyContent: "center", padding: "12px 16px", fontSize: "14px" }}
                >
                  <Scissors size={16} className="beauty-btn__icon" />
                  <span className="beauty-btn__text">Beauty Saloon</span>
                  <ArrowUpRight size={15} className="text-[#e9c96a]" />
                </a>
                <a
                  href="https://helpnow.citycalls.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="helpnow-btn flex w-full items-center justify-center gap-2 rounded-full border border-[#E5A800] bg-gradient-to-b from-[#FFCF24] to-[#FDBA00] py-3 text-black shadow-[0_6px_18px_rgba(253,186,0,0.35)]"
                >
                  <span className="text-[15px] tracking-tight">
                    <span className="font-extrabold">Help</span>
                    <span className="font-serif font-bold italic">Now</span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">House Help Services</span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/95">
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
