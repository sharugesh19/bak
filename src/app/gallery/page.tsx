"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

const galleryImages = [
  { id: "g1", src: "/cake_wedding.jpg", title: "Antique Gold Wedding Cake", category: "Wedding" },
  { id: "g2", src: "/cake_chocolate.jpg", title: "Classic Belgian Chocolate Ganache", category: "Chocolate" },
  { id: "g3", src: "/cake_birthday.jpg", title: "Whimsical Starry Birthday Cake", category: "Birthday" },
  { id: "g4", src: "/cake_cupcakes.jpg", title: "Rose Gold Buttercream Cupcakes", category: "Cupcakes" },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
    title: "Double Chocolate Drip Cake",
    category: "Chocolate",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=800&auto=format&fit=crop&q=80",
    title: "Fresh Mango Cream Cake",
    category: "Fruit",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=800&auto=format&fit=crop&q=80",
    title: "Luxury Red Velvet Swirl",
    category: "Classic",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80",
    title: "Assorted French Macarons",
    category: "Dessert",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const categories = ["All", "Wedding", "Birthday", "Chocolate", "Cupcakes", "Dessert"];

  const filteredImages =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div className="bg-warm-bg min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SchemaMarkup
        type="breadcrumbs"
        items={[
          { name: "Home", url: "/" },
          { name: "Gallery", url: "/gallery" },
        ]}
      />

      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">
          Bespoke Gallery
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">
          Our Patisserie Portfolio
        </h1>
        <p className="font-sans text-text-espresso/70 max-w-md mx-auto text-sm">
          A showcase of our luxury handcrafted celebration cakes and artisan pastries prepared in Coimbatore.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider font-sans border transition-all ${
              activeFilter === cat
                ? "bg-primary-wine text-warm-bg border-primary-wine shadow-md"
                : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fluid Photo Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative h-80 group overflow-hidden rounded-2xl shadow-md border border-accent-gold/15 cursor-zoom-in glass-card flex flex-col justify-end p-5"
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-w-640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text-espresso/90 via-text-espresso/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow">
                <ZoomIn className="w-4.5 h-4.5 text-primary-wine" />
              </div>

              <div className="relative z-20 space-y-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="text-[9px] uppercase tracking-widest text-accent-gold font-bold font-sans">
                  {img.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-warm-bg leading-tight">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-text-espresso/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 bg-warm-bg/10 rounded-full text-warm-bg hover:bg-warm-bg/25 focus:outline-none transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-3xl w-full aspect-square border border-accent-gold/20 p-2.5 bg-warm-bg rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <div className="relative w-full h-[85%] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 800px"
                />
              </div>
              <div className="p-4 flex flex-col justify-center h-[15%] space-y-1">
                <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">
                  {selectedImage.category} Collection
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-text-espresso leading-tight">
                  {selectedImage.title}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
