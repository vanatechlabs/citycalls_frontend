import { resolveWebsiteImageUrl } from "@/lib/api/cityCallsHome";

// The /about page from Admin → Website Section → About Page. Re-fetched at
// most once a minute; anything missing falls back to the original content.
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1").replace(/\/$/, "");
const REVALIDATE_SECONDS = 60;

export interface AboutHeroData {
  headingLine1: string;
  headingLine2: string;
  highlight: string;
  description: string;
  points: string[];
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  image: string;
  imageAlt: string;
}

export interface AboutImageData {
  image: string;
  imageAlt: string;
}

export interface AboutStoryData {
  eyebrow: string;
  heading: string;
  highlight: string;
  paragraphOne: string;
  paragraphTwo: string;
  missionTitle: string;
  missionText: string;
  teamTitle: string;
  teamText: string;
  images: AboutImageData[];
}

export interface AboutParallaxData {
  image: string;
  imageAlt: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface AboutListHeadingData {
  eyebrow: string;
  heading: string;
}

export interface AboutValueData {
  _id: string;
  title: string;
  description: string;
  // lucide-react icon name, e.g. "ShieldCheck".
  icon: string;
}

export interface AboutMilestoneData {
  _id: string;
  year: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
  image: string;
  imageAlt: string;
}

export interface AboutPageData {
  hero: AboutHeroData;
  story: AboutStoryData;
  parallax: AboutParallaxData;
  values: { section: AboutListHeadingData; items: AboutValueData[] };
  journey: { section: AboutListHeadingData; items: AboutMilestoneData[] };
}

// ─── Original content (shown if the API can't be reached) ──────────────────
export const aboutHeroDefaults: AboutHeroData = {
  headingLine1: "Building Trust,",
  headingLine2: "One Service at a Time",
  highlight: "Service",
  description:
    "CityCalls is your trusted partner for all home services in Ghaziabad. We connect you with verified, skilled and background-checked professionals who deliver quality work with honesty and transparency.",
  points: ["Verified & Experienced Professionals", "On-Time at your Doorstep", "Transparent Pricing", "Dedicated Customer Support"],
  primaryButtonText: "Explore Services",
  primaryButtonLink: "/",
  secondaryButtonText: "Contact Us",
  secondaryButtonLink: "/contact",
  image: "/assets/Banner/about.png",
  imageAlt: "Smiling CityCalls technician in a green uniform — trusted by 10,000+ happy customers",
};

export const aboutStoryDefaults: AboutStoryData = {
  eyebrow: "Our Story",
  heading: "Rebuilding trust in home services",
  highlight: "home services",
  paragraphOne:
    "CityCalls was born in a 1BHK in Vaishali after our founder had a fridge go down for the third time in a month. The local repair guys kept making it worse. The big-brand app never showed up. Something had to change.",
  paragraphTwo:
    "We believe home services can be world-class without the world-class price tag, if you focus obsessively on the basics: verified people, honest pricing, and showing up on time.",
  missionTitle: "Our Mission",
  missionText: "Make every service call feel like calling a friend who happens to be an expert.",
  teamTitle: "Our Team",
  teamText: "We're a team of 40+ people in Ghaziabad — customer support, technicians, trainers, engineers.",
  images: [
    { image: "/assets/Services/s1.png", imageAlt: "CityCalls technician repairing a refrigerator at a customer's home" },
    { image: "/assets/Services/s2.png", imageAlt: "CityCalls technician servicing a wall-mounted split AC" },
    { image: "/assets/Services/s3.png", imageAlt: "CityCalls technician repairing a front-load washing machine" },
    { image: "/assets/Services/s4.png", imageAlt: "CityCalls technician fixing the circuit board of an LED TV" },
  ],
};

export const aboutParallaxDefaults: AboutParallaxData = {
  image: "/assets/Banner/cara2.png",
  imageAlt: "CityCalls pest control expert spraying treatment along a living room wall",
  status: "ACTIVE",
};

export const aboutValuesDefaults: AboutPageData["values"] = {
  section: { eyebrow: "What we stand for", heading: "Four values, non-negotiable." },
  items: [
    { _id: "v1", icon: "ShieldCheck", title: "Trust first", description: "Every pro is verified before their first job — and re-verified every year." },
    { _id: "v2", icon: "Heart", title: "Customer-obsessed", description: "We track every rating, every complaint, every callback. And we act." },
    { _id: "v3", icon: "Users", title: "Fair to our pros", description: "We take a smaller cut than any competitor, so our pros earn more per job." },
    { _id: "v4", icon: "Award", title: "Quality without compromise", description: "We'd rather turn down a job than send an untrained person to your home." },
  ],
};

export const aboutJourneyDefaults: AboutPageData["journey"] = {
  section: { eyebrow: "Our Story & Growth", heading: "Our Journey" },
  items: [
    {
      _id: "m1", year: "2022", title: "The Beginning", tag: "Milestone 01", icon: "Flag",
      description: "Started CityCalls with a mission to simplify home services across all households.",
      image: "/assets/Services/s1.png", imageAlt: "CityCalls technician repairing a refrigerator — where our journey began",
    },
    {
      _id: "m2", year: "2023", title: "Growing Community", tag: "Milestone 02", icon: "Users",
      description: "Reached 1,000+ happy customers and rapidly expanded our service categories.",
      image: "/assets/Services/s2.png", imageAlt: "CityCalls technician servicing a split AC for a growing customer base",
    },
    {
      _id: "m3", year: "2024", title: "Wider Reach", tag: "Milestone 03", icon: "Building2",
      description: "Onboarded top-rated verified professionals serving thousands of doorstep requests.",
      image: "/assets/Services/s3.png", imageAlt: "Verified CityCalls professional repairing a washing machine at the doorstep",
    },
    {
      _id: "m4", year: "2025", title: "Trusted by Many", tag: "Milestone 04", icon: "Trophy",
      description: "Crossed 10,000+ completed orders with glowing 5-star customer reviews.",
      image: "/assets/Services/s4.png", imageAlt: "CityCalls technician repairing an LED TV for a 5-star rated service",
    },
    {
      _id: "m5", year: "2026", title: "Scaling Nationwide", tag: "Milestone 05", icon: "Rocket",
      description: "Expanding into major new cities with automated booking and instant dispatch.",
      image: "/assets/Services/s5.png", imageAlt: "CityCalls technician repairing a built-in microwave oven",
    },
    {
      _id: "m6", year: "2027", title: "The Road Ahead", tag: "Future Vision", icon: "Star",
      description: "Redefining home maintenance with AI scheduling and unmatched reliability.",
      image: "/assets/Services/s6.png", imageAlt: "CityCalls technician servicing a bathroom geyser",
    },
  ],
};

const fallback: AboutPageData = {
  hero: aboutHeroDefaults,
  story: aboutStoryDefaults,
  parallax: aboutParallaxDefaults,
  values: aboutValuesDefaults,
  journey: aboutJourneyDefaults,
};

const img = (image: string) => (image ? resolveWebsiteImageUrl(image) : "");

// Never throws.
export async function fetchAboutPage(): Promise<AboutPageData> {
  try {
    const response = await fetch(`${API_BASE_URL}/public/websites/city-calls/about-page`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error(`status ${response.status}`);
    const { data } = (await response.json()) as { data: AboutPageData };
    return {
      hero: { ...aboutHeroDefaults, ...data.hero, image: img(data.hero?.image ?? aboutHeroDefaults.image) },
      story: {
        ...aboutStoryDefaults,
        ...data.story,
        images: (data.story?.images ?? aboutStoryDefaults.images).map((i) => ({ ...i, image: img(i.image) })),
      },
      parallax: { ...aboutParallaxDefaults, ...data.parallax, image: img(data.parallax?.image ?? aboutParallaxDefaults.image) },
      values: {
        section: { ...aboutValuesDefaults.section, ...data.values?.section },
        items: Array.isArray(data.values?.items) ? data.values.items : aboutValuesDefaults.items,
      },
      journey: {
        section: { ...aboutJourneyDefaults.section, ...data.journey?.section },
        items: Array.isArray(data.journey?.items)
          ? data.journey.items.map((m) => ({ ...m, image: img(m.image) }))
          : aboutJourneyDefaults.items,
      },
    };
  } catch {
    return fallback;
  }
}
