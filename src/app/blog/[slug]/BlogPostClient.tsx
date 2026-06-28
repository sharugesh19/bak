"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getBlogPosts } from "@/lib/adminStore";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  content: string;
}

interface BlogPostClientProps {
  initialPost: BlogPost;
}

export default function BlogPostClient({ initialPost }: BlogPostClientProps) {
  const [post, setPost] = useState(initialPost);

  useEffect(() => {
    const localPosts = getBlogPosts();
    const found = localPosts.find((p) => p.slug === initialPost.slug);
    if (found) {
      setPost(found);
    }
  }, [initialPost.slug]);

  // Simple renderer to convert text content into styled semantic elements
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, idx) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={idx} className="font-serif text-2xl font-bold text-text-espresso mt-8 mb-4">
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("- ")) {
        const listItems = block.split("\n").map((item) => item.replace("- ", ""));
        return (
          <ul key={idx} className="list-disc pl-6 my-4 font-sans text-text-espresso/80 space-y-2">
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={idx} className="font-sans text-base text-text-espresso/80 leading-relaxed my-4">
          {block}
        </p>
      );
    });
  };

  return (
    <article className="bg-warm-bg min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SchemaMarkup
        type="breadcrumbs"
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm font-semibold tracking-wide text-primary-wine hover:text-accent-gold transition-colors mb-8 group font-sans"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Patisserie Journal
      </Link>

      {/* Article Header */}
      <header className="space-y-6 mb-12">
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-text-espresso leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm font-sans text-text-espresso/60 border-y border-accent-gold/15 py-4">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            By {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
      </header>

      {/* Article Body */}
      <div className="prose prose-stone max-w-none">
        {renderContent(post.content)}
      </div>

      {/* Footer CTA */}
      <div className="mt-16 bg-accent-gold/5 border border-accent-gold/15 p-8 rounded-3xl text-center space-y-6">
        <h3 className="font-serif text-2xl font-bold text-text-espresso">Celebrating a Milestone?</h3>
        <p className="font-sans text-sm text-text-espresso/70 max-w-md mx-auto leading-relaxed">
          Order your customized birthday, wedding, or anniversary cake. Safe delivery anywhere in Coimbatore.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/custom-order"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-wine text-warm-bg font-sans text-xs font-bold uppercase tracking-wider hover:bg-wine-gradient shadow-md transition-all"
          >
            Design Custom Cake
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary-wine text-primary-wine font-sans text-xs font-bold uppercase tracking-wider hover:bg-primary-wine/5 transition-all"
          >
            Browse Signature Cakes
          </Link>
        </div>
      </div>
    </article>
  );
}
