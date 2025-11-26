import AboutHero from "@/components/about/about-hero";
import AboutStory from "@/components/about/about-story";
import AboutValues from "../../components/about/about-values";
import AboutStats from "../../components/about/about-stats";
import AboutTeam from "../../components/about/about-team";
import AboutTestimonials from "../../components/about/about-testimony";
import AboutFAQ from "@/components/about/about-faq";
import AboutCTA from "@/components/about/about-cta";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutStats />
      {/* <AboutTeam /> */}
      <AboutTestimonials />
      <AboutFAQ />
      <AboutCTA />
    </div>
  );
}
