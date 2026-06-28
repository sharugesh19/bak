"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldAlert, Award, Calendar } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AboutPage() {
  return (
    <div className="bg-warm-bg py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SchemaMarkup type="breadcrumbs" items={[
        { name: "Home", url: "/" },
        { name: "About", url: "/about" }
      ]} />
      
      {/* 1. Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="text-center space-y-4 mb-16"
      >
        <motion.span variants={fadeInUp} className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">
          Our Story
        </motion.span>
        <motion.h1 variants={fadeInUp} className="font-serif text-4xl sm:text-6xl font-bold text-text-espresso">
          The Art of Baking with Love
        </motion.h1>
        <motion.p variants={fadeInUp} className="font-sans text-text-espresso/70 max-w-xl mx-auto leading-relaxed">
          Founded in Coimbatore, Anah Cakes was born out of a passion to redefine luxury baking in Tamil Nadu. We believe every cake should tell a story.
        </motion.p>
      </motion.div>

      {/* 2. Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-accent-gold/20 p-2 glass-card"
        >
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=60"
              alt="Anah Cakes chef baking custom decorations"
              fill
              className="object-cover"
              sizes="(max-w-640px) 100vw, 550px"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-3xl font-bold text-text-espresso">Our Culinary Philosophy</h2>
          <p className="font-sans text-text-espresso/80 leading-relaxed">
            It all started in a small family kitchen in RS Puram. Our founder, a passionate patissier, set out with a simple goal: to bake cakes that are not only visual masterpieces but also culinary marvels. No artificial chemicals, no hydrogenated fats, just pure gourmet goodness.
          </p>
          <p className="font-sans text-text-espresso/80 leading-relaxed">
            Today, Anah Cakes operates a fully hygienic boutique kitchen, preparing every component from scratch — from our signature caramel drip to hand-crafted fondant details. We specialize in catering to dietary requirements, offering Coimbatore&apos;s softest eggless sponge options.
          </p>
          <div className="pt-4 border-t border-accent-gold/20 flex gap-8">
            <div>
              <span className="font-serif text-3xl font-bold text-primary-wine">100%</span>
              <p className="text-xs uppercase tracking-wider text-text-espresso/60 font-sans font-semibold mt-1">
                Preservative Free
              </p>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-primary-wine">5,000+</span>
              <p className="text-xs uppercase tracking-wider text-text-espresso/60 font-sans font-semibold mt-1">
                Happy Customers
              </p>
            </div>
            <div>
              <span className="font-serif text-3xl font-bold text-primary-wine">8+ Yrs</span>
              <p className="text-xs uppercase tracking-wider text-text-espresso/60 font-sans font-semibold mt-1">
                Of Craftsmanship
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Hygiene & Safety Commitments */}
      <section className="bg-text-espresso text-warm-bg rounded-3xl p-8 sm:p-12 border border-accent-gold/20 shadow-xl mb-24">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-accent-gold">Our Hygiene & Quality Pillars</h3>
            <p className="font-sans text-sm text-warm-bg/70">How we maintain the highest patisserie safety standard in Tamil Nadu.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldAlert className="w-8 h-8 text-accent-gold mb-2" />
              <h4 className="font-serif text-lg font-semibold text-warm-bg">Safe Handling</h4>
              <p className="text-xs text-warm-bg/85 font-sans leading-relaxed">
                Temperature-regulated kitchen, strict sanitation rules, and contactless delivery.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Award className="w-8 h-8 text-accent-gold mb-2" />
              <h4 className="font-serif text-lg font-semibold text-warm-bg">Premium Sourcing</h4>
              <p className="text-xs text-warm-bg/85 font-sans leading-relaxed">
                Fine Belgian chocolate, Madagascan vanilla pods, and organic unsalted farm butter.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Calendar className="w-8 h-8 text-accent-gold mb-2" />
              <h4 className="font-serif text-lg font-semibold text-warm-bg">Baked on Order</h4>
              <p className="text-xs text-warm-bg/85 font-sans leading-relaxed">
                We never freeze sponge. Every cake is baked, filled, and iced fresh for your date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Action Call */}
      <div className="text-center space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-text-espresso">Ready to Celebrate with Us?</h3>
        <p className="font-sans text-text-espresso/70 max-w-sm mx-auto text-sm">
          Discuss your wedding design or customized party cake with our head baker over WhatsApp.
        </p>
        <Link
          href="/custom-order"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary-wine text-warm-bg font-sans text-sm font-semibold uppercase tracking-wider hover:bg-wine-gradient shadow-lg transition-all"
        >
          Consult Our Baker
        </Link>
      </div>
    </div>
  );
}
