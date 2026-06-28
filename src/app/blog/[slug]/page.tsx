import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Anah Cakes Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient initialPost={post} />;
}
