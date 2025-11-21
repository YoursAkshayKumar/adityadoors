"use client";

import { useState } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import {
  Star,
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Award,
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
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
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
    inStock: data.status === 'active' && data.quantity > 0,
    stockCount: data.quantity,
    specifications: {
      SKU: data.sku,
      Category: data.parent,
      Status: data.status,
      Quantity: data.quantity,
      Discount: `${data.discount}%`,
      Material: "Premium Quality",
      Warranty: "5-10 Years",
      Installation: "Professional Installation Available",
    },
    features: [
      "Premium Quality Materials",
      "Weather Resistant",
      "Easy Installation",
      "Long-lasting Durability",
      "Modern Design",
      "Energy Efficient",
      "Corrosion Resistant",
      "Low Maintenance",
    ],
    shippingInfo: {
      freeShipping: data.price > 5000,
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30-day return policy",
    },
  } : null;

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + change)));
  };

  const handleAddToCart = () => {
    if (product) {
      console.log(`Added ${quantity} of ${product.name} to cart`);
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  };

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
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
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
                        className="w-full h-full object-cover"
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
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gold font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
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
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                        Save ₹
                        {(product.originalPrice - product.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`font-medium ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock
                    ? `In Stock (${product.stockCount} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="bg-gold hover:bg-gold-dark text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300">
                    Buy Now
                  </Button>
                  <Button
                    onClick={() => setShowInquiryModal(true)}
                    className="border-gold text-gold hover:bg-gold hover:text-white py-3 rounded-lg transition-all duration-300"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Inquiry
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">
                      {product.shippingInfo.freeShipping
                        ? "Free Shipping"
                        : "Standard Shipping"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {product.shippingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-600">
                      {product.shippingInfo.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">Warranty Included</p>
                    <p className="text-sm text-gray-600">
                      {product.specifications.Warranty} manufacturer warranty
                    </p>
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
                  {["description", "specifications", "features"].map((tab) => (
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

                {activeTab === "specifications" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-gray-100"
                      >
                        <span className="font-medium text-gray-900">{key}:</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-gold flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
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