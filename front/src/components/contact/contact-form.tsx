"use client";

import type React from "react";

import { useState } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
// import { Button } from "@/components/ui/button"
import { Send, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useAddContactMutation } from "@/redux/contact/contactApi";
import { notifySuccess, notifyError } from "@/utils/toast.js";

export default function ContactForm() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [addContact, { isLoading: isSubmitting }] = useAddContactMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    if (!formData.subject.trim()) {
      notifyError("Please select a subject");
      return;
    }
    if (!formData.message.trim()) {
      notifyError("Please enter your message");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      notifyError("Please enter a valid email address");
      return;
    }

    try {
      const contactData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const result = await addContact(contactData).unwrap();
      
      notifySuccess("Thank you for your message! We'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Failed to send message. Please try again.";
      notifyError(errorMessage);
    }
  };

  return (
    <section ref={sectionRef} id="contact-form" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-12"
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-cream-50 px-4 py-1 border-l-4 border-gold mb-4">
              <span className="text-sm font-medium text-gold">
                SEND MESSAGE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              GET A <span className="text-gold">FREE QUOTE</span>
            </h2>
            <p className="text-gray-600">
              Fill out the form below to connect with our team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 placeholder:text-gray-500"
                />
              </div>

              <div>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 text-gray-900"
                >
                  <option value="">Select Subject *</option>
                  <option value="quote">Request Quote</option>
                  <option value="consultation">Free Consultation</option>
                  <option value="installation">Installation Service</option>
                  <option value="repair">Repair Service</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message *"
                required
                rows={6}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none placeholder:text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold hover:bg-gold-dark text-white px-6 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
