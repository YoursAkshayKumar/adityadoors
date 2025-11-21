"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Save, ImageIcon } from "lucide-react";
import { Button } from "antd";
// import { Button } from "@/components/ui/button"

interface NewProduct {
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  fullDescription: string;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  isOnSale: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockCount: number;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (product: NewProduct) => void;
}

const categories = [
  "Door Hinges",
  "Door Locks",
  "Doors",
  "Fixtures",
  "Handles",
  "Hardware",
  "Keyless Entry",
  "Windows",
];

const defaultSpecifications = {
  Material: "",
  Finish: "",
  Warranty: "",
  Installation: "",
  Maintenance: "",
  Certification: "",
  Dimensions: "",
  Weight: "",
};

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
}: AddProductModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<NewProduct>({
    name: "",
    category: "",
    price: 0,
    originalPrice: undefined,
    description: "",
    fullDescription: "",
    images: [""],
    specifications: { ...defaultSpecifications },
    features: [""],
    isOnSale: false,
    isFeatured: false,
    inStock: true,
    stockCount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number.parseFloat(value) || 0
          : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
    }));
  };

  const handleArrayChange = (
    field: "images" | "features",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "images" | "features") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field: "images" | "features", index: number) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Product name is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
      if (!formData.description.trim())
        newErrors.description = "Short description is required";
    }

    if (step === 2) {
      if (!formData.fullDescription.trim())
        newErrors.fullDescription = "Full description is required";
      if (formData.images.some((img) => !img.trim()))
        newErrors.images = "All image URLs must be filled";
    }

    if (step === 3) {
      if (formData.features.some((feature) => !feature.trim()))
        newErrors.features = "All features must be filled";
      if (formData.inStock && formData.stockCount <= 0)
        newErrors.stockCount =
          "Stock count must be greater than 0 when in stock";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStep(3)) {
      // Filter out empty values
      const cleanedProduct = {
        ...formData,
        images: formData.images.filter((img) => img.trim()),
        features: formData.features.filter((feature) => feature.trim()),
        specifications: Object.fromEntries(
          //   Object.entries(formData.specifications).filter(([_, value]) =>
          Object.entries(formData.specifications).filter(([value]) =>
            value.trim()
          )
        ),
      };

      onProductAdded(cleanedProduct);
      onClose();

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: 0,
        originalPrice: undefined,
        description: "",
        fullDescription: "",
        images: [""],
        specifications: { ...defaultSpecifications },
        features: [""],
        isOnSale: false,
        isFeatured: false,
        inStock: true,
        stockCount: 0,
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Basic Information
            </h3>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price * (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (₹)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ""}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description for product cards"
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Product Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isOnSale"
                  checked={formData.isOnSale}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  On Sale
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Detailed Information
            </h3>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                placeholder="Detailed product description for the product page"
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none ${
                  errors.fullDescription ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullDescription}
                </p>
              )}
            </div>

            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images *
              </label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <div className="flex-1 relative">
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) =>
                        handleArrayChange("images", index, e.target.value)
                      }
                      placeholder={`Image URL ${index + 1}`}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  {formData.images.length > 1 && (
                    <Button
                      typeof="button"
                      onClick={() => removeArrayItem("images", index)}
                      //   variant="outline"
                      size="small"
                      className="p-2"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                typeof="button"
                onClick={() => addArrayItem("images")}
                size="small"
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
              )}
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Product Specifications
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {key}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        handleSpecificationChange(key, e.target.value)
                      }
                      placeholder={`Enter ${key.toLowerCase()}`}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Features & Inventory
            </h3>

            {/* Product Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Features *
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) =>
                      handleArrayChange("features", index, e.target.value)
                    }
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      typeof="button"
                      onClick={() => removeArrayItem("features", index)}
                      //   variant="outline"
                      size="small"
                      className="p-2"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                typeof="button"
                onClick={() => addArrayItem("features")}
                // variant="outline"
                size="small"
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
              {errors.features && (
                <p className="text-red-500 text-sm mt-1">{errors.features}</p>
              )}
            </div>

            {/* Inventory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-4 h-4 text-gold focus:ring-gold border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  In Stock
                </label>
              </div>

              {formData.inStock && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Count *
                  </label>
                  <input
                    type="number"
                    name="stockCount"
                    value={formData.stockCount}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent ${
                      errors.stockCount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.stockCount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.stockCount}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="bg-[#2a1c16] text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === currentStep
                        ? "bg-gold text-white"
                        : step < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                  <span
                    className={`ml-2 text-sm ${
                      step === currentStep ? "text-gold" : "text-gray-300"
                    }`}
                  >
                    {step === 1
                      ? "Basic Info"
                      : step === 2
                      ? "Details"
                      : "Features"}
                  </span>
                  {step < 3 && (
                    <div className="w-8 h-0.5 bg-gray-600 ml-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">{renderStepContent()}</div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-between">
              <div>
                {currentStep > 1 && (
                  <Button
                    typeof="button"
                    onClick={prevStep}
                    className="bg-transparent"
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  typeof="button"
                  onClick={onClose}
                  className="bg-transparent"
                >
                  Cancel
                </Button>

                {currentStep < 3 ? (
                  <Button
                    typeof="button"
                    onClick={nextStep}
                    className="bg-gold hover:bg-gold-dark text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    typeof="submit"
                    className="bg-gold hover:bg-gold-dark text-white flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
