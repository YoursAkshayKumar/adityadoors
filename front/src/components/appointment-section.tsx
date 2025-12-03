"use client";

import type React from "react";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "./hooks/use-scroll-animation";
import { Image } from "antd";
import { useAddMeasurementMutation } from "@/redux/measurement/measurementApi";
import { notifySuccess, notifyError } from "@/utils/toast.js";

// import AppointmentBackground from "./appointment-background"

export default function AppointmentSection() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [addMeasurement, { isLoading: isSubmitting }] = useAddMeasurementMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredDate: "",
    preferredTime: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      notifyError("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      notifyError("Please enter your email");
      return;
    }
    if (!formData.phone.trim()) {
      notifyError("Please enter your phone number");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      notifyError("Please enter a valid email address");
      return;
    }

    try {
      const measurementData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        preferredDate: formData.preferredDate || null,
        preferredTime: formData.preferredTime.trim(),
      };

      const result = await addMeasurement(measurementData).unwrap();
      
      notifySuccess("Thank you! Your measurement request has been submitted. Our team will contact you shortly.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        preferredDate: "",
        preferredTime: "",
      });
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to submit measurement request. Please try again.";
      notifyError(errorMessage);
    }
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name*"
                      required
                      className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email*"
                      required
                      className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone*"
                    required
                    className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address (optional)"
                    className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      placeholder="Preferred Date"
                      className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 text-gray-900"
                    />
                  </div>
                  <div>
                    <input
                      type="time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      placeholder="Preferred Time"
                      className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold placeholder:text-gray-500 text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-none transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "SUBMITTING..." : "SEND REQUEST"} <ArrowRight className="ml-2 h-4 w-4" />
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
