"use client";

import { useEffect, useState } from "react";
import { HowItWorks as HowItWorksStory, type HowItWorksStep } from "@/components/shared/HowItWorks/HowItWorks";
import { fetchCityCallsHowItWorks, resolveWebsiteImageUrl, type PublicHowItWorksSection } from "@/lib/api/cityCallsHome";

// Home page "How it works" — heading and steps come from
// Admin → Website Section → How It Works. The shared component's own
// defaults show until the data loads (or if it can't).

const pad = (n: number) => String(n).padStart(2, "0");

export function HowItWorks() {
  const [section, setSection] = useState<PublicHowItWorksSection | null>(null);
  const [steps, setSteps] = useState<HowItWorksStep[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchCityCallsHowItWorks(controller.signal)
      .then((data) => {
        if (data?.section) setSection(data.section);
        if (Array.isArray(data?.steps)) {
          setSteps(
            data.steps.map((s, i) => ({
              badge: `Step ${pad(i + 1)}`,
              title: s.title,
              description: s.description,
              image: s.image ? resolveWebsiteImageUrl(s.image) : undefined,
              imageAlt: s.imageAlt || undefined,
              icon: s.icon,
            }))
          );
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("Using bundled How It Works steps because the CMS data could not be loaded.");
      });
    return () => controller.abort();
  }, []);

  if (steps && steps.length === 0) return null;

  return (
    <HowItWorksStory
      {...(section
        ? { eyebrow: section.eyebrow, title: section.heading, highlight: section.highlight, description: section.description }
        : {})}
      {...(steps ? { steps } : {})}
    />
  );
}
