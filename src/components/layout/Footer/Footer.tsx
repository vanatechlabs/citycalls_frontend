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
import { DEFAULT_SOCIAL_LINKS, type PublicSocialLinks } from "@/lib/api/socialLinks";
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

// Frosted-glass treatment for the social icons and the giant wordmark.
const GLASS_STYLES = `
  .footer-glass-icon {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.03));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      inset 0 -1px 0 rgba(255, 255, 255, 0.06),
      0 8px 20px -8px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(14px) saturate(160%);
    -webkit-backdrop-filter: blur(14px) saturate(160%);
    transition: border-color 0.3s, box-shadow 0.3s, background 0.3s, color 0.3s;
  }
  /* glossy top half */
  .footer-glass-icon::before {
    content: "";
    position: absolute;
    inset: 0 0 50% 0;
    border-radius: 9999px 9999px 0 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.22), transparent);
    pointer-events: none;
  }
  /* light sweep on hover */
  .footer-glass-icon::after {
    content: "";
    position: absolute;
    inset: -20%;
    background: linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%);
    transform: translateX(-120%);
    transition: transform 0.7s ease;
    pointer-events: none;
  }
  .footer-glass-icon:hover {
    color: #fff;
    border-color: rgba(110, 190, 38, 0.6);
    background: linear-gradient(145deg, rgba(110, 190, 38, 0.45), rgba(110, 190, 38, 0.12));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.45),
      0 0 0 4px rgba(110, 190, 38, 0.12),
      0 12px 26px -8px rgba(110, 190, 38, 0.65);
  }
  .footer-glass-icon:hover::after { transform: translateX(120%); }

  /* Social icons: the green "hover" look is their normal look; hovering
     brightens the glow a little more. */
  .footer-glass-icon--social {
    color: #fff;
    border-color: rgba(110, 190, 38, 0.6);
    background: linear-gradient(145deg, rgba(110, 190, 38, 0.45), rgba(110, 190, 38, 0.12));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.45),
      0 0 0 4px rgba(110, 190, 38, 0.12),
      0 12px 26px -8px rgba(110, 190, 38, 0.65);
  }
  .footer-glass-icon--social:hover {
    border-color: rgba(110, 190, 38, 0.85);
    background: linear-gradient(145deg, rgba(110, 190, 38, 0.6), rgba(110, 190, 38, 0.2));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      0 0 0 5px rgba(110, 190, 38, 0.2),
      0 14px 30px -8px rgba(110, 190, 38, 0.8);
  }

  /* Column headings: frosted glass pill with a glowing brand dot. */
  .footer-glass-chip {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.025));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 rgba(255, 255, 255, 0.05),
      0 10px 24px -12px rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(14px) saturate(160%);
    -webkit-backdrop-filter: blur(14px) saturate(160%);
  }
  .footer-glass-chip::before {
    content: "";
    position: absolute;
    inset: 0 0 50% 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.14), transparent);
    pointer-events: none;
  }
  .footer-glass-chip-dot {
    position: relative;
    height: 7px;
    width: 7px;
    flex-shrink: 0;
    border-radius: 9999px;
    background: #6ebe26;
    box-shadow: 0 0 0 3px rgba(110, 190, 38, 0.18), 0 0 10px rgba(110, 190, 38, 0.9);
  }

  /* Glass lettering: translucent frosted fill, bright rim, slow light sweep. */
  .footer-glass-text {
    color: transparent;
    background-image:
      linear-gradient(110deg, transparent 42%, rgba(255, 255, 255, 0.22) 50%, transparent 58%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.05) 55%, rgba(255, 255, 255, 0.015) 100%);
    background-size: 250% 100%, 100% 100%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.16);
    filter: drop-shadow(0 1px 0 rgba(255, 255, 255, 0.08)) drop-shadow(0 18px 30px rgba(0, 0, 0, 0.55));
    animation: footer-glass-sweep 7s ease-in-out infinite;
  }
  .footer-glass-text.is-faint {
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.09);
    opacity: 0.6;
  }
  @keyframes footer-glass-sweep {
    0%, 15% { background-position: 130% 0, 0 0; }
    65%, 100% { background-position: -130% 0, 0 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .footer-glass-text { animation: none; }
  }
`;

function GlassHeading({ children, small = false }: { children: React.ReactNode; small?: boolean }) {
  return (
    <h4
      className={`footer-glass-chip mb-6 px-4 py-2 font-semibold uppercase tracking-wide text-white ${
        small ? "text-[12px]" : "text-[13.5px]"
      }`}
    >
      <span className="footer-glass-chip-dot" />
      <span className="relative">{children}</span>
    </h4>
  );
}

export function Footer({ links = DEFAULT_SOCIAL_LINKS }: { links?: PublicSocialLinks }) {
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Scroll-driven horizontal parallax (Left to Right movement on mouse scroll)
  const x = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);
  const smoothX = useSpring(x, { stiffness: 90, damping: 25, mass: 0.5 });

  // Admin → SEO Section → Social Media; empty fields are hidden.
  const socials = [
    { label: "Facebook", url: links.facebook, icon: Facebook },
    { label: "Instagram", url: links.instagram, icon: Instagram },
    { label: "X (Twitter)", url: links.twitter, icon: Twitter },
    { label: "YouTube", url: links.youtube, icon: Youtube },
    { label: "LinkedIn", url: links.linkedin, icon: Linkedin },
  ].filter((social): social is typeof social & { url: string } => Boolean(social.url?.trim()));

  return (
    <footer
      ref={footerRef}
      className="bg-[#030a0c] text-white/80 relative font-sans overflow-hidden"
    >
      <style>{GLASS_STYLES}</style>

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
            {/* Bigger logo; the smaller gaps around it keep the footer height the same */}
            <Logo large className="-mt-5" />
            <motion.p
              variants={fadeUp}
              className="mt-2 text-[14px] leading-relaxed text-white/90"
            >
              Trusted home services in Ghaziabad — verified technicians, transparent pricing,
              doorstep convenience.
            </motion.p>

            {socials.length > 0 && (
              <motion.div
                variants={container}
                className="mt-8 flex gap-3"
              >
                {socials.map(({ label, url, icon: Icon }) => (
                  <motion.a
                    key={label}
                    variants={iconPop}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer-glass-icon footer-glass-icon--social grid place-items-center h-10 w-10 rounded-full"
                  >
                    <Icon size={18} className="relative" />
                  </motion.a>
                ))}
              </motion.div>
            )}

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
            <GlassHeading>Quick Links</GlassHeading>
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
            <GlassHeading>Popular Services</GlassHeading>
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
            <GlassHeading>Get In Touch</GlassHeading>
            <motion.ul variants={container} className="space-y-5 text-[14px]">
              <motion.li variants={staggerItem} className="group flex gap-3 items-center">
                <span className="footer-glass-icon grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8fd14f]">
                  <Phone size={16} className="relative" />
                </span>
                <span className="text-white/90">+91 74288 08884</span>
              </motion.li>
              <motion.li variants={staggerItem} className="group flex gap-3 items-center">
                <span className="footer-glass-icon grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8fd14f]">
                  <Mail size={16} className="relative" />
                </span>
                <span className="text-white/90">hello@citycalls.in</span>
              </motion.li>
              <motion.li variants={staggerItem} className="group flex gap-3 items-center">
                <span className="footer-glass-icon grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8fd14f]">
                  <MapPin size={16} className="relative" />
                </span>
                <span className="text-white/90 leading-relaxed max-w-[200px]">
                  Raj Nagar, Ghaziabad, Uttar Pradesh 201002
                </span>
              </motion.li>
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-8">
              <GlassHeading small>Download Our App</GlassHeading>
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
        {/* Tight line height keeps the top close, but the bottom padding (~the
            font's descender depth) stops the clip from cutting the tail off the "y". */}
        <div
          className="w-full overflow-hidden flex justify-center select-none pointer-events-none mt-10 leading-[0.75] relative"
          style={{ paddingBottom: "clamp(22px, 4.8vw, 72px)" }}
        >
          <motion.div
            style={{ x: smoothX }}
            className="flex items-center gap-10 whitespace-nowrap will-change-transform"
          >
            <span
              className="footer-glass-text font-black text-center whitespace-nowrap lowercase tracking-tighter select-none"
              style={{
                fontSize: "clamp(90px, 20vw, 300px)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              citycalls
            </span>
            <span
              className="footer-glass-text is-faint font-black text-center whitespace-nowrap lowercase tracking-tighter select-none hidden md:inline-block"
              style={{
                fontSize: "clamp(90px, 20vw, 300px)",
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
            <p>© {new Date().getFullYear()} Citytimes India Co. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <span className="w-px h-3 bg-[#6ebe26]" />
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
