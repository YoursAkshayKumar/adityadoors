"use client";

import { useScrollAnimation } from "./hooks/use-scroll-animation";

const windowTypes = [
  {
    id: 1,
    name: "Single",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="5"
          width="80"
          height="90"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="20"
          y="15"
          width="60"
          height="70"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M30 25L70 75M70 25L30 75"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: 2,
    name: "Standard",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="10"
          y="5"
          width="80"
          height="90"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="95"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 3,
    name: "Wide Windows",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="15"
          width="90"
          height="70"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="15"
          x2="50"
          y2="85"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="27.5"
          y1="15"
          x2="27.5"
          y2="85"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="72.5"
          y1="15"
          x2="72.5"
          y2="85"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="5"
          y1="32.5"
          x2="95"
          y2="32.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="5"
          y1="67.5"
          x2="95"
          y2="67.5"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 4,
    name: "Vintage",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 95H80V50C80 30.67 65.33 15 46 15C26.67 15 12 30.67 12 50V95H20Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="46"
          y1="15"
          x2="46"
          y2="95"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M12 50H80" stroke="currentColor" strokeWidth="2" />
        <path
          d="M29 15C29 15 29 50 29 50"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M63 15C63 15 63 50 63 50"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 5,
    name: "Office Type",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="10"
          width="90"
          height="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="5"
          y1="30"
          x2="95"
          y2="30"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="5"
          y1="50"
          x2="95"
          y2="50"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="5"
          y1="70"
          x2="95"
          y2="70"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="25"
          y1="10"
          x2="25"
          y2="90"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="90"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="75"
          y1="10"
          x2="75"
          y2="90"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: 6,
    name: "Decorative",
    icon: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
        <line
          x1="50"
          y1="10"
          x2="50"
          y2="90"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="10"
          y1="50"
          x2="90"
          y2="50"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="21.7"
          y1="21.7"
          x2="78.3"
          y2="78.3"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="21.7"
          y1="78.3"
          x2="78.3"
          y2="21.7"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export default function WindowTypesSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#2a1c16] text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {/* <h3 className="text-xl md:text-1xl font-medium">
            We produce modern plastic, wooden and aluminum windows according to{" "}
            <span className="text-gold">individual wishes</span> and sizes,
            which satisfy any wishes of our clients
          </h3> */}
          <h3 className="text-xl md:text-1xl font-medium">
            Aditya Doors' wooden window production relies on a meticulous process that blends traditional 
            craftsmanship with modern, precise manufacturing technology to ensure durability, superior 
            performance, and custom aesthetics.
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {windowTypes.map((type, index) => (
            <div
              key={type.id}
              className={`flex flex-col items-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative w-24 h-24 mb-4 cursor-pointer flip-container">
                <div className="absolute inset-0 text-white flip-inner">
                  {type.icon}
                </div>
              </div>
              <span className="text-gold font-medium">{type.name}</span>
            </div>
          ))}
        </div>

        {/* <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            className={`bg-white hover:bg-gray-100 text-[#3c2a21] px-6 py-3 rounded-none transition-all duration-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            ORDER NOW <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            className={`bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-none transition-all duration-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            READ MORE <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div> */}
      </div>
    </section>
  );
}
