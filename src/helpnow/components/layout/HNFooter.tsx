import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import callIcon from "@/assets/icons/call.png";
import mapIcon from "@/assets/icons/maps.png";
import playIcon from "@/assets/icons/play.png";
import appleIcon from "@/assets/icons/apple.png";

// Reusable animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: -16, y: 16 },
  show: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

export function HNFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Scroll-driven horizontal parallax (Left to Right movement on mouse scroll)
  const x = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const smoothX = useSpring(x, { stiffness: 90, damping: 25, mass: 0.5 });

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Happy Reviews", href: "#reviews" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Refund & Cancellation", href: "#" },
  ];

  const popularServices = [
    { label: "Dish Washing", href: "/help-now/dish-washing" },
    { label: "Kitchen Cleaning", href: "/help-now#services" },
    { label: "Fan Cleaning", href: "/help-now#services" },
    { label: "Window Cleaning", href: "/help-now#services" },
    { label: "Laundry & Ironing", href: "/help-now#services" },
    { label: "Balcony & Floor Mopping", href: "/help-now#services" },
    { label: "Deep Kitchen Scrubbing", href: "/help-now#services" },
    { label: "Hourly Maid On-Demand", href: "/help-now#services" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-[#0f1115] text-white/80 relative font-sans overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
    >
      {/* Top Accent Line - HelpNow Signature Mustard Gold */}
      <motion.div
        className="h-1 w-full bg-gradient-to-r from-[#f5a623] via-[#fbbf24] to-[#d97706] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.12 }}
      >
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1fr_1fr]">
          {/* 1. Brand & Need Help */}
          <motion.div variants={fadeUp} className="pr-2">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2 text-decoration-none">
                <img
                  src="/logo.png"
                  alt="CityCalls"
                  className="h-8 w-auto object-contain filter brightness-0 invert"
                />
              </a>
              <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#f5a623]/15 text-[#f5a623] border border-[#f5a623]/30">
                HelpNow
              </span>
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-[13.5px] leading-relaxed text-white/80 max-w-sm font-medium"
            >
              Trusted home and maid services in Ghaziabad — verified helpers, transparent
              hourly pricing, doorstep convenience.
            </motion.p>

            {/* Social Icons */}
            <motion.div variants={container} className="mt-6 flex gap-2.5">
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  variants={iconPop}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  aria-label="Social"
                  className="grid place-items-center h-9 w-9 rounded-full border border-white/10 bg-white/[0.03] text-[#f5a623] hover:bg-[#f5a623] hover:border-[#f5a623] hover:text-black transition-all duration-200 cursor-pointer"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </motion.div>

            {/* Need Help Box */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="mt-7 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 flex items-center gap-3.5 w-max pr-6 transition-transform"
            >
              <motion.img
                initial={{ rotate: -15, scale: 0.6, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
                src={callIcon}
                alt="Call"
                className="h-11 w-11 object-contain shrink-0"
              />
              <div>
                <p className="text-white text-[12.5px] font-semibold">Need Help? Call Us</p>
                <a
                  href="tel:+919876543210"
                  className="text-[#f5a623] text-lg font-bold mt-0.5 tracking-wide block hover:underline"
                >
                  +91 98765 43210
                </a>
                <p className="text-white/60 text-[11px] mt-0.5 font-medium">Mon - Sun: 8:00 AM - 8:00 PM</p>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-bold text-[14.5px] tracking-wide uppercase mb-5 relative pb-2.5 inline-block">
              Quick Links
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#f5a623] origin-left"
              />
            </h4>
            <motion.ul variants={container} className="space-y-3.5 text-[13.5px]">
              {quickLinks.map((item) => (
                <motion.li key={item.label} variants={staggerItem}>
                  {item.href.startsWith("#") ? (
                    <a
                      href={item.href}
                      className="text-white/80 hover:text-[#f5a623] transition-colors duration-200 flex items-center gap-2 group w-max"
                    >
                      <ChevronRight
                        size={13}
                        className="text-[#f5a623] transition-transform group-hover:translate-x-1"
                      />
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-white/80 hover:text-[#f5a623] transition-colors duration-200 flex items-center gap-2 group w-max"
                    >
                      <ChevronRight
                        size={13}
                        className="text-[#f5a623] transition-transform group-hover:translate-x-1"
                      />
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* 3. Popular Services */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-bold text-[14.5px] tracking-wide uppercase mb-5 relative pb-2.5 inline-block">
              Popular Services
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#f5a623] origin-left"
              />
            </h4>
            <motion.ul variants={container} className="space-y-3.5 text-[13.5px]">
              {popularServices.map((s) => (
                <motion.li key={s.label} variants={staggerItem}>
                  {s.href.startsWith("/") && !s.href.includes("#") ? (
                    <Link
                      to={s.href}
                      className="text-white/80 hover:text-[#f5a623] transition-colors duration-200 flex items-center gap-2 group w-max"
                    >
                      <ChevronRight
                        size={13}
                        className="text-[#f5a623] transition-transform group-hover:translate-x-1"
                      />
                      {s.label}
                    </Link>
                  ) : (
                    <a
                      href={s.href}
                      className="text-white/80 hover:text-[#f5a623] transition-colors duration-200 flex items-center gap-2 group w-max"
                    >
                      <ChevronRight
                        size={13}
                        className="text-[#f5a623] transition-transform group-hover:translate-x-1"
                      />
                      {s.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* 4. Get in Touch & Download Our App */}
          <motion.div variants={fadeUp} className="relative">
            <h4 className="text-white font-bold text-[14.5px] tracking-wide uppercase mb-5 relative pb-2.5 inline-block">
              Get In Touch
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#f5a623] origin-left"
              />
            </h4>
            <motion.ul variants={container} className="space-y-4 text-[13.5px]">
              <motion.li variants={staggerItem} className="flex gap-2.5 items-start">
                <Phone size={17} className="text-[#f5a623] shrink-0 mt-0.5" />
                <a href="tel:+919876543210" className="text-white/90 hover:text-[#f5a623] transition-colors">
                  +91 98765 43210
                </a>
              </motion.li>
              <motion.li variants={staggerItem} className="flex gap-2.5 items-start">
                <Mail size={17} className="text-[#f5a623] shrink-0 mt-0.5" />
                <a href="mailto:hello@helpnow.in" className="text-white/90 hover:text-[#f5a623] transition-colors">
                  hello@helpnow.in
                </a>
              </motion.li>
              <motion.li variants={staggerItem} className="flex gap-2.5 items-start">
                <MapPin size={17} className="text-[#f5a623] shrink-0 mt-0.5" />
                <span className="text-white/80 leading-relaxed max-w-[200px]">
                  Raj Nagar, Ghaziabad, Uttar Pradesh 201002
                </span>
              </motion.li>
            </motion.ul>

            {/* Download Our App */}
            <motion.div variants={fadeUp} className="mt-7">
              <h4 className="text-white font-bold text-[13px] tracking-wide uppercase mb-4 relative pb-2 inline-block">
                Download Our App
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#f5a623] origin-left"
                />
              </h4>
              <motion.div variants={container} className="flex gap-3">
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="block"
                >
                  <img
                    src={playIcon}
                    alt="Get it on Google Play"
                    className="h-9 w-auto object-contain rounded-md"
                  />
                </motion.a>
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="block"
                >
                  <img
                    src={appleIcon}
                    alt="Download on the App Store"
                    className="h-9 w-auto object-contain rounded-md"
                  />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Subtle background map decoration */}
            <motion.img
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 0.25, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              src={mapIcon}
              alt="Map"
              className="absolute top-[-20px] right-[-50px] w-60 pointer-events-none hidden lg:block object-contain"
            />
          </motion.div>
        </div>

        {/* ── GIANT SIGNATURE SCROLL-DRIVEN "helpnow" WORDMARK (Left to Right Parallax) ── */}
        <div className="w-full overflow-hidden flex justify-center select-none pointer-events-none mt-10 -mb-4 sm:-mb-6 md:-mb-8 leading-[0.75] relative">
          <motion.div
            style={{ x: smoothX }}
            className="flex items-center gap-10 whitespace-nowrap will-change-transform"
          >
            <span
              className="font-black text-center whitespace-nowrap lowercase tracking-tighter select-none"
              style={{
                fontSize: "clamp(90px, 20vw, 300px)",
                color: "rgba(255, 255, 255, 0.055)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              helpnow
            </span>
            <span
              className="font-black text-center whitespace-nowrap lowercase tracking-tighter select-none hidden md:inline-block"
              style={{
                fontSize: "clamp(90px, 20vw, 300px)",
                color: "rgba(255, 255, 255, 0.035)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              helpnow
            </span>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="border-t border-white/[0.07] mt-3"
        >
          <div className="pt-5 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/70">
            <p>
              © {new Date().getFullYear()} <strong className="text-white">HelpNow</strong> — A Part of CityCalls. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#f5a623] transition-colors">
                Privacy Policy
              </a>
              <span className="w-px h-3 bg-[#f5a623]" />
              <a href="#" className="hover:text-[#f5a623] transition-colors">
                Terms & Conditions
              </a>
              <span className="w-px h-3 bg-[#f5a623]" />
              <a href="#" className="hover:text-[#f5a623] transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
