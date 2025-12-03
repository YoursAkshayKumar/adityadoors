"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Phone, Mail, MapPin, Clock, Award, Users } from "lucide-react";

const contactDetails = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    details: ["+91-9997297123"],
    subtitle: "Call us anytime",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: ["info@adityadoors.in"],
    subtitle: "We reply within 24 hours",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Address",
    details: ["Binoli Road Near Trends Showroom, Sardhana, 250342 Meerut, Uttar Pradesh"],
    subtitle: "Visit our showroom",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Working Hours",
    details: ["Mon - Fri: 8:00AM - 7:00PM", "Sat - Sun: 9:00AM - 8:00PM"],
    subtitle: "We're here to help",
  },
];

const stats = [
  {
    icon: <Award className="h-8 w-8" />,
    number: "25+",
    label: "Years Experience",
  },
  {
    icon: <Users className="h-8 w-8" />,
    number: "5000+",
    label: "Happy Customers",
  },
  {
    icon: <Phone className="h-8 w-8" />,
    number: "24/7",
    label: "Customer Support",
  },
];

export default function ContactInfo() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactDetails.map((detail, index) => (
            <div
              key={detail.title}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-4">
                {detail.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {detail.title}
              </h3>
              {detail.details.map((line, i) => (
                <p key={i} className="text-gray-600 mb-1">
                  {line}
                </p>
              ))}
              <p className="text-sm text-gold font-medium">{detail.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
                style={{ transitionDelay: `${600 + index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2a1c16] text-gold rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-[#2a1c16] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
