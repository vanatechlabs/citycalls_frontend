"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { fetchCityCallsFaqs, resolveWebsiteImageUrl, type PublicFaq, type PublicFaqSection } from "@/lib/api/cityCallsHome";

// Shown until Admin → Website Section → FAQ loads (or if it can't).
const fallbackSection: PublicFaqSection = {
  subheading: "Support & Info",
  heading: "Frequently Asked Questions",
  highlightedWord: "Questions",
  description: "Find answers to common inquiries about booking, services, and policies with CityCalls.",
};

const fallbackFaqs: PublicFaq[] = [
  { _id: "f1", sortOrder: 1, question: "How quickly can I get a technician?", answer: "For most services in Ghaziabad, we dispatch a pro within 60–90 minutes of booking. You can also schedule a specific slot up to 7 days out.", image: "/assets/Services/s1.png", altText: "CityCalls technician arriving for a home service visit" },
  { _id: "f2", sortOrder: 2, question: "Do I pay before or after the service?", answer: "Always after. You inspect the work, then pay by UPI, card, wallet or cash.", image: "/assets/Banner/cara1.png", altText: "Customer paying after a completed CityCalls service" },
  { _id: "f3", sortOrder: 3, question: "Is there a service warranty?", answer: "Yes. All repairs come with a 30-day service warranty on labour. Spare parts carry the manufacturer's warranty.", image: "/assets/Services/s2.png", altText: "Appliance repaired with a 30-day service warranty" },
  { _id: "f4", sortOrder: 4, question: "Are the technicians background-verified?", answer: "Every professional is police-verified, trained by CityCalls, and continuously rated by customers. Low-rated pros are removed from the platform.", image: "/assets/Services/s3.png", altText: "Verified CityCalls professional at work" },
  { _id: "f5", sortOrder: 5, question: "What if I'm not happy with the service?", answer: "Raise a complaint from your booking page. We'll send another pro at no cost or refund the visit charge — your call.", image: "/assets/Banner/cara2.png", altText: "CityCalls support resolving a customer complaint" },
  { _id: "f6", sortOrder: 6, question: "Do you serve areas outside Ghaziabad?", answer: "Right now we're focused on Ghaziabad. Noida, Delhi and Meerut are on our roadmap for 2026.", image: "/assets/Services/s4.png", altText: "CityCalls service area across Ghaziabad" },
];

// Splits the heading so the admin-chosen word shows in green.
function HighlightedHeading({ heading, word }: { heading: string; word: string }) {
  const index = word ? heading.indexOf(word) : -1;
  if (index === -1) return <>{heading}</>;
  return (
    <>
      {heading.slice(0, index)}
      <span className="text-primary">{word}</span>
      {heading.slice(index + word.length)}
    </>
  );
}

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [section, setSection] = useState<PublicFaqSection>(fallbackSection);
  const [faqs, setFaqs] = useState<PublicFaq[]>(fallbackFaqs);

  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsFaqs(controller.signal)
      .then((data) => {
        if (data?.section) setSection({ ...fallbackSection, ...data.section });
        if (Array.isArray(data?.faqs)) {
          setFaqs(data.faqs);
          setActiveIndex(data.faqs.length ? 0 : null);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled FAQs because the CMS FAQs could not be loaded.");
      });
    return () => controller.abort();
  }, []);

  // Nothing active in admin → hide the section.
  if (faqs.length === 0) return null;
  const shown = faqs[activeIndex ?? 0] ?? faqs[0];

  return (
    <section className="pt-12 pb-4 bg-white border-t border-border relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-dark/5 rounded-full blur-[80px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container-x mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-primary-dark" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary-dark">
              {section.subheading}
            </span>
            <div className="h-px w-8 bg-primary-dark" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-serif font-bold text-ink leading-tight">
            <HighlightedHeading heading={section.heading} word={section.highlightedWord} />
          </h2>
          {section.description && (
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-[14px] md:text-[15px] leading-relaxed">
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT COLUMN: Accordions */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`group transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? "border-primary/20 bg-white shadow-sm border-l-4 border-l-primary"
                      : "border-border hover:border-gray-200 bg-white"
                  }`}
                  style={{ borderRadius: '8px' }}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive ? "bg-primary text-primary-foreground" : "bg-gray-50 text-gray-400"
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className={`font-bold text-[15px] transition-colors duration-300 ${isActive ? "text-primary" : "text-ink"}`}>
                        {item.question}
                      </span>
                    </div>
                    <div className={`shrink-0 w-6 h-6 border rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-primary/10 border-primary text-primary" : "bg-white border-gray-200 text-gray-400"
                    }`}>
                      {isActive ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-5 pt-1 pl-[4.25rem]">
                          <div className="space-y-3">
                            <p className="text-muted-foreground leading-relaxed text-[14px]">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Synced Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 order-first lg:order-last mb-8 lg:mb-0">
            <div className="relative aspect-[4/3] bg-white border-2 border-gray-100 overflow-hidden shadow-md rounded-2xl p-2">
              <div className="w-full h-full relative rounded-xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex ?? "none"}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 bg-gray-50"
                  >
                    {shown?.image && (
                      <img src={resolveWebsiteImageUrl(shown.image)} alt={shown.altText || shown.question} className="w-full h-full object-cover" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Corner decor */}
              <div className="absolute top-4 left-4 w-5 h-5 border-l-2 border-t-2 border-white/50 z-10 pointer-events-none rounded-tl" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-r-2 border-b-2 border-white/50 z-10 pointer-events-none rounded-br" />
            </div>

            {/* CTA below image */}
            <div className="mt-4 p-5 bg-white border border-gray-100 shadow-sm text-center rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
              <p className="text-ink text-[13px] font-medium mb-3 relative z-10">
                &ldquo;Still have questions about our services?&rdquo;
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary text-primary-foreground px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary-dark transition-all shadow-md rounded-lg relative z-10"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
