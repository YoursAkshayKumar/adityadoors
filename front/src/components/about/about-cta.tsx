"use client";

import { Button } from "antd";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
// import { Button } from "@/components/ui/button"
import { Phone, Mail, ArrowRight } from "lucide-react";

export default function AboutCTA() {
  const [sectionRef, isVisible] = useScrollAnimation();

  const handleCallUs = () => {
    window.location.href = "tel:+919997297123";
  };

  const handleEmailUs = () => {
    window.location.href = "mailto:info@adityadoors.in";
  };

  const handleVisitShowroom = () => {
    // Navigate to contact page or open maps
    if (typeof window !== "undefined") {
      const contactMap = document.getElementById("contact-map");
      if (contactMap) {
        // If on contact page, scroll to map
        contactMap.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        // Navigate to contact page
        window.location.href = "/contacts";
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#2a1c16] text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Work <span className="text-gold">With Us?</span>
            </h2>
            <p className="text-base md:text-lg text-white mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their
              spaces with Aditya Doors. Let us discuss your next project today.
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <Button
              onClick={handleCallUs}
              className="bg-gold border border-white text-white hover:bg-gold-dark px-6 md:px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg w-full sm:w-auto"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us
            </Button>
            <Button
              onClick={handleEmailUs}
              className="bg-white border border-gold text-gold hover:bg-gray-50 px-6 md:px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg w-full sm:w-auto"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
            <Button
              onClick={handleVisitShowroom}
              className="bg-white border border-gold text-gold hover:bg-gray-50 px-6 md:px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg w-full sm:w-auto"
            >
              <span>Visit Showroom</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
