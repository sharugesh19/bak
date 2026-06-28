import { notFound } from "next/navigation";
import cakesData from "@/data/cakes.json";
import ProductDetails from "./ProductDetails";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cakesData.map((cake) => ({
    slug: cake.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cake = cakesData.find((c) => c.slug === slug);
  if (!cake) return {};

  return {
    title: `${cake.name} | Anah Cakes`,
    description: cake.description,
    openGraph: {
      title: `${cake.name} | Anah Cakes Coimbatore`,
      description: cake.description,
      images: [
        {
          url: cake.image,
          alt: cake.name,
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cake = cakesData.find((c) => c.slug === slug);
  
  if (!cake) {
    notFound();
  }

  // Get related cakes (same category, excluding current cake)
  const relatedCakes = cakesData
    .filter((c) => c.slug !== slug && (c.category === cake.category || c.tags.includes("Best Seller")))
    .slice(0, 3);

  return <ProductDetails cake={cake} relatedCakes={relatedCakes} />;
}
