"use client";

import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "antd";
import { useGetBlogBySlugQuery } from "@/redux/features/blog/blogApi";

interface BlogDetailProps {
  blogSlug: string;
}

export default function BlogDetail({ blogSlug }: BlogDetailProps) {
  // Decode the slug in case it's URL encoded, with error handling
  let decodedSlug = blogSlug;
  try {
    decodedSlug = decodeURIComponent(blogSlug);
  } catch (e) {
    // If decoding fails, use the original slug
    decodedSlug = blogSlug;
  }
  
  const { data: blog, isLoading, isError } = useGetBlogBySlugQuery(decodedSlug, {
    skip: !decodedSlug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you are looking for does not exist or there was an error loading it.
          </p>
          <Link href="/blog">
            <Button className="bg-gold hover:bg-gold-dark text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  const formattedDate = (() => {
    try {
      if (blog.updatedAt) {
        const date = new Date(blog.updatedAt);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        }
      }
      if (blog.createdAt) {
        const date = new Date(blog.createdAt);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        }
      }
      return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (e) {
      return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  })();

  // Calculate read time based on content length (average reading speed: 200 words per minute)
  const wordCount = blog.content && typeof blog.content === 'string' 
    ? blog.content.split(/\s+/).filter((word: string) => word.length > 0).length 
    : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-[#2a1c16] py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gold to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button className="mb-6 bg-transparent border-gold text-gold hover:bg-gold hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <div>
              {blog.tags && blog.tags.length > 0 && blog.tags[0] && (
                <div className="mb-4">
                  <span className="inline-block bg-gold px-4 py-1 text-white text-sm font-medium rounded-full">
                    {String(blog.tags[0]).toUpperCase()}
                  </span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm md:text-base">
                <span className="inline-flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Featured Image */}
              {blog.image && (
                <div className="relative w-full h-64 md:h-96 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="p-6 md:p-8 lg:p-12">
                {/* Excerpt */}
                {blog.excerpt && (
                  <div className="mb-8 p-4 bg-gold/10 border-l-4 border-gold rounded">
                    <p className="text-lg text-gray-700 italic">{blog.excerpt}</p>
                  </div>
                )}

                {/* Main Content */}
                {blog.content && typeof blog.content === 'string' ? (
                  <div 
                    className="prose prose-lg max-w-none mb-8 blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <div className="mb-8">
                    <p className="text-gray-600">No content available for this blog post.</p>
                  </div>
                )}

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gold hover:text-white transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">Share this article:</span>
                    <div className="flex items-center gap-3">
                      <Button 
                        type="default" 
                        className="flex items-center"
                        onClick={() => {
                          if (typeof window !== 'undefined' && navigator.share) {
                            navigator.share({
                              title: blog.title,
                              text: blog.excerpt || '',
                              url: window.location.href,
                            }).catch(() => {
                              // User cancelled or error occurred
                            });
                          } else if (typeof window !== 'undefined' && navigator.clipboard) {
                            navigator.clipboard.writeText(window.location.href).then(() => {
                              alert("Link copied to clipboard!");
                            }).catch(() => {
                              alert("Failed to copy link. Please copy manually.");
                            });
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Blog Button */}
            <div className="mt-8 text-center">
              <Link href="/blog">
                <Button className="bg-gold hover:bg-gold-dark text-white px-6 py-2">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          color: #1f2937;
          font-weight: bold;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }
        .blog-content h1 {
          font-size: 2em;
        }
        .blog-content h2 {
          font-size: 1.5em;
        }
        .blog-content h3 {
          font-size: 1.25em;
        }
        .blog-content p {
          margin-bottom: 1.25em;
          line-height: 1.75;
          color: #374151;
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.25em;
          padding-left: 1.5em;
        }
        .blog-content li {
          margin-bottom: 0.5em;
          line-height: 1.75;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5em 0;
        }
        .blog-content a {
          color: #d4af37;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #b8941f;
        }
        .blog-content blockquote {
          border-left: 4px solid #d4af37;
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: #6b7280;
        }
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
        }
        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
        }
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
        }
        `
      }} />
    </div>
  );
}

