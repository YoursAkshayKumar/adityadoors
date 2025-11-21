import ProductDetail from "../../../components/products/product-details";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetail productId={id} />;
}

// Optional: Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  await params;
  return {
    title: `Product Details - Aditya Doors`,
    description: `View product details`,
  };
}