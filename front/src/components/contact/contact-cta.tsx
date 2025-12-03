"use client";

import { Button } from "antd";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
// import { Button } from "@/components/ui/button"
import { Phone, Calendar } from "lucide-react";

export default function ContactCTA() {
  const [sectionRef, isVisible] = useScrollAnimation();

  const handleCallNow = () => {
    window.location.href = "tel:+919997297123";
  };

  const handleScheduleVisit = () => {
    // Scroll to contact form on the contact page
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#2a1c16] text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Call to Action Section */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase">
              READY TO GET <span className="text-gold">STARTED</span>
            </h2>
            <p className="text-base md:text-lg text-white mb-12 max-w-2xl mx-auto">
              Do not wait any longer. Contact us today for a free consultation
              and transform your space with our premium Home Furnishing solutions.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <Button
              onClick={handleCallNow}
              className="bg-gold border border-white text-white hover:bg-gold-dark px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg w-full sm:w-auto"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button
              onClick={handleScheduleVisit}
              className="bg-white border border-gold text-gold hover:bg-gray-50 px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg w-full sm:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Visit
            </Button>
          </div>

          {/* Why Choose Section */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Why Choose Aditya Doors?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#3c2a21] rounded-lg p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  25+
                </div>
                <div className="text-white text-base md:text-lg">
                  Years of Experience
                </div>
              </div>
              <div className="bg-[#3c2a21] rounded-lg p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  5000+
                </div>
                <div className="text-white text-base md:text-lg">
                  Satisfied Customers
                </div>
              </div>
              <div className="bg-[#3c2a21] rounded-lg p-6 md:p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold mb-2">
                  24/7
                </div>
                <div className="text-white text-base md:text-lg">
                  Customer Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
