"use client";
import { useState, useMemo } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Search, Filter, Plus } from "lucide-react";
import ProductCard from "./product-card";
import AddProductModal from "./add-product-modal";
import { Button } from "antd";
import { useGetShowingProductsQuery } from "@/redux/features/productApi";
import { useRouter } from "next/navigation";

// Product interface matching your MongoDB structure
interface Product {
  _id: string;
  sku: string;
  title: string;
  parent: string;
  children?: string;
  tags?: string[];
  image: string;
  originalPrice: number;
  price: number;
  discount: number;
  relatedImages?: string[];
  description: string;
  category: {
    name?: string;
    [key: string]: any;
  };
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  // Additional fields for compatibility with ProductCard
  rating?: number;
  reviews?: number;
  isOnSale?: boolean;
  isFeatured?: boolean;
}

// Transformed product interface for ProductCard
interface TransformedProduct {
  id: string;
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

export default function ProductsContent() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  // Fetch products using RTK Query
  const { data, isLoading, isError, error, refetch } =
    useGetShowingProductsQuery(undefined);

  // Debug: Log the response
  console.log("API Response:", data);
  console.log("Loading:", isLoading);
  console.log("Error:", isError, error);

  // Extract products from response
  const products: Product[] = data?.products || data || [];
  console.log("Products array:", products);

  // Temporary: Use mock data if no products loaded (for testing UI)
  const hasMockData = products.length === 0 && !isLoading;
  if (hasMockData) {
    console.warn("No products from API, using mock data for testing");
  }

  // Transform MongoDB product to ProductCard format
  const transformProduct = (product: Product): TransformedProduct => {
    return {
      id: product._id,
      name: product.title,
      category: product.parent,
      price: product.price,
      originalPrice: product.discount > 0 ? product.originalPrice : undefined,
      rating: product.rating || 4.5, // Default rating if not available
      reviews: product.reviews || 0,
      image: product.image,
      isOnSale: product.discount > 0,
      isFeatured: product.status === 'active' && product.quantity > 0,
      description: product.description,
    };
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, number>();
    
    products.forEach((product) => {
      const category = product.parent;
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });

    const categoryList = [
      { name: "All Products", count: products.length },
      ...Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count,
      })),
    ];

    return categoryList.sort((a, b) => {
      if (a.name === "All Products") return -1;
      if (b.name === "All Products") return 1;
      return a.name.localeCompare(b.name);
    });
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.map(transformProduct);

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Handle new product addition
  const handleProductAdded = async (newProduct: any) => {
    try {
      // Refetch products list after adding new product
      await refetch();
      alert("Product added successfully!");
    } catch (err) {
      console.error('Error refreshing products:', err);
      alert("Product added, but failed to refresh the list. Please reload the page.");
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 md:py-24 bg-cream-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-500 mb-4">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Error Loading Products
              </h3>
              <p className="text-gray-500 mb-4">
                {error?.toString() || "Failed to load products. Please try again later."}
              </p>
              <button
                onClick={() => refetch()}
                className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg transition-all duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              {/* Search Bar */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Search Products
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 flex justify-between items-center ${
                          selectedCategory === category.name
                            ? "bg-gold text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory} ({filteredProducts.length} products)
                </h2>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Filter className="h-5 w-5" />
                  <span>Showing {filteredProducts.length} results</span>
                </div>
              </div>
              <Button
                onClick={() => setShowAddProductModal(true)}
                className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isVisible={true}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <AddProductModal
          isOpen={showAddProductModal}
          onClose={() => setShowAddProductModal(false)}
          onProductAdded={handleProductAdded}
        />
      )}
    </section>
  );
}