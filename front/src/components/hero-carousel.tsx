"use client";

import { useState, useEffect } from "react";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "antd";
import { useGetActiveCarouselsQuery } from "@/redux/carousel/carouselApi";

interface CarouselItem {
  _id?: string;
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundImage?: string;
  link?: string;
  buttonText?: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: carouselsData, isLoading, isError } = useGetActiveCarouselsQuery(undefined);
  
  const carouselItems: CarouselItem[] = carouselsData?.result || [];

  useEffect(() => {
    if (carouselItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === carouselItems.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [carouselItems.length]);

  // Show loading or empty state
  if (isLoading || carouselItems.length === 0) {
    return (
      <div className="hero-carousel-wrapper relative overflow-hidden min-h-[550px] sm:min-h-[600px] md:min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
        <div className="text-center text-white">
          {isLoading ? (
            <p className="text-lg">Loading carousel...</p>
          ) : (
            <p className="text-lg">No carousel items available</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="hero-carousel-wrapper relative overflow-hidden min-h-[550px] sm:min-h-[600px] md:min-h-[600px] lg:min-h-[700px]">
      {/* Background Images for each slide */}
            {carouselItems.map((item: CarouselItem, index: number) => (
              <div
                key={`bg-${item._id || index}`}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
          style={{
            backgroundImage: `url(${item.backgroundImage || item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay for better text readability - stronger on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1c16]/90 via-[#2a1c16]/80 to-[#2a1c16]/70 md:from-[#2a1c16]/85 md:via-[#2a1c16]/75 md:to-[#2a1c16]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a1c16]/60 via-transparent to-[#2a1c16]/60 md:from-transparent md:via-transparent md:to-[#2a1c16]/50"></div>
        </div>
      ))}

      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center min-h-[450px] sm:min-h-[500px] md:min-h-[500px] lg:min-h-[600px]">
          {/* Text Content */}
          <div className="relative z-10 text-center lg:text-left">
            {carouselItems.map((item: CarouselItem, index: number) => (
              <div
                key={item._id || index}
                className={`transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8 absolute top-0 left-0 right-0"
                }`}
              >
                <div
                  className={`transition-all duration-700 delay-100 ${
                    index === currentSlide
                      ? "opacity-100 transform translate-x-0"
                      : "opacity-0 transform -translate-x-8"
                  }`}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                    {item.title}
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gold mb-3 sm:mb-4 md:mb-6 leading-tight">
                    {item.subtitle}
                  </h2>
                  <p className="text-gray-200 text-xs sm:text-sm md:text-base lg:text-lg mb-5 sm:mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                    <a
                      href="/contacts"
                      className="inline-flex items-center justify-center bg-brown-900 hover:bg-gray-900 active:bg-gray-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-none transition-all duration-300 active:scale-95 hover:translate-y-[-2px] sm:hover:translate-y-[-4px] hover:shadow-lg text-xs sm:text-sm md:text-base font-semibold min-h-[42px] sm:min-h-[44px]"
                    >
                      MAKE ORDER
                      <MoveRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-5" />
                    </a>
                    <a
                      href={item.link || "/contacts"}
                      className="inline-flex items-center justify-center bg-gold hover:bg-yellow-600 active:bg-yellow-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-none transition-all duration-300 active:scale-95 hover:translate-y-[-2px] sm:hover:translate-y-[-4px] hover:shadow-lg text-xs sm:text-sm md:text-base font-semibold min-h-[42px] sm:min-h-[44px]"
                    >
                      {item.buttonText || "READ MORE"}
                      <MoveRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative h-[240px] sm:h-[300px] md:h-[380px] lg:h-[500px] xl:h-[600px] flex justify-center items-center order-first lg:order-last">
            {carouselItems.map((item: CarouselItem, index: number) => (
              <div
                key={item._id || index}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 transform scale-100 translate-x-0"
                    : "opacity-0 transform scale-95 translate-x-8"
                }`}
              >
                <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center px-2 sm:px-4">
                  <Image
                    className="slider-product-image object-contain w-auto h-auto max-w-[85%] sm:max-w-[90%] md:max-w-full max-h-full drop-shadow-2xl"
                    alt={item.title}
                    src={item?.image}
                    width={600}
                    height={600}
                    style={{ maxWidth: "100%", height: "auto", maxHeight: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-2 relative z-10">
          {carouselItems.map((_: any, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentSlide
                  ? "bg-gold w-7 sm:w-8 md:w-10 scale-110"
                  : "bg-white/50 active:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              style={{ minWidth: "8px", minHeight: "8px" }}
            />
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile, shown on tablet+ */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20 pointer-events-none hidden md:flex">
          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? carouselItems.length - 1 : currentSlide - 1
              )
            }
            className="pointer-events-auto ml-2 md:ml-4 p-2 md:p-3 bg-white/25 active:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all duration-300 active:scale-95 hover:scale-110 shadow-lg touch-manipulation"
            aria-label="Previous slide"
            style={{ minWidth: "40px", minHeight: "40px" }}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center z-20 pointer-events-none hidden md:flex">
          <button
            onClick={() =>
              setCurrentSlide(
                currentSlide === carouselItems.length - 1 ? 0 : currentSlide + 1
              )
            }
            className="pointer-events-auto mr-2 md:mr-4 p-2 md:p-3 bg-white/25 active:bg-white/40 backdrop-blur-sm rounded-full text-white transition-all duration-300 active:scale-95 hover:scale-110 shadow-lg touch-manipulation"
            aria-label="Next slide"
            style={{ minWidth: "40px", minHeight: "40px" }}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
