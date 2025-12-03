"use client";

import { Button, Image } from "antd";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
// import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number;
  _id?: string;
  slug?: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  readTime: string;
  featured: boolean;
}

interface FeaturedPostProps {
  post: BlogPost;
  index: number;
  isVisible: boolean;
}

export default function FeaturedPost({
  post,
  index,
  isVisible,
}: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug || post._id || post.id}`}>
      <article
        className={`bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-700 hover:shadow-xl cursor-pointer ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-12"
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
      >
      {/* Featured Image */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              display: "block"
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm">Featured Image</p>
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-gold text-white px-3 py-1 text-xs font-bold rounded-full">
            FEATURED
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </span>
        </div>

        <div className="mb-2">
          <span className="text-xs text-gold font-medium uppercase tracking-wide">
            {post.category}
          </span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/blog/${post.slug || post._id || post.id}`}>
            <Button className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm">
              Read More <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
    </Link>
  );
}
