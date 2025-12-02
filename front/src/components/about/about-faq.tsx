"use client";

import { useState, useEffect, useMemo } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useGetActiveFAQsQuery } from "@/redux/faq/faqApi";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  status?: string;
}

export default function AboutFAQ() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const { data: faqsData, isLoading, isError } = useGetActiveFAQsQuery(undefined);

  // Handle different possible response structures
  const faqs = useMemo((): FAQ[] => {
    if (!faqsData) return [];
    
    // Check if response has result property (backend returns { success: true, result: [...] })
    if (faqsData.result && Array.isArray(faqsData.result)) {
      return faqsData.result;
    }
    
    // Check if response is directly an array
    if (Array.isArray(faqsData)) {
      return faqsData;
    }
    
    // Check if response has data property
    if (faqsData.data && Array.isArray(faqsData.data)) {
      return faqsData.data;
    }
    
    return [];
  }, [faqsData]);

  useEffect(() => {
    console.log("=== FAQ DEBUG ===");
    console.log("FAQ Data:", faqsData);
    console.log("FAQ Loading:", isLoading);
    console.log("FAQ Error:", isError);
    console.log("FAQs Array:", faqs);
    console.log("FAQs Count:", faqs.length);
    console.log("==================");
  }, [faqsData, isLoading, isError, faqs]);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-6">
            <span className="text-sm font-medium text-gold">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and
            company. Can not find what you are looking for? Contact us directly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading FAQs...</p>
            </div>
          )}
          
          {isError && (
            <div className="text-center py-12">
              <p className="text-red-600 font-semibold">Failed to load FAQs</p>
              <p className="text-sm text-gray-500 mt-2">
                Please check your backend server is running and the API endpoint is accessible.
              </p>
            </div>
          )}
          
          {!isLoading && !isError && faqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-2 font-semibold">No FAQs available</p>
              <p className="text-sm text-gray-500">
                Make sure your FAQs have status "Show" in the admin panel.
              </p>
            </div>
          )}
          
          {!isLoading && !isError && faqs.length > 0 && (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="bg-white rounded-lg shadow-md transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(faq._id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 rounded-lg"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openFAQ === faq._id ? (
                      <ChevronUp className="h-5 w-5 text-gold flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gold flex-shrink-0" />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === faq._id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
