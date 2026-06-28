"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getCakes } from "@/lib/adminStore";

interface Cake {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
  flavors: string[];
  sizes: string[];
}

interface ProductDetailsProps {
  cake: Cake;
  relatedCakes: Cake[];
}

export default function ProductDetails({ cake, relatedCakes }: ProductDetailsProps) {
  const [currentCake, setCurrentCake] = useState(cake);
  const [selectedSize, setSelectedSize] = useState(cake.sizes[0]);
  const [selectedFlavor, setSelectedFlavor] = useState(cake.flavors[0]);
  const [isEggless, setIsEggless] = useState(true); // default to eggless since it's highly searched locally

  useEffect(() => {
    const localCakes = getCakes();
    const found = localCakes.find((c) => c.slug === cake.slug);
    if (found) {
      setCurrentCake(found);
      setSelectedSize(found.sizes[0]);
      setSelectedFlavor(found.flavors[0]);
    }
  }, [cake.slug]);

  const businessNumber = "919876543210";

  // Calculate pricing adjustment based on size (e.g. 1kg is base, 2kg is +80%, 3kg/5kg/7kg scaled)
  const getPriceMultiplier = (size: string) => {
    if (size.includes("0.5kg") || size.includes("Box")) return 1;
    if (size.includes("1.5kg")) return 1.5;
    if (size.includes("2kg")) return 1.9;
    if (size.includes("3kg")) return 2.7;
    if (size.includes("5kg")) return 4.5;
    if (size.includes("7kg")) return 6.2;
    return 1; // 1kg base
  };

  const calculatedPrice = Math.round(currentCake.price * getPriceMultiplier(selectedSize));

  const textMessage = `Hi Anah Cakes! I'd like to order:
- Cake: ${currentCake.name}
- Size: ${selectedSize}
- Flavor: ${selectedFlavor}
- Preparation: ${isEggless ? "100% Eggless" : "Standard (Contains Egg)"}

Preferred Delivery Date: _________________
Delivery Area in Coimbatore: _________________`;

  const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(textMessage)}`;

  return (
    <div className="bg-warm-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Schemas */}
      <SchemaMarkup
        type="product"
        name={currentCake.name}
        image={currentCake.image}
        description={currentCake.description}
        price={calculatedPrice}
        slug={currentCake.slug}
      />
      <SchemaMarkup
        type="breadcrumbs"
        items={[
          { name: "Home", url: "/" },
          { name: "Catalog", url: "/catalog" },
          { name: currentCake.name, url: `/catalog/${currentCake.slug}` },
        ]}
      />

      {/* Back to Catalog Link */}
      <Link
        href="/catalog"
        className="inline-flex items-center text-sm font-semibold tracking-wide text-primary-wine hover:text-accent-gold transition-colors mb-8 group font-sans"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
        {/* Left Column: Image Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative aspect-square border border-accent-gold/20 p-4 rounded-3xl glass-card w-full max-w-lg mx-auto"
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
            {currentCake.image ? (
              <Image
                src={currentCake.image}
                alt={currentCake.name}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-w-768px) 100vw, 500px"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">No Image Available</div>
            )}
          </div>
        </motion.div>

        {/* Right Column: Customizer & Action Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6 flex flex-col"
        >
          {/* Title & Tags */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <span className="bg-accent-gold/15 text-primary-wine text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md font-sans">
                {currentCake.category} Selection
              </span>
              {currentCake.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-text-espresso text-warm-bg text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1 rounded-md font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-text-espresso">
              {currentCake.name}
            </h1>
            <div className="flex items-center gap-4 pt-1">
              <span className="font-sans text-3xl font-extrabold text-primary-wine">
                ₹{calculatedPrice}
              </span>
              <span className="text-xs text-text-espresso/50 font-sans italic">
                *Estimated based on selections
              </span>
            </div>
          </div>

          <hr className="border-accent-gold/15" />

          {/* Description */}
          <p className="font-sans text-base text-text-espresso/80 leading-relaxed">
            {currentCake.description}
          </p>

          {/* Configuration Form */}
          <div className="space-y-5">
            {/* Size Selector */}
            <div className="space-y-2.5">
              <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                Select Weight / Size
              </span>
              <div className="flex flex-wrap gap-2.5">
                {currentCake.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-sans border transition-all ${
                      selectedSize === size
                        ? "bg-primary-wine text-warm-bg border-primary-wine shadow-md"
                        : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Selector */}
            {currentCake.flavors.length > 0 && (
              <div className="space-y-2.5">
                <label
                  htmlFor="flavor-select"
                  className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block"
                >
                  Choose Sponge / Flavor
                </label>
                <select
                  id="flavor-select"
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                  className="w-full max-w-xs px-3.5 py-2.5 rounded-xl border border-accent-gold/25 bg-white font-sans text-sm focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine text-text-espresso"
                >
                  {currentCake.flavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Eggless Option toggle */}
            <div className="flex items-center gap-4 bg-accent-gold/5 p-4 rounded-2xl border border-accent-gold/10 w-fit">
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-widest text-primary-wine font-sans">
                  Eggless Preference
                </span>
                <span className="text-[10px] text-text-espresso/60 font-sans mt-0.5">
                  Prepared in 100% sanitized eggless utensils
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEggless(!isEggless)}
                className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isEggless ? "bg-emerald-500" : "bg-text-espresso/20"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isEggless ? "translate-x-5.5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <hr className="border-accent-gold/15" />

          {/* Checkout CTA */}
          <div className="space-y-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-sm font-bold uppercase tracking-wider shadow-lg transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 mr-3 fill-white text-emerald-500 group-hover:scale-110 transition-transform" />
              Order via WhatsApp
            </a>
            
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-text-espresso/60 font-sans">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              No prepayment required. Details will be finalized on chat.
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products Grid */}
      {relatedCakes.length > 0 && (
        <section className="border-t border-accent-gold/15 pt-16">
          <h2 className="font-serif text-3xl font-bold text-text-espresso mb-10 text-center">
            You May Also Delight In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedCakes.map((relCake) => (
              <Link
                key={relCake.id}
                href={`/catalog/${relCake.slug}`}
                className="glass-card rounded-2xl overflow-hidden group flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={relCake.image}
                    alt={relCake.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-text-espresso group-hover:text-primary-wine transition-colors">
                      {relCake.name}
                    </h3>
                    <p className="font-sans text-xs text-text-espresso/50 mt-1 uppercase tracking-widest">
                      {relCake.category}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-accent-gold/10 mt-4 flex justify-between items-center text-xs">
                    <span className="font-sans font-bold text-primary-wine">₹{relCake.price}</span>
                    <span className="uppercase font-bold tracking-wider text-primary-wine group-hover:text-accent-gold transition-colors flex items-center font-sans">
                      View Cake
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
