import { AboutHero } from "@/components/about/AboutHero/AboutHero";
import { AboutStory } from "@/components/about/AboutStory/AboutStory";
import { AboutValues } from "@/components/about/AboutValues/AboutValues";
import { AboutStats } from "@/components/about/AboutStats/AboutStats";
import { AboutParallax } from "@/components/about/AboutParallax/AboutParallax";
import { WhyChooseUs } from "@/components/home/WhyChooseUs/WhyChooseUs";
import { AboutJourney } from "@/components/about/AboutJourney/AboutJourney";

function AboutPage() {
  return (
    <main className="overflow-hidden">
      <AboutHero />
      <AboutStory />
      <WhyChooseUs />
      <AboutValues />
      <AboutParallax />
      <AboutJourney />
    </main>
  );
}

export default AboutPage;
