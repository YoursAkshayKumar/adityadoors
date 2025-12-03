"use client";

import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Image } from "antd";
import Link from "next/link";

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

interface BlogCardProps {
  post: BlogPost;
  index: number;
  isVisible: boolean;
}

export default function BlogCard({ post, index, isVisible }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug || post._id || post.id}`}>
      <article
        className={`bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-700 hover:shadow-xl hover:transform hover:scale-105 cursor-pointer ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-12"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={400}
            height={192}
            className="w-full h-full object-cover"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            preview={false}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
              <p className="text-xs">Article Image</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center space-x-3 text-xs text-gray-500 mb-3">
          <span className="inline-flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </span>
        </div>

        <div className="mb-2">
          <span className="text-xs text-gold font-medium uppercase tracking-wide">
            {post.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-end">
          <Link 
            href={`/blog/${post.slug || post._id || post.id}`}
            className="inline-flex items-center text-gold hover:text-gold-dark transition-colors duration-300 text-sm font-medium"
          >
            Read More <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
    </Link>
  );
}
