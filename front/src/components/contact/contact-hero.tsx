"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
// import imageback from "../../Images/firmbee-com-SpVHcbuKi6E-unsplash.jpg"

export default function ContactHero() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2a1c16] py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/modern-office.png')",
            // backgroundImage: imageback ? imageback : "url('/modern-office.png')",
            // backgroundImage:
            //   "url('/https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[#2a1c16] bg-opacity-80"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`inline-block bg-gold px-4 py-1 text-white text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            GET IN TOUCH
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            Contact <span className="text-gold">Us</span>
          </h1>

          <p
            className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            Fill out the form below to connect with our team.
          </p>
        </div>
      </div>
    </section>
  );
}
