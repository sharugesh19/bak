import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import blogData from "@/data/blog.json";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata = {
  title: "Patisserie Blog & Baking Guides | Anah Cakes",
  description: "Read helpful guides, sizing tips, and patisserie science articles from the experts at Anah Cakes in Coimbatore.",
};

export default function BlogIndexPage() {
  return (
    <div className="bg-warm-bg min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SchemaMarkup
        type="breadcrumbs"
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">
          Baking Wisdom
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">
          The Patisserie Journal
        </h1>
        <p className="font-sans text-text-espresso/70 max-w-md mx-auto text-sm">
          Guides, tips, and insights on choosing cake sizes, custom designs, and storing fresh desserts.
        </p>
      </div>

      {/* Blog Post List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {blogData.map((post) => (
          <article
            key={post.slug}
            className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-xl transition-all"
          >
            <div className="space-y-4">
              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-xs font-sans text-text-espresso/50">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title & Desc */}
              <h2 className="font-serif text-2xl font-bold text-text-espresso hover:text-primary-wine transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="font-sans text-sm text-text-espresso/75 leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            {/* Link CTA */}
            <div className="pt-4 border-t border-accent-gold/15 flex justify-between items-center">
              <span className="text-xs font-sans font-semibold text-text-espresso/50">
                By {post.author}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-xs uppercase font-bold tracking-wider text-primary-wine hover:text-accent-gold transition-colors font-sans group"
              >
                Read Article
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
