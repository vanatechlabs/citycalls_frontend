"use client";

import { useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookmarkCheck, BookmarkPlus, Check, Share2 } from "lucide-react";

// Bar along the top of the page that fills as the article is read.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div aria-hidden className="fixed left-0 top-0 z-[150] h-1 bg-gradient-to-r from-primary-dark to-primary" style={{ width }} />;
}

// Saved articles live in this browser only.
const SAVED_KEY = "citycalls:saved-blogs";
const SAVED_EVENT = "citycalls:saved-blogs-change";

function readSaved(): string {
  try {
    return localStorage.getItem(SAVED_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function subscribeSaved(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SAVED_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SAVED_EVENT, onChange);
  };
}

// "Share Article" (phone share sheet, or copies the link) and "Save for Later".
export function ArticleActions({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const savedJson = useSyncExternalStore(subscribeSaved, readSaved, () => "[]");
  const saved = (() => {
    try {
      return (JSON.parse(savedJson) as string[]).includes(slug);
    } catch {
      return false;
    }
  })();

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Cancelled or not allowed — fall back to copying the link.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing more to do.
    }
  };

  const toggleSaved = () => {
    try {
      const list = JSON.parse(readSaved()) as string[];
      const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(SAVED_EVENT));
    } catch {
      // Storage unavailable (private mode) — button just won't stick.
    }
  };

  return (
    <div className="mb-10 flex flex-wrap items-center justify-start gap-4">
      <button
        type="button"
        onClick={() => void share()}
        className="flex items-center gap-2 rounded-lg bg-primary-dark px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
      >
        {copied ? <Check size={16} /> : <Share2 size={16} />}
        {copied ? "Link Copied!" : "Share Article"}
      </button>
      <button
        type="button"
        onClick={toggleSaved}
        aria-pressed={saved}
        className={`flex items-center gap-2 rounded-lg border-2 px-6 py-2.5 text-sm font-bold transition-all ${
          saved ? "border-primary-dark bg-primary-dark/5 text-primary-dark" : "border-gray-200 text-gray-700 hover:border-primary-dark hover:text-primary-dark"
        }`}
      >
        {saved ? <BookmarkCheck size={16} /> : <BookmarkPlus size={16} />}
        {saved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}
