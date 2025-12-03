"use client";

import { use } from "react";
import BlogDetail from "../../../components/blog/blog-detail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  return <BlogDetail blogSlug={slug} />;
}

