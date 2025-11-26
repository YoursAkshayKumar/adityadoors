"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "./hooks/use-scroll-animation";
import { Image } from "antd";

// import AppointmentBackground from "./appointment-background"

export default function AppointmentSection() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", phone: "" });
    // Show success message or redirect
    alert("Thank you! Our manager will contact you shortly.");
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#3c2a21] py-16 md:py-28 overflow-hidden"
      style={{
        backgroundImage: `url(http://windazo.like-themes.com/wp-content/uploads/2018/02/wood-form-bg.jpg?id=9482)`,
        backgroundSize: "cover",
      }}
    >
      {/* Background */}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Form Section */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-12"
            }`}
          >
            <div className="bg-[#2a1c16] p-8 md:p-12 rounded-md max-w-md mx-auto md:mx-0">
              <div className="text-gold text-sm font-medium mb-2">
                Make an Appointment
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready for an Upgrade?
              </h2>
              <p className="text-gray-300 mb-8">
                Schedule Your Free Measurement
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name*"
                    required
                    className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone*"
                    required
                    className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <button
                  //   type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-none transition-all duration-300 flex items-center justify-center"
                >
                  SEND REQUEST <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Image Section */}
          <div
            className={`w-full md:w-1/2 h-[500px] relative mt-8 md:mt-0 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-12"
            }`}
          >
            <div className="relative h-full w-full">
              {/* <TechnicianImage /> */}
              <Image
                alt="image"
                src="http://windazo.like-themes.com/wp-content/uploads/2018/02/wood-form-worker.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
