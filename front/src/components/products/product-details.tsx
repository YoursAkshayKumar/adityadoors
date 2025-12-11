"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import {
  Star,
  Award,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import InquiryModal from "./inquiry-modal";
import { Button, Image } from "antd";
import { useGetProductQuery } from "@/redux/features/productApi";

interface ProductDetailProps {
  productId: string; // slug or id fallback
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Fetch product from API
  const { data, isLoading, isError } = useGetProductQuery(productId);

  // Transform MongoDB product to display format
  const product = data ? {
    _id: data._id,
    id: data._id,
    name: data.title,
    category: data.parent,
    price: data.price,
    originalPrice: data.discount > 0 ? data.originalPrice : undefined,
    rating: data.rating || 4.5,
    reviews: data.reviews || 0,
    image: data.image,
    images: [data.image, ...(data.relatedImages || [])],
    isOnSale: data.discount > 0,
    isFeatured: data.status === 'active',
    description: data.description,
    inStock: data.status === 'active',
    stockCount: data.quantity,
    specifications: data.specifications,
    features: data.features,
    fullDescription: data.fullDescription || data.description,
    shippingInfo: {
      freeShipping: data.price > 5000,
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day return policy",
    },
  } : null;

  const shortDescription =
    product?.description?.length
      ? `${product.description.slice(0, 420)}${
          product.description.length > 420 ? "..." : ""
        }`
      : "Discover premium craftsmanship, durable materials, and elegant design. We customize finishes, sizes, hardware, and installation to fit your project. Contact us for detailed specs, on-site measurements, and scheduling.";

  // Check if specifications and features exist
  // Handle specifications - can be array of objects or object
  const hasSpecifications = product?.specifications && (
    Array.isArray(product.specifications) 
      ? product.specifications.length > 0 
      : typeof product.specifications === 'object' && Object.keys(product.specifications).length > 0
  );
  
  // Handle features - ensure it's an array and has items
  const hasFeatures = product?.features && Array.isArray(product.features) && product.features.length > 0;

  // Available tabs based on data
  const availableTabs = ["description", ...(hasSpecifications ? ["specifications"] : []), ...(hasFeatures ? ["features"] : [])];

  // Active tab state
  const [activeTab, setActiveTab] = useState("description");

  // Update activeTab when product data loads to ensure it's valid
  useEffect(() => {
    if (product) {
      // If current tab is not available, switch to description
      if (!availableTabs.includes(activeTab)) {
        setActiveTab("description");
      }
    }
  }, [product, availableTabs, activeTab]);

  const nextImage = () => {
    if (product) {
      setSelectedImage((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setSelectedImage(
        (prev) =>
          (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error or product not found
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you are looking for does not exist.
          </p>
          <Link href="/products">
            <Button className="bg-gold hover:bg-gold-dark text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gold">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gold">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gold font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <section ref={sectionRef} className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/products">
              <Button className="mb-4 bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-[500px] md:h-[560px] flex items-center justify-center">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover !m-0"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    preview={true}
                  />
                </div>

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isOnSale && (
                    <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                      SALE
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-gold text-white px-3 py-1 text-sm font-bold rounded">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Image Dots */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          selectedImage === index
                            ? "bg-gold"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-white rounded-lg border-2 transition-colors duration-300 shadow-sm overflow-hidden ${
                        selectedImage === index
                          ? "border-gold"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-contain"
                        preview={false}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="mb-2">
                  <span className="text-sm text-gold font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "text-gold fill-gold"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating}
                  </span>
                </div>

                {/* Price/stock removed per requirements */}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={() => setShowInquiryModal(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300 font-medium"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => setShowInquiryModal(true)}
                  className="border-2 border-gold text-gold hover:bg-gold hover:text-white py-3 rounded-lg transition-all duration-300 font-medium"
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Inquiry
                </Button>
              </div>

              {/* Summary & shipping */}
              <div className="bg-white rounded-lg p-5 shadow-sm space-y-4 border border-gray-100">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Overview</h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {shortDescription}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-gold mt-0.5">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">Free Shipping</p>
                      <p className="text-gray-700 text-sm">Estimated delivery: 3-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="text-gold mt-0.5">
                      <RotateCcw className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">Easy Returns</p>
                      <p className="text-gray-700 text-sm">30-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6 overflow-x-auto">
                  {availableTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-2 font-medium text-sm capitalize transition-colors duration-300 border-b-2 whitespace-nowrap ${
                        activeTab === tab
                          ? "border-gold text-gold"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === "specifications" && hasSpecifications && product.specifications && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.isArray(product.specifications) ? (
                      // New format: array of objects with label and value
                      product.specifications.map((spec: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between py-3 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-900">{spec?.label || ''}:</span>
                          <span className="text-gray-600">{spec?.value || ''}</span>
                        </div>
                      ))
                    ) : (
                      // Old format: object with key-value pairs
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-3 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-900">{key}:</span>
                          <span className="text-gray-600">{String(value || '')}</span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === "features" && hasFeatures && product.features && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 py-2">
                        <Award className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 leading-relaxed">{feature || ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal
          product={product}
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}