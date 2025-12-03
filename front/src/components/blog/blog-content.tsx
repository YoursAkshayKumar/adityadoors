"use client";

import { useState, useMemo } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "./blog-card";
import FeaturedPost from "./featured-post";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";

type BlogApiItem = {
  _id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  image?: string;
  tags: string[];
  status: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
};

const toUiPost = (b: BlogApiItem, idx: number) => ({
  id: idx + 1,
  _id: b._id,
  slug: b.slug || b._id,
  title: b.title,
  excerpt: b.excerpt || "",
  author: b.author || "Admin",
  date: (b.updatedAt || b.createdAt || new Date().toISOString()) as string,
  category: (b.tags && b.tags[0]) || "General",
  tags: b.tags || [],
  image: b.image || "",
  readTime: "5 min read",
  featured: idx < 2,
});

const unique = (arr: string[]) => Array.from(new Set(arr));

export default function BlogContent() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [selectedTag, setSelectedTag] = useState("");
  const { data, isLoading, isError } = useGetAllBlogsQuery({});

  const blogItems = (data?.result || []) as BlogApiItem[];
  const uiPosts = useMemo(() => blogItems.filter(b => b.status === "Show").map((b, idx) => toUiPost(b, idx)), [blogItems]);

  const categories = useMemo(() => {
    const tags = unique(uiPosts.flatMap(p => p.tags));
    return [{ name: "All Posts", count: uiPosts.length }, ...tags.map(tag => ({ name: tag, count: uiPosts.filter(p => p.tags.includes(tag)).length }))];
  }, [uiPosts]);

  const popularTags = useMemo(() => {
    const counts: Record<string, number> = {};
    uiPosts.forEach(p => p.tags.forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,10).map(([t]) => t);
  }, [uiPosts]);

  const filteredPosts = useMemo(() => {
    let filtered = uiPosts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by category
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter((post) => post.tags.includes(selectedCategory) || post.category === selectedCategory);
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedTag, uiPosts]);

  const featuredPosts = uiPosts.filter((post) => post.featured);
  //   const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Featured Posts Section */}
        {selectedCategory === "All Posts" && !searchTerm && !selectedTag && (
          <div className="mb-16">
            <div
              className={`text-center mb-12 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured <span className="text-gold">Articles</span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Do not miss our most popular and insightful articles about
                windows, doors, and home improvement.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <FeaturedPost
                  key={post.id}
                  post={post}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Search and Filter Bar */}
            <div
              className={`bg-white rounded-lg shadow-lg p-6 mb-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              {selectedTag && (
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-600 mr-2">
                    Filtered by tag:
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-gold text-white text-sm rounded-full">
                    {selectedTag}
                    <button
                      onClick={() => setSelectedTag("")}
                      className="ml-2 hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                </div>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div
              className={`mb-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === "All Posts"
                  ? "Latest Articles"
                  : selectedCategory}
              </h2>
              <p className="text-gray-600">
                Showing {filteredPosts.length} articles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading && (
                <div className="text-center py-12"><h3 className="text-xl font-semibold text-gray-600">Loading...</h3></div>
              )}
              {!isLoading && !isError && filteredPosts.map((post, index) => (
                <BlogCard
                  key={post._id || post.id}
                  post={post}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {!isLoading && filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div
              className={`space-y-8 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-12"
              }`}
            >
              {/* Categories Widget */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedTag("");
                        }}
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

              {/* Popular Tags Widget */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${
                        selectedTag === tag
                          ? "bg-gold text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {(!isLoading && !isError ? uiPosts.slice(0, 3) : []).map((post) => (
                    <Link key={post._id || post.id} href={`/blog/${post._id || post.id}`} className="flex space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-300">
                      {post.image ? (
                        <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden bg-gray-200">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <span className="text-xs text-gray-500">IMG</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-gold transition-colors duration-300 cursor-pointer">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {post.date ? (() => {
                            try {
                              const date = new Date(post.date);
                              return !isNaN(date.getTime()) ? date.toLocaleDateString() : 'Invalid date';
                            } catch {
                              return 'Invalid date';
                            }
                          })() : 'No date'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-[#2a1c16] text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Subscribe to our newsletter for the latest tips, trends, and
                  exclusive offers.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <button className="w-full bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center">
                    Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
