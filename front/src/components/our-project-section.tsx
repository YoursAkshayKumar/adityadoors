"use client";

import React, { useMemo } from "react";
import { useScrollAnimation } from "./hooks/use-scroll-animation";
import { useGetActivePortfoliosQuery } from "@/redux/portfolio/portfolioApi";

interface Portfolio {
  _id: string;
  name: string;
  number: string;
  image: string;
  description: string;
}

export default function ProjectsSection() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const { data: portfoliosData, isLoading, isError } = useGetActivePortfoliosQuery(undefined);
  
  // Handle different possible response structures
  const portfolios = useMemo((): Portfolio[] => {
    if (!portfoliosData) return [];
    
    // Check if response has result property
    if (portfoliosData.result && Array.isArray(portfoliosData.result)) {
      return portfoliosData.result;
    }
    
    // Check if response is directly an array
    if (Array.isArray(portfoliosData)) {
      return portfoliosData;
    }
    
    // Check if response has data property
    if (portfoliosData.data && Array.isArray(portfoliosData.data)) {
      return portfoliosData.data;
    }
    
    return [];
  }, [portfoliosData]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 "
      style={{
        background: "linear-gradient(to bottom, #c8a45c 70%, white 30%)",
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="text-white text-sm font-medium mb-2">
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c2a21] mb-4">
            Where Quality Meets Vision
          </h2>
          <p className="text-[#3c2a21] max-w-3xl mx-auto">
           See the Transformation: Inspiring Spaces Created by Aditya Doors. Our finished projects showcase the precision and elegance we bring to homes and commercial spaces nationwide.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading portfolios...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading portfolios</p>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No portfolios available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolios.map((portfolio, index) => (
              <div
                key={portfolio._id}
                className={`group relative overflow-hidden transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative h-80 overflow-hidden">
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${portfolio.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block bg-gold px-2 py-1 text-xs text-white mb-2">
                      {portfolio.name}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {portfolio.number}
                    </h3>
                    <p className="text-gray-200 text-sm mt-1">
                      {portfolio.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
