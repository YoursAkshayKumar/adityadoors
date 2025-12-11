"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Image } from "antd";
import { Sparkles, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "./hooks/use-scroll-animation";

const buildSlug = (title?: string, slug?: string, id?: string) => {
  if (slug && slug.trim()) return slug;
  if (title) {
    const generated = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (generated) return generated;
  }
  return id || "";
};

// =======================================================
// 1. ADDED: TypeScript Interface for Product Data
// This defines the expected structure, preventing the 'never' type error.
// =======================================================
interface Product {
  // CRITICAL FIX: The unique MongoDB ID used for the React key
  _id: string;
  title: string;
  image: string;
  description: string;
  onSale?: boolean; // Used in the conditional rendering check
  // Add other properties you use here for better type safety:
  // price: number;
  // category: { name: string; id: string; };
}
// =======================================================

export default function BestSellersSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  // =======================================================
  // 2. FIXED: Explicitly set the type to Product[] for the state
  // This resolves the Type error: Property '_id' does not exist on type 'never'.
  // =======================================================
  const [products, setProducts] = useState<Product[]>([]);
  // =======================================================

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Replace with your backend URL
        const ENV_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://yourapi.com";
        const API_URL = ENV_URL + "/api/products/popular-products";
        
        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }
        const data = await res.json();
        // Handle both response structures: { products: [...] } or direct array
        const productsList = data.products || data || [];
        setProducts(Array.isArray(productsList) ? productsList : []); 
      } catch (error) {
        console.error("Error fetching popular products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-[#f7f1e9] via-white to-[#f0e6d8]"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#c4a267]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-6 h-72 w-72 rounded-full bg-[#7c5b34]/10 blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c6a15b]/40 bg-white/70 px-4 py-2 text-sm font-medium text-[#7a5b3b] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#c6a15b]" />
            Signature Picks
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-[#2f241b]">
            Popular Products
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elevate every entrance with statement-making designs, premium
            finishes, and secure builds trusted by homeowners.
          </p>
        </div>

        {/* Product Loader */}
        {loading && (
          <div className="text-center py-10 text-gray-600">
            Loading products...
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 8).map((product, index) => {
              const hrefSlug = buildSlug(product.title, (product as any).slug, product._id);
              return (
                <Link
                  href={`/products/${hrefSlug}`}
                  key={product._id}
                  className={`group relative block h-full cursor-pointer ${
                    isVisible
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c6a15b]/20 via-white to-white opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />

                  <div className="relative h-full bg-white/95 backdrop-blur shadow-[0_18px_50px_-18px_rgba(63,41,22,0.28)] ring-1 ring-[#e8dcc5] overflow-hidden transition duration-500 group-hover:-translate-y-1">
                    <div className="relative">
                      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#f7f0e4] via-transparent to-transparent opacity-90" />

                      {/* Sale Badge */}
                      {product?.onSale && (
                        <div className="absolute top-4 left-4 z-10 rounded-full bg-red-500/95 px-3 py-1 text-xs font-semibold text-white shadow">
                          SALE
                        </div>
                      )}

                      {/* Accent Tag */}
                      <div className="absolute top-4 right-4 z-10" />

                      {/* Image Container */}
                      <div className="relative w-full overflow-hidden bg-[#f9f5ef]">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={500}
                          height={500}
                          className="w-full h-auto object-contain !m-0 transition-transform duration-500 group-hover:scale-[1.015]"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            display: "block",
                          }}
                          preview={false}
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0a05]/5 opacity-0 transition duration-500 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-3 flex flex-col">
                      <h3 className="text-lg font-semibold text-[#2f241b] text-center leading-tight group-hover:text-[#b68738] transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                      </h3>

                      <p className="text-gray-700 text-center text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
                        {product.description.split(" ").length > 15
                          ? product.description.split(" ").slice(0, 15).join(" ") + "..."
                          : product.description}
                      </p>

                      <div className="flex justify-center pt-2">
                        <span className="rounded-full bg-[#f3e7cf] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#8a693d] ring-1 ring-[#e5d5bf] transition duration-300 group-hover:bg-[#e6d1b0]">
                          View details
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <Link href="/products">
            <button
              className="bg-[#c6a15b] hover:bg-[#b68738] text-white px-8 py-3 rounded-full transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              style={{ cursor: "pointer" }}
            >
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}