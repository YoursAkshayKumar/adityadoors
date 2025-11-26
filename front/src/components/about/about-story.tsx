"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Award, Home } from "lucide-react";

export default function AboutStory() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-12"
            }`}
          >
            <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-6">
              <span className="text-sm font-medium text-gold">OUR STORY</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {/* Building Trust Through <span className="text-gold">Quality</span> */}
              From Sawmill Roots to Custom Craftsmanship: The{" "}
              <span className="text-gold">Aditya Doors</span> Heritage Since
              1971
            </h2>

            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                The foundation of our business is rooted in the deep,
                five-decade heritage of our family enterprise,Agarwal Timber
                Traders. Beginning in 1971, this pioneering venture specialized
                in the essential supply of wooden logs and cultivated
                unparalleled expertise in sawmill operations (the 'ara
                machine'). Agarwal Timber Traders quickly established an
                extensive network, reliably catering to the timber needs of
                diverse regions, including all of Uttar Pradesh, Uttarakhand,
                Gujarat, and beyond. This legacy instilled in our family an
                intimate, intrinsic understanding of wood quality, sourcing, and
                precision processing.
              </p>
              <p>
                <span>Crafting the Final Vision</span>
                <br></br>
                Building upon this mastery of raw material, the current
                generation expanded the enterprise to create Aditya Doors. We
                transitioned from solely supplying logs to becoming artisans and
                manufacturers of premium interior and exterior solutions.
              </p>
            </div>
          </div>

          {/* Story Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-12"
            }`}
          >
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Home className="h-16 w-16 mx-auto mb-4" />
                  <p>Company Workshop & Showroom</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold p-6 rounded-lg">
              <Award className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-gray-600  px-4 md:px-6">
        <p className="mx-auto">
          Today, Aditya Doors proudly specializes in a comprehensive product
          line that benefits irectly from our timber heritage:
        </p>
        <ul className="list-disc pl-5 space-y-2 my-4">
          <li>Premium Doors and Durable Door Frames</li>
          <li>Modern Wooden Window Blinds and Shutters</li>
          <li>Custom Modular Kitchens</li>
          <li>Bespoke Wardrobes and Storage Systems</li>
          <li>Full Custom Home Furnishings</li>
        </ul>

        <p className="mx-auto">
          We combine our inherited knowledge of superior wood quality with
          contemporary design and guaranteed durability, ensuring that every
          product is a true reflection of our enduring legacy.
        </p><br />

        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">25+</div>
            <div className="text-gray-600">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gold mb-2">5000+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
