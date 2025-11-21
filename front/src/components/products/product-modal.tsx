"use client";

import { useState, useEffect } from "react";
import {
  X,
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
} from "lucide-react";
import { Button } from "antd";
// import { Button } from "@/components/ui/button"

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isOnSale: boolean;
  isFeatured: boolean;
  description: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

// Extended product data for modal
const getExtendedProductData = (product: Product) => ({
  ...product,
  images: [
    product.image,
    `/product-${product.id}-2.png`,
    `/product-${product.id}-3.png`,
    `/product-${product.id}-4.png`,
  ],
  fullDescription: `${product.description}. This premium product is crafted with the finest materials and designed to meet the highest standards of quality and durability. Perfect for modern homes and commercial spaces, it combines functionality with aesthetic appeal.`,
  specifications: {
    Material: product.category.includes("Door")
      ? "Premium Steel/Wood"
      : "High-grade Aluminum",
    Finish: "Powder Coated",
    Warranty: "5-10 Years",
    Installation: "Professional Installation Included",
    Maintenance: "Low Maintenance Required",
    Certification: "ISO 9001 Certified",
  },
  features: [
    "Premium Quality Materials",
    "Weather Resistant",
    "Easy Installation",
    "Long-lasting Durability",
    "Modern Design",
    "Energy Efficient",
  ],
  inStock: true,
  stockCount: Math.floor(Math.random() * 50) + 10,
  shippingInfo: {
    freeShipping: product.price > 100,
    estimatedDelivery: "3-5 business days",
    returnPolicy: "30-day return policy",
  },
});

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const extendedProduct = getExtendedProductData(product);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + change)));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % extendedProduct.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + extendedProduct.images.length) %
        extendedProduct.images.length
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-start sm:items-center justify-center p-2 sm:p-4">
        <div className="relative bg-white rounded-none sm:rounded-lg shadow-xl w-full max-w-7xl max-h-[100vh] sm:max-h-[95vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Mobile Header */}
          <div className="block sm:hidden bg-gray-50 px-4 py-3 border-b">
            <h1 className="text-lg font-bold text-gray-900 pr-10">
              {extendedProduct.name}
            </h1>
            <span className="text-sm text-gold font-medium uppercase tracking-wide">
              {extendedProduct.category}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-3 sm:p-6">
            {/* Left Side - Images */}
            <div className="space-y-2 sm:space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-300 rounded-lg mx-auto mb-2 sm:mb-4"></div>
                    <p className="text-sm sm:text-lg font-medium">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm">
                      Image {selectedImage + 1}
                    </p>
                  </div>
                </div>

                {/* Mobile Image Navigation Arrows */}
                <div className="block sm:hidden">
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Badges */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col space-y-1 sm:space-y-2">
                  {extendedProduct.isOnSale && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                      SALE
                    </span>
                  )}
                  {extendedProduct.isFeatured && (
                    <span className="bg-gold text-white px-2 py-1 text-xs font-bold rounded">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Mobile Image Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:hidden">
                  {extendedProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        selectedImage === index
                          ? "bg-gold"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop Thumbnail Images */}
              <div className="hidden sm:grid grid-cols-4 gap-2">
                {extendedProduct.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg border-2 transition-colors duration-300 ${
                      selectedImage === index
                        ? "border-gold"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-gray-500">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Desktop Product Header */}
              <div className="hidden sm:block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gold font-medium uppercase tracking-wide">
                    {extendedProduct.category}
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

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {extendedProduct.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        i < Math.floor(extendedProduct.rating)
                          ? "text-gold fill-gold"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600">
                  {extendedProduct.rating} ({extendedProduct.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <span className="text-2xl sm:text-4xl font-bold text-gray-900">
                  ₹{extendedProduct.price}
                </span>
                {extendedProduct.originalPrice && (
                  <>
                    <span className="text-lg sm:text-2xl text-gray-500 line-through">
                      ₹{extendedProduct.originalPrice}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 text-xs sm:text-sm font-bold rounded inline-block w-fit">
                      Save ₹
                      {(
                        extendedProduct.originalPrice - extendedProduct.price
                      ).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Mobile Favorite Button */}
              <div className="flex sm:hidden justify-end">
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

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    extendedProduct.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`text-sm sm:text-base font-medium ${
                    extendedProduct.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {extendedProduct.inStock
                    ? `In Stock (${extendedProduct.stockCount} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="font-medium text-sm sm:text-base">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                    <span className="px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!extendedProduct.inStock}
                    className="flex-1 bg-gold hover:bg-gold-dark text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="flex-1 sm:flex-none sm:px-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300 text-sm sm:text-base">
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div className="flex items-start space-x-3">
                  <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {extendedProduct.shippingInfo.freeShipping
                        ? "Free Shipping"
                        : "Standard Shipping"}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Estimated delivery:{" "}
                      {extendedProduct.shippingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      Easy Returns
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {extendedProduct.shippingInfo.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      Warranty Included
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {extendedProduct.specifications.Warranty} manufacturer
                      warranty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <div className="px-3 sm:px-6">
              {/* Tab Navigation */}
              <div className="flex space-x-4 sm:space-x-8 border-b border-gray-200 overflow-x-auto">
                {["description", "specifications", "features", "reviews"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 sm:py-4 px-1 sm:px-2 font-medium text-xs sm:text-sm capitalize transition-colors duration-300 border-b-2 whitespace-nowrap ${
                        activeTab === tab
                          ? "border-gold text-gold"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {/* Tab Content */}
              <div className="py-4 sm:py-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {extendedProduct.fullDescription}
                    </p>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4">
                    {Object.entries(extendedProduct.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-900 text-sm sm:text-base">
                            {key}:
                          </span>
                          <span className="text-gray-600 text-sm sm:text-base">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4">
                    {extendedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-gold flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <h3 className="text-base sm:text-lg font-semibold">
                        Customer Reviews
                      </h3>
                      <Button className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-lg text-sm sm:text-base w-fit">
                        Write a Review
                      </Button>
                    </div>

                    {/* Sample Reviews */}
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b border-gray-200 pb-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 sm:h-4 sm:w-4 text-gold fill-gold"
                              />
                            ))}
                          </div>
                          <span className="font-medium text-sm sm:text-base">
                            Customer {review}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base">
                          Great product! Excellent quality and fast delivery.
                          Highly recommended for anyone looking for reliable{" "}
                          {extendedProduct.category.toLowerCase()}.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
