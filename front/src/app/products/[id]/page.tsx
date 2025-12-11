"use client";

import { use } from "react";
import ProductDetail from "../../../components/products/product-details";

interface PageProps {
  params: Promise<{
    id: string; // slug value
  }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return <ProductDetail productId={id} />;
}