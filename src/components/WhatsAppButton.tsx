"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const whatsappNumber = "919876543210";
  const defaultMessage = encodeURIComponent("Hi Anah Cakes! I'd like to inquire about ordering a cake.");
  const url = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Label Tooltip */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-text-espresso text-warm-bg text-xs font-semibold tracking-wider uppercase border border-accent-gold/20 shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Order on WhatsApp
      </span>
      
      {/* Floating Action Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl focus:outline-none cursor-pointer border border-emerald-400/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -4px rgba(16, 185, 129, 0.3)",
            "0 10px 25px 5px rgba(16, 185, 129, 0.5), 0 10px 10px -5px rgba(16, 185, 129, 0.5)",
            "0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -4px rgba(16, 185, 129, 0.3)"
          ]
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </motion.a>
    </div>
  );
}
