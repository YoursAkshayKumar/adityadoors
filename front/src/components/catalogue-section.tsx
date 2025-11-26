"use client";

import { FileText, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "./hooks/use-scroll-animation";
// import { Image } from "antd";
// import DoorImage from "./icons/door-image";
import DoorProductTwo from "./icons/door-producttwo";
import Image from "next/image";

// import CatalogueImage from "./catalogue-image"

export default function CatalogueSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-2 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <div className="text-gold text-sm font-medium">Own Production</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3c2a21]">
             Why Choose Us?
            </h2>
            <div className="text-gray-600 max-w-md">
              <ul className="list-group">
                <li className="list-group-item"><b>Exceptional Craftsmanship:</b> Handcrafted pieces built to last.</li>
                <li className="list-group-item"><b>Unique Designs:</b> Style that blends modern elegance with classic warmth.</li>
                <li className="list-group-item"><b>Sustainable Quality:</b> Mindfully sourced materials for peace of mind.</li>
              </ul>
            </div>

            <a  href="catelogue/aditya-doors-product-catelogue.pdf"
                download 
                className="flex items-center space-x-2 text-gold hover:text-gold-dark transition-colors duration-300 cursor-pointer">
              <FileText className="h-5 w-5" />
              <span className="font-medium">Download Our Catalogue</span>
            </a>

            <a href="/about" className="pt-4">
              <button className="flex bg-gold hover:bg-gold-dark text-white px-8 py-3 rounded-none transition-all duration-300 home-btn">
                READ MORE <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </a>
          </div>

          {/* Right Image */}
          <div
            className={`relative h-[300px] md:h-[400px] transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-12"
            }`}
          >
            {/* <CatalogueImage /> */}
            {/* <DoorImage /> */}
            {/* <DoorProductTwo /> */}
            <Image
              alt="catalogue"
              src="/images/sofa.webp"
              width={600}
              height={400}
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16 mb-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-gold mb-3">{feature.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900">
                {feature.title}
              </h3>
              {feature.subtitle && (
                <p className="text-xs text-gray-600">{feature.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="2" />
        <path d="M20 10V30M10 20H30" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Energy Saving",
    subtitle: "Technologies",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M32 25C32 25 28 30 20 30C12 30 8 25 8 25"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="20" cy="20" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Excellent Sound",
    subtitle: "Insulation",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 7V10M20 30V33M7 20H10M30 20H33M10 10L12 12M28 28L30 30M30 10L28 12M12 28L10 30"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "High Light",
    subtitle: "Transmittance",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M15 20L18 23L25 16" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Durability.",
    subtitle: "10 years warranty",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 30C10 25 15 20 20 10C25 20 30 25 30 30C30 35 25 37 20 37C15 37 10 35 10 30Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M20 25C21.6569 25 23 23.6569 23 22C23 20.3431 21.6569 19 20 19C18.3431 19 17 20.3431 17 22C17 23.6569 18.3431 25 20 25Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Eco-friendly",
    subtitle: "materials",
  },
  {
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="10"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M15 15H25V25H15V15Z" stroke="currentColor" strokeWidth="2" />
        <path
          d="M10 10L15 15M30 10L25 15M10 30L15 25M30 30L25 25"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "Modern thoughtful",
    subtitle: "design",
  },
];
