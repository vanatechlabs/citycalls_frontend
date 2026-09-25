"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion";
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
import { Logo } from "@/components/layout/Logo/Logo";
import { allServices } from "@/data/services";
const callIcon = "/assets/icons/call.png";
const mapIcon = "/assets/icons/maps.png";
const playIcon = "/assets/icons/play.png";
const appleIcon = "/assets/icons/apple.png";

// Reusable animation variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, x: -20, y: 20 },
  show: { opacity: 1, x: 0, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -180 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Scroll-driven horizontal parallax (Left to Right movement on mouse scroll)
  const x = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const smoothX = useSpring(x, { stiffness: 90, damping: 25, mass: 0.5 });

  return (
    <footer
      ref={footerRef}
      className="bg-[#030a0c] text-white/80 relative font-sans overflow-hidden"
    >
      {/* Top accent line */}
      <motion.div
        className="h-1 w-full bg-[#6ebe26] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <motion.div
        className="container-x pt-10 pb-0"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          {/* Brand */}
          <motion.div variants={fadeUp} className="pr-4">
            <Logo />
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[14px] leading-relaxed text-white/90"
            >
              Trusted home services in Ghaziabad — verified technicians, transparent pricing,
              doorstep convenience.
            </motion.p>

            <motion.div
              variants={container}
              className="mt-8 flex gap-3"
            >
              {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  variants={iconPop}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  aria-label="Social"
                  className="grid place-items-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.02] text-[#6ebe26] hover:bg-[#6ebe26] hover:border-[#6ebe26] hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>

            {/* Need Help Box */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-4 flex items-center gap-4 w-max pr-8 transition-transform"
            >
              <motion.img
                initial={{ rotate: -15, scale: 0.6, opacity: 0 }}
                whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.2 }}
                src={callIcon}
                alt="Call"
                className="h-12 w-12 object-contain shrink-0"
              />
              <div>
                <p className="text-white text-[13px] font-medium">Need Help? Call Us</p>
                <p className="text-[#6ebe26] text-xl font-semibold mt-0.5 tracking-wide">+91 74288 08884</p>
                <p className="text-white/60 text-[11px] mt-1">Mon - Sun: 8:00 AM - 8:00 PM</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-semibold text-[15px] tracking-wide uppercase mb-6 relative pb-3 inline-block">
              Quick Links
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#6ebe26] origin-left"
              />
            </h4>
            <motion.ul variants={container} className="space-y-4 text-[14px]">
              {[
                ["Home", "/"],
                ["About Us", "/about"],
                ["Blogs", "/blogs"],
                ["Contact Us", "/contact"],
                ["Terms & Conditions", "/terms"],
                ["Privacy Policy", "/privacy"],
              ].map(([label, href]) => (
                <motion.li key={href} variants={staggerItem}>
                  <Link
                    href={href as string}
                    className="text-white/90 hover:text-[#6ebe26] transition-all duration-200 flex items-center gap-2 group w-max"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#6ebe26] transition-transform group-hover:translate-x-1"
                    />
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Popular Services */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-semibold text-[15px] tracking-wide uppercase mb-6 relative pb-3 inline-block">
              Popular Services
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#6ebe26] origin-left"
              />
            </h4>
            <motion.ul variants={container} className="space-y-4 text-[14px]">
              {allServices.slice(0, 8).map((s) => (
                <motion.li key={s.slug} variants={staggerItem}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/90 hover:text-[#6ebe26] transition-all duration-200 flex items-center gap-2 group w-max"
                  >
                    <ChevronRight
                      size={14}
                      className="text-[#6ebe26] transition-transform group-hover:translate-x-1"
                    />
                    {s.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Get in Touch */}
          <motion.div variants={fadeUp} className="relative">
            <h4 className="text-white font-semibold text-[15px] tracking-wide uppercase mb-6 relative pb-3 inline-block">
              Get In Touch
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#6ebe26] origin-left"
              />
            </h4>
            <motion.ul variants={container} className="space-y-5 text-[14px]">
              <motion.li variants={staggerItem} className="flex gap-3 items-start">
                <Phone size={18} className="text-[#6ebe26] shrink-0 mt-0.5" />
                <span className="text-white/90">+91 74288 08884</span>
              </motion.li>
              <motion.li variants={staggerItem} className="flex gap-3 items-start">
                <Mail size={18} className="text-[#6ebe26] shrink-0 mt-0.5" />
                <span className="text-white/90">hello@citycalls.in</span>
              </motion.li>
              <motion.li variants={staggerItem} className="flex gap-3 items-start">
                <MapPin size={18} className="text-[#6ebe26] shrink-0 mt-0.5" />
                <span className="text-white/90 leading-relaxed max-w-[200px]">
                  Raj Nagar, Ghaziabad, Uttar Pradesh 201002
                </span>
              </motion.li>
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8">
              <h4 className="text-white font-semibold text-[13px] tracking-wide uppercase mb-6 relative pb-3 inline-block">
                Download Our App
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute left-0 bottom-0 h-[2px] w-8 bg-[#6ebe26] origin-left"
                />
              </h4>
              <motion.div variants={container} className="flex gap-3">
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="block"
                >
                  <img src={playIcon} alt="Get it on Google Play" className="h-10 w-auto object-contain" />
                </motion.a>
                <motion.a
                  variants={staggerItem}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="block"
                >
                  <img src={appleIcon} alt="Download on the App Store" className="h-10 w-auto object-contain" />
                </motion.a>
              </motion.div>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 0.4, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              src={mapIcon}
              alt="Map"
              className="absolute top-[-20px] right-[-60px] w-64 pointer-events-none hidden lg:block object-contain"
            />
          </motion.div>
        </div>

        {/* ── GIANT SIGNATURE SCROLL-DRIVEN "citycalls" WORDMARK (Left to Right Parallax) ── */}
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
              citycalls
            </span>
            <span
              className="font-black text-center whitespace-nowrap lowercase tracking-tighter select-none hidden md:inline-block"
              style={{
                fontSize: "clamp(90px, 20vw, 300px)",
                color: "rgba(255, 255, 255, 0.035)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              citycalls
            </span>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-3 border-t border-white/[0.06]"
        >
          <div className="pt-5 pb-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13.5px] text-white">
            <p>© {new Date().getFullYear()} CityCalls. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="w-px h-3 bg-[#6ebe26]" />
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
