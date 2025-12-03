"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { MapPin, Navigation, Clock } from "lucide-react";

export default function ContactMap() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-12"
          }`}
        >
          <div className="text-center mb-12">
            <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-4">
              <span className="text-sm font-medium text-gold">FIND US</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our <span className="text-gold">Showroom</span>
            </h2>
            <p className="text-gray-600 mb-4">
              Come see our window displays and speak with our experts in person.
            </p>
            <p className="text-[#FF00FF] font-bold uppercase text-lg">
              LOCATION OF THE SHOWROOM TO BE UPDATED
            </p>
          </div>

          {/* Map - Replace the placeholder with actual Google Maps embed */}
          <div className="relative h-80 bg-gray-300 rounded-lg overflow-hidden mb-8">
            <iframe
              src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Aditya%20Doors%2C%20Binoli%20Road%2C%20near%20Canara%20Bank%2C%20Sardhana%2C%20Uttar%20Pradesh%20250342&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Windazo Location in Meerut"
            ></iframe>
          </div>

          {/* Location Details - Update the address */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">Binoli Road Near Trends Showroom, Sardhana, 250342 Meerut, Uttar Pradesh</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Showroom Hours
                  </h3>
                  <p className="text-gray-600">Mon-Fri: 8:00AM-7:00PM</p>
                  <p className="text-gray-600">Sat: 9:00AM-8:00PM</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href="hhttps://www.google.com/maps/search/Binoli+Road+Near+Trends+Showroom,+Sardhana,+250342+Meerut,+Uttar+Pradesh/@29.1435966,77.6056234,17.4z?entry=ttu&g_ep=EgoyMDI1MTIwMS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gold hover:text-gold-dark transition-colors duration-300"
              >
                <Navigation className="h-5 w-5" />
                <span className="font-medium">Get Directions to Meerut</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
