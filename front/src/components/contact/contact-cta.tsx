"use client";

import { Button } from "antd";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
// import { Button } from "@/components/ui/button"
import { Phone, Calendar } from "lucide-react";

export default function ContactCTA() {
  const [sectionRef, isVisible] = useScrollAnimation();

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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              READY TO GET <span className="text-gold">STARTED</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Do not wait any longer. Contact us today for a free consultation
              and transform your space with our premium Home Furnishing solutions.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <Button className="bg-gold hover:bg-gold-dark text-white px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule Visit
            </Button>
          </div>

          <div
            className={`mt-12 p-8 bg-[#3c2a21] rounded-lg transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">Why Choose Windazo?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gold mb-2">25+</div>
                <div className="text-gray-300">Years of Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">5000+</div>
                <div className="text-gray-300">Satisfied Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold mb-2">24/7</div>
                <div className="text-gray-300">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
