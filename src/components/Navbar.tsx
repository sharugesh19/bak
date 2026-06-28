"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/custom-order", label: "Custom Cake" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-nav w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start select-none">
            <span className="font-serif text-2xl font-bold tracking-wide text-primary-wine">
              ANAH <span className="text-accent-gold">CAKES</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-espresso/60 -mt-1 font-sans">
              Premium Patisserie
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 py-2 ${
                    isActive ? "text-primary-wine" : "text-text-espresso/80 hover:text-primary-wine"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-gold"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/custom-order"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-primary-wine text-primary-wine font-sans text-xs font-semibold uppercase tracking-wider hover:bg-primary-wine hover:text-warm-bg transition-all duration-300 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Design Custom Cake
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-espresso hover:text-primary-wine focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-accent-gold/10 bg-warm-bg"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-sans text-base font-semibold tracking-wide py-3 px-2 border-b border-accent-gold/5 transition-colors ${
                      isActive ? "text-primary-wine bg-accent-gold/5" : "text-text-espresso/90 hover:text-primary-wine"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 px-2">
                <Link
                  href="/custom-order"
                  onClick={() => setIsOpen(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-wine text-warm-bg font-sans text-sm font-semibold uppercase tracking-wider hover:bg-wine-gradient shadow-md"
                >
                  <ShoppingBag className="w-4.5 h-4.5 mr-2" />
                  Design Custom Cake
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
