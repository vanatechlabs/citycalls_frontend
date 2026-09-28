"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  return (
    <section className="bg-background py-24">
      <div className="container-x text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to see the difference?</h2>
        <p className="text-muted-foreground text-lg mb-8">
          Book any service and feel it for yourself. Zero commitment.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground hover:bg-primary-dark px-8 py-4 text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
        >
          Explore services
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
