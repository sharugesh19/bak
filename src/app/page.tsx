"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, Sparkles, Truck, Clock } from "lucide-react";
import cakesData from "@/data/cakes.json";
import testimonialsData from "@/data/testimonials.json";
import SchemaMarkup from "@/components/SchemaMarkup";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  const bestSellers = cakesData.filter((cake) => cake.tags.includes("Best Seller"));
  const categories = [
    { name: "Wedding", image: "/cake_wedding.jpg", desc: "Grand multi-tier masterpieces" },
    { name: "Birthday", image: "/cake_birthday.jpg", desc: "Whimsical theme designs for all ages" },
    { name: "Anniversary", image: "/cake_chocolate.jpg", desc: "Rich chocolate & red velvet classics" },
    { name: "Cupcakes", image: "/cake_cupcakes.jpg", desc: "Luxury bite-sized boxes of joy" },
  ];

  return (
    <div className="relative overflow-hidden bg-warm-bg">
      <SchemaMarkup type="localBusiness" />
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col space-y-6 z-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 bg-accent-gold/10 border border-accent-gold/20 px-3.5 py-1.5 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-accent-gold" />
              <span className="text-xs uppercase tracking-widest text-primary-wine font-semibold font-sans">
                Coimbatore&apos;s Finest Patisserie
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-espresso leading-[1.1]"
            >
              Crafting Luxury <br />
              <span className="text-gold-gradient">Celebration Cakes</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="font-sans text-lg text-text-espresso/80 max-w-lg leading-relaxed"
            >
              Anah Cakes brings premium French patisserie standards and bespoke custom designs to Tamil Nadu. Every cake is baked fresh on order using Belgium chocolates and organic dairy.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary-wine text-warm-bg font-sans text-sm font-semibold uppercase tracking-wider hover:bg-wine-gradient shadow-lg transition-all duration-300 group"
              >
                Browse Catalog
                <ArrowRight className="w-4.5 h-4.5 ml-2.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/custom-order"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-primary-wine text-primary-wine font-sans text-sm font-semibold uppercase tracking-wider hover:bg-primary-wine/5 transition-all duration-300"
              >
                Order Custom Design
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            {/* Elegant Background Glow */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-accent-gold/10 blur-[100px] z-0" />
            
            {/* Border frame */}
            <div className="relative border border-accent-gold/30 p-4 rounded-3xl z-10 glass-card">
              <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/cake_wedding.jpg"
                  alt="Anah Cakes signature wedding cake"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-w-640px) 320px, 420px"
                />
              </div>
            </div>

            {/* Micro Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-4 sm:right-10 bg-text-espresso border border-accent-gold/30 text-warm-bg px-4 py-2.5 rounded-2xl shadow-xl flex flex-col z-20"
            >
              <span className="font-serif text-lg font-bold text-accent-gold">100%</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold font-sans text-warm-bg/75">
                Eggless Options
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-text-espresso py-8 border-y border-accent-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-warm-bg">
            <div className="flex flex-col items-center space-y-1">
              <ShieldCheck className="w-6 h-6 text-accent-gold mb-1" />
              <span className="font-sans text-xs uppercase tracking-widest font-semibold">100% Hygienic Kitchen</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Sparkles className="w-6 h-6 text-accent-gold mb-1" />
              <span className="font-sans text-xs uppercase tracking-widest font-semibold">Premium Belgian Cocoa</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Truck className="w-6 h-6 text-accent-gold mb-1" />
              <span className="font-sans text-xs uppercase tracking-widest font-semibold">Coimbatore Hand Delivery</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <Clock className="w-6 h-6 text-accent-gold mb-1" />
              <span className="font-sans text-xs uppercase tracking-widest font-semibold">Custom Order Consults</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BEST SELLERS GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">Highly Recommended</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">Our Signature Bestsellers</h2>
          <p className="font-sans text-text-espresso/70 max-w-md mx-auto">Discover the flavors that have captured the hearts of Coimbatore’s food connoisseurs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((cake) => (
            <motion.div
              key={cake.id}
              whileHover={{ y: -8 }}
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
                <div className="absolute top-4 left-4 flex gap-2">
                  {cake.tags.map((tag) => (
                    <span key={tag} className="bg-primary-wine/90 backdrop-blur-sm text-warm-bg text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow space-y-3 justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif text-xl font-bold text-text-espresso">{cake.name}</h3>
                    <span className="font-sans text-lg font-bold text-primary-wine">₹{cake.price}</span>
                  </div>
                  <p className="font-sans text-sm text-text-espresso/70 mt-2 line-clamp-2 leading-relaxed">
                    {cake.description}
                  </p>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-accent-gold/10">
                  <span className="text-xs text-text-espresso/50 font-sans italic">Starting at {cake.sizes[0]}</span>
                  <Link
                    href={`/catalog/${cake.slug}`}
                    className="inline-flex items-center text-xs uppercase font-bold tracking-wider text-primary-wine group-hover:text-accent-gold transition-colors font-sans"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CATEGORY TILES */}
      <section className="bg-accent-gold/5 py-20 px-4 sm:px-6 lg:px-8 border-y border-accent-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">Handcrafted Selections</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">Explore Our Categories</h2>
            <p className="font-sans text-text-espresso/70 max-w-md mx-auto">Find the perfect match for your celebration scale and style.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/catalog?category=${cat.name}`}
                className="relative h-96 group overflow-hidden rounded-2xl shadow-md border border-accent-gold/10 flex flex-col justify-end p-6"
              >
                <Image
                  src={cat.image}
                  alt={`${cat.name} cakes category`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75]"
                  sizes="(max-w-640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-espresso/90 via-text-espresso/30 to-transparent z-0" />
                <div className="relative z-10 space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-warm-bg tracking-wide group-hover:text-accent-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs text-warm-bg/75 leading-relaxed group-hover:opacity-100 transition-opacity">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND PHILOSOPHY / WHY ANAH */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">The Patisserie Standard</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">Why Anah Cakes Stands Out</h2>
          <p className="font-sans text-text-espresso/80 leading-relaxed">
            At Anah Cakes, we believe that a celebration cake should be as magical to eat as it is beautiful to look at. We do not use commercial pre-mixes, margarine, or artificial preservatives.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-wine/10 border border-primary-wine/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary-wine" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-text-espresso">French-trained Recipes</h4>
                <p className="font-sans text-sm text-text-espresso/70 mt-1 leading-relaxed">
                  Traditional baking methodologies combined with artistic presentation styles to create elegant structures.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-wine/10 border border-primary-wine/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary-wine" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-text-espresso">Organic Ingredients</h4>
                <p className="font-sans text-sm text-text-espresso/70 mt-1 leading-relaxed">
                  Pure dairy cream, butter, and authentic organic vanilla beans. No heavy preservatives.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square sm:max-w-md mx-auto border border-accent-gold/20 p-3.5 rounded-3xl glass-card">
          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=60"
              alt="Anah Cakes clean baking workshop"
              fill
              className="object-cover"
              sizes="(max-w-640px) 100vw, 400px"
            />
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="bg-text-espresso text-warm-bg py-20 px-4 sm:px-6 lg:px-8 border-t border-accent-gold/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">Verified Love</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-accent-gold">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonialsData.map((item) => (
              <div key={item.id} className="border border-warm-bg/15 p-6 rounded-2xl bg-warm-bg/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex text-accent-gold">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent-gold" />
                    ))}
                  </div>
                  <p className="font-sans text-sm text-warm-bg/85 leading-relaxed italic">
                    &quot;{item.review}&quot;
                  </p>
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-accent-gold tracking-wide">{item.name}</h4>
                  <span className="text-[10px] text-warm-bg/50 font-sans block mt-0.5">Ordered: {item.cake}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
