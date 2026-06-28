"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import cakesData from "@/data/cakes.json";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getCakes } from "@/lib/adminStore";

const categories = ["All", "Wedding", "Birthday", "Anniversary", "Cupcakes", "Theme"];
const tags = ["All", "Best Seller", "Chocolate", "Eggless Option", "Customisable"];

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cakes, setCakes] = useState(cakesData);

  useEffect(() => {
    setCakes(getCakes());
  }, []);

  const filteredCakes = useMemo(() => {
    let result = cakes;

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((cake) => cake.category === activeCategory);
    }

    // Filter by Tag
    if (activeTag !== "All") {
      result = result.filter((cake) => cake.tags.includes(activeTag));
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (cake) =>
          cake.name.toLowerCase().includes(query) ||
          cake.description.toLowerCase().includes(query) ||
          cake.flavors.some((f) => f.toLowerCase().includes(query))
      );
    }

    return result;
  }, [cakes, activeCategory, activeTag, searchQuery]);

  return (
    <div className="bg-warm-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SchemaMarkup type="breadcrumbs" items={[
        { name: "Home", url: "/" },
        { name: "Catalog", url: "/catalog" }
      ]} />

      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">Patisserie Catalog</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">Our Signature Creations</h1>
        <p className="font-sans text-text-espresso/70 max-w-md mx-auto text-sm">
          Browse through our finest cakes, custom designed for weddings, birthdays, and anniversaries in Coimbatore.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 bg-white/50 backdrop-blur-md p-6 rounded-2xl border border-accent-gold/15">
        
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-espresso/40" />
          <input
            type="text"
            placeholder="Search flavor, cake, occasion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-accent-gold/20 bg-warm-bg/50 focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine font-sans text-sm text-text-espresso"
          />
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans border transition-all ${
                activeCategory === cat
                  ? "bg-primary-wine text-warm-bg border-primary-wine"
                  : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs font-sans text-text-espresso/80">
        <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-accent-gold mr-2">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Filter by tag:
        </span>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-md border transition-all ${
              activeTag === tag
                ? "bg-accent-gold/20 text-primary-wine border-accent-gold"
                : "border-transparent hover:bg-accent-gold/5"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCakes.map((cake) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={cake.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={cake.image}
                  alt={cake.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  {cake.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-wine/90 backdrop-blur-sm text-warm-bg text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-serif text-xl font-bold text-text-espresso">{cake.name}</h3>
                    <span className="font-sans text-base font-bold text-primary-wine shrink-0">
                      ₹{cake.price}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-text-espresso/50 uppercase tracking-widest font-semibold">
                    {cake.category} Cake
                  </p>
                  <p className="font-sans text-sm text-text-espresso/70 line-clamp-2 leading-relaxed pt-1">
                    {cake.description}
                  </p>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-accent-gold/10">
                  <span className="text-xs text-text-espresso/50 font-sans italic">
                    Starting at {cake.sizes[0]}
                  </span>
                  <Link
                    href={`/catalog/${cake.slug}`}
                    className="inline-flex items-center text-xs uppercase font-bold tracking-wider text-primary-wine group-hover:text-accent-gold transition-colors font-sans"
                  >
                    Customize & Order
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results state */}
      {filteredCakes.length === 0 && (
        <div className="text-center py-16 space-y-4">
          <p className="font-serif text-2xl text-text-espresso/60">No delicious matches found.</p>
          <p className="font-sans text-sm text-text-espresso/45">Try adjusting your filters or search keywords.</p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setActiveTag("All");
              setSearchQuery("");
            }}
            className="px-6 py-2 rounded-full border border-primary-wine text-primary-wine text-xs uppercase tracking-wider font-bold hover:bg-primary-wine hover:text-warm-bg transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
