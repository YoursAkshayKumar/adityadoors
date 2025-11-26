"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Image } from "antd";

const testimonials = [
  {
    id: 1,
    name: "Sahil Sharma",
    role: "Architect, Muzzafarnagar",
    quote:
      "Aditya Doors handled all the major wooden elements for our new construction, including the custom modular kitchen and all the integrated wardrobes. We were highly impressed by their in-house production capability and the attention to detail on every panel and joint. They used high-grade, seasoned wood, and the finish work is flawless. The quick installation was handled meticulously by their team, adhering strictly to the timeline. There were no hidden surprises, and everything fit perfectly thanks to their precise measurements. The pieces feel incredibly robust and durable. If you are looking for long-lasting, custom-designed wooden furnishings and exceptional service, Aditya Doors is the premier choice.",
    rating: 5,
  },
  {
    id: 2,
    name: "Anshika Bansal",
    role: "Interior Designer, Delhi",
    quote:
      "Our decision to upgrade to Aditya Doors’ performance window systems was a game-changer. The excellent sound insulation has made our home so much quieter, and we appreciate the energy-saving features. Simultaneously, we ordered a set of premium interior doors and frames. The craftsmanship is leagues above standard market offerings; you can immediately feel the weight and superior finish. Their process, from the initial consultation to the final guaranteed installation, was transparent and professional. Their focus on perfect measurement accuracy ensures longevity. They don't just sell wood products; they sell genuine, long-term home solutions backed by a quality promise.",
    rating: 5,
  },
  {
    id: 3,
    name: "Simran Sharma",
    role: "Home Owner, Delhi",
    quote:
      "We also installed their wooden window shutters, which look fantastic and provide phenomenal sound insulation. What truly sets them apart is the service: the free measurement guaranteed a perfect, airtight fit everywhere. The installation team was fast, professional, and efficient, delivering a truly hassle-free experience. Their use of chemically treated, durable wood ensures our investment will last for decades. Highly recommended for professionalism and enduring, genuine quality.",
    rating: 4,
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

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
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-white p-8 shadow-lg border-t-4 border-gold transition-all duration-1000 ${
                      isVisible
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-12"
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      {/* <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                      </div> */}
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
                                i < testimonial.rating
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
