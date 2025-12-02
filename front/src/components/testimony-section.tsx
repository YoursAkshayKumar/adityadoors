"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Image } from "antd";
import { useGetActiveTestimonialsQuery } from "@/redux/testimonial/testimonialApi";

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  rating?: number;
}

export default function TestimonialsSection() {
  const { data: testimonialsData, isLoading, isError } = useGetActiveTestimonialsQuery(1); // 1 = Home Page
  
  // Handle different possible response structures
  const testimonials = React.useMemo((): Testimonial[] => {
    if (!testimonialsData) return [];
    
    // Check if response has result property
    if (testimonialsData.result && Array.isArray(testimonialsData.result)) {
      return testimonialsData.result;
    }
    
    // Check if response is directly an array
    if (Array.isArray(testimonialsData)) {
      return testimonialsData;
    }
    
    // Check if response has data property
    if (testimonialsData.data && Array.isArray(testimonialsData.data)) {
      return testimonialsData.data;
    }
    
    return [];
  }, [testimonialsData]);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Start as true so content is visible

  useEffect(() => {
    // Set visible after a short delay to ensure content shows
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (testimonials.length > 0 && currentSlide >= testimonials.length) {
      setCurrentSlide(0);
    }
  }, [testimonials.length, currentSlide]);

  const nextSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (testimonials.length === 0) return;
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-12 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return null;
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-12 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-4">
            <span className="text-sm font-medium text-gold">TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our <span className="text-gold">Clients Say</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial._id} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-white p-8 shadow-lg border-t-4 border-gold transition-all duration-1000 ${
                      isVisible || index === currentSlide
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-12"
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      {testimonial.image && (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="object-cover"
                            style={{ width: "auto", height: "auto" }}
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (testimonial.rating || 5)
                                  ? "text-gold fill-gold"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-gray-600 italic">
                      {testimonial.quote}
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-gold transition-all duration-300 z-10 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md border border-gray-200 text-gray-600 hover:text-gold transition-all duration-300 z-10 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-gold" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
