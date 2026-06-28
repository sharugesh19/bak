"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

export default function ContactPage() {
  const businessNumber = "919876543210";
  const defaultMessage = encodeURIComponent("Hi Anah Cakes! I'd like to ask a question or place an order.");
  const whatsappUrl = `https://wa.me/${businessNumber}?text=${defaultMessage}`;

  return (
    <div className="bg-warm-bg min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SchemaMarkup type="breadcrumbs" items={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" }
      ]} />
      <SchemaMarkup type="localBusiness" />

      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">
          Contact Our Bakery
        </h1>
        <p className="font-sans text-text-espresso/70 max-w-md mx-auto text-sm">
          Have a question about design customization, flavors, or delivery options? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Contact Details Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white/50 backdrop-blur-md p-8 rounded-3xl border border-accent-gold/15 shadow-xl space-y-6">
            <h2 className="font-serif text-2xl font-bold text-text-espresso">Order Desk & Details</h2>
            
            <div className="space-y-4">
              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    WhatsApp Chat
                  </span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-base font-semibold text-primary-wine hover:text-emerald-500 transition-colors block mt-1"
                  >
                    +91 98765 43210 (Click to Chat)
                  </a>
                  <p className="text-xs text-text-espresso/50 font-sans mt-0.5">
                    Fastest responses. Send us design references here.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-wine/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary-wine" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Phone Call
                  </span>
                  <a
                    href="tel:+919876543210"
                    className="font-sans text-base font-semibold text-text-espresso hover:text-primary-wine transition-colors block mt-1"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-wine/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary-wine" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Bakery Address
                  </span>
                  <p className="font-sans text-sm text-text-espresso/80 leading-relaxed mt-1">
                    <strong>Anah Cakes</strong><br />
                    124, RS Puram Main Road,<br />
                    Coimbatore, Tamil Nadu - 641002
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-wine/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary-wine" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Operating Hours
                  </span>
                  <p className="font-sans text-sm text-text-espresso/80 mt-1">
                    Monday - Sunday: 9:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Google Maps Placeholder frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-accent-gold/25 p-3.5 rounded-3xl bg-white/50 backdrop-blur-md shadow-xl flex flex-col justify-between aspect-square lg:aspect-[4/3] w-full max-w-lg mx-auto"
        >
          <div className="relative w-full h-[85%] rounded-2xl overflow-hidden shadow-inner bg-accent-gold/5 flex flex-col items-center justify-center border border-accent-gold/15 text-center px-6 gap-3">
            <MapPin className="w-12 h-12 text-primary-wine animate-bounce" />
            <h3 className="font-serif text-xl font-bold text-text-espresso">Anah Cakes Coimbatore Map</h3>
            <p className="font-sans text-xs text-text-espresso/60 max-w-xs leading-relaxed">
              Located on RS Puram Main Road. Ample parking space available for pickup customers.
            </p>
            <div className="text-[10px] uppercase font-bold tracking-widest text-accent-gold border border-accent-gold/30 px-3 py-1 rounded bg-warm-bg/50">
              Coimbatore, TN 641002
            </div>
          </div>
          <div className="h-[15%] pt-3.5 flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest text-text-espresso/60 font-sans border-t border-accent-gold/10">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            NAP Details match Google Business Profile exactly.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
