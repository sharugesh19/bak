"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronRight, ChevronLeft, Calendar, User, Phone, MapPin } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

const steps = [
  { id: 1, title: "Occasion & Style" },
  { id: 2, title: "Flavor & Prep" },
  { id: 3, title: "Size & Reference" },
  { id: 4, title: "Logistics & Submit" },
];

export default function CustomOrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: "Birthday",
    themeDescription: "",
    flavor: "Belgian Chocolate",
    isEggless: true,
    size: "2kg",
    deliveryDate: "",
    budget: "₹2000 - ₹3500",
    deliveryType: "Delivery",
    deliveryArea: "",
    name: "",
    phone: "",
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const compileWhatsAppUrl = () => {
    const textMessage = `Hi Anah Cakes! I'd like to submit a Custom Cake Inquiry:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Occasion: ${formData.occasion}
- Style/Theme Description: ${formData.themeDescription || "Not provided"}
- Size: ${formData.size}
- Flavor: ${formData.flavor}
- Preparation: ${formData.isEggless ? "100% Eggless" : "Standard (Contains Egg)"}
- Delivery Preference: ${formData.deliveryType}
- Target Date: ${formData.deliveryDate || "Not selected"}
- Delivery Location: ${formData.deliveryArea || "Not specified"}
- Budget Band: ${formData.budget}

Please let me know the availability and quotation!`;

    const businessNumber = "919876543210";
    return `https://wa.me/${businessNumber}?text=${encodeURIComponent(textMessage)}`;
  };

  return (
    <div className="bg-warm-bg min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <SchemaMarkup
        type="breadcrumbs"
        items={[
          { name: "Home", url: "/" },
          { name: "Custom Order", url: "/custom-order" },
        ]}
      />

      <div className="text-center space-y-4 mb-12">
        <span className="text-xs uppercase tracking-widest text-accent-gold font-bold font-sans">
          Bespoke Service
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text-espresso">
          Design Your Custom Cake
        </h1>
        <p className="font-sans text-text-espresso/70 max-w-md mx-auto text-sm">
          Specify your celebration parameters. Our baker will customize and design it to perfection.
        </p>
      </div>

      {/* Step Progress bar */}
      <div className="mb-12 flex justify-between items-center relative max-w-md mx-auto">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent-gold/20 z-0" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary-wine transition-all duration-300 z-0"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border font-sans text-xs font-bold transition-colors ${
                currentStep >= s.id
                  ? "bg-primary-wine text-warm-bg border-primary-wine"
                  : "bg-warm-bg text-text-espresso/50 border-accent-gold/30"
              }`}
            >
              {s.id}
            </div>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-text-espresso/60 mt-1.5 hidden sm:block">
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {/* Guided Form Container */}
      <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-accent-gold/15 p-6 sm:p-10 shadow-xl min-h-[400px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* STEP 1: Occasion & Style */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-text-espresso">What is the Celebration?</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["Birthday", "Wedding", "Anniversary", "Baby Shower", "Corporate", "Festival"].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => handleInputChange("occasion", occ)}
                      className={`p-4 rounded-2xl border text-center font-sans text-sm font-semibold transition-all ${
                        formData.occasion === occ
                          ? "bg-primary-wine text-warm-bg border-primary-wine shadow-md"
                          : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <label htmlFor="style-desc" className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Design Theme or Reference Notes
                  </label>
                  <textarea
                    id="style-desc"
                    rows={4}
                    placeholder="Describe your vision (e.g. pastel colors, golden floral decorations, 3D teddy, cartoon character name...)"
                    value={formData.themeDescription}
                    onChange={(e) => handleInputChange("themeDescription", e.target.value)}
                    className="w-full p-4 rounded-2xl border border-accent-gold/20 bg-warm-bg/50 focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine font-sans text-sm text-text-espresso"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Flavor & Preparation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-text-espresso">Choose Taste Profiles</h3>
                <div className="space-y-4">
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Sponge / Flavor Base
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {["Belgian Chocolate", "Vanilla Caramel", "Red Velvet", "Mango Mousse", "Fresh Fruit Trio", "Almond Praline"].map((flv) => (
                      <button
                        key={flv}
                        onClick={() => handleInputChange("flavor", flv)}
                        className={`p-4 rounded-2xl border text-center font-sans text-sm font-semibold transition-all ${
                          formData.flavor === flv
                            ? "bg-primary-wine text-warm-bg border-primary-wine shadow-md"
                            : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
                        }`}
                      >
                        {flv}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-accent-gold/5 p-4 rounded-2xl border border-accent-gold/10 w-fit">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase font-bold tracking-widest text-primary-wine font-sans">
                      100% Eggless Preparation
                    </span>
                    <span className="text-[10px] text-text-espresso/60 font-sans mt-0.5">
                      Check this to ensure no egg ingredients are used in the bake.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInputChange("isEggless", !formData.isEggless)}
                    className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.isEggless ? "bg-emerald-500" : "bg-text-espresso/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        formData.isEggless ? "translate-x-5.5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Size & Reference */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-text-espresso">Weight & Target Budget</h3>
                
                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Estimated weight needed
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {["1.5kg", "2kg", "3kg", "5kg", "5kg+"].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleInputChange("size", sz)}
                        className={`px-5 py-2.5 rounded-xl border font-sans text-xs font-semibold transition-all ${
                          formData.size === sz
                            ? "bg-primary-wine text-warm-bg border-primary-wine shadow-md"
                            : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                    Estimated Budget Band
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    {["₹1500 - ₹2000", "₹2000 - ₹3500", "₹3500 - ₹5000", "₹5000+"].map((bdg) => (
                      <button
                        key={bdg}
                        onClick={() => handleInputChange("budget", bdg)}
                        className={`p-3.5 rounded-xl border text-center font-sans text-xs font-semibold transition-all ${
                          formData.budget === bdg
                            ? "bg-primary-wine text-warm-bg border-primary-wine shadow-md"
                            : "bg-transparent text-text-espresso border-accent-gold/20 hover:border-primary-wine"
                        }`}
                      >
                        {bdg}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Logistics & Submit */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h3 className="font-serif text-2xl font-bold text-text-espresso">Delivery Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-espresso/40" />
                      <input
                        id="name-input"
                        type="text"
                        placeholder="Priya Raman"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-accent-gold/20 bg-warm-bg/50 focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine font-sans text-sm text-text-espresso"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone-input" className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-espresso/40" />
                      <input
                        id="phone-input"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-accent-gold/20 bg-warm-bg/50 focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine font-sans text-sm text-text-espresso"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="date-input" className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                      Delivery Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-espresso/40" />
                      <input
                        id="date-input"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-accent-gold/20 bg-warm-bg/50 focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine font-sans text-sm text-text-espresso"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                      Pickup or Delivery?
                    </span>
                    <div className="flex gap-2.5">
                      {["Delivery", "Store Pickup"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange("deliveryType", type)}
                          className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold font-sans transition-all ${
                            formData.deliveryType === type
                              ? "bg-primary-wine text-warm-bg border-primary-wine"
                              : "bg-transparent text-text-espresso border-accent-gold/20"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {formData.deliveryType === "Delivery" && (
                  <div className="space-y-2">
                    <label htmlFor="area-input" className="text-xs uppercase font-bold tracking-widest text-accent-gold font-sans block">
                      Delivery Locality in Coimbatore
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-espresso/40" />
                      <input
                        id="area-input"
                        type="text"
                        placeholder="e.g. RS Puram / Peelamedu"
                        value={formData.deliveryArea}
                        onChange={(e) => handleInputChange("deliveryArea", e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-accent-gold/20 bg-warm-bg/50 focus:outline-none focus:ring-1 focus:ring-primary-wine focus:border-primary-wine font-sans text-sm text-text-espresso"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-8 border-t border-accent-gold/15 mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`inline-flex items-center text-xs uppercase font-bold tracking-wider font-sans py-2 px-4 transition-colors ${
              currentStep === 1
                ? "text-text-espresso/20 cursor-not-allowed"
                : "text-primary-wine hover:text-accent-gold"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-wine text-warm-bg font-sans text-xs font-bold uppercase tracking-wider hover:bg-wine-gradient shadow-md transition-all"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <a
              href={compileWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-lg transition-all duration-300 group"
            >
              <MessageCircle className="w-4.5 h-4.5 mr-2 fill-white text-emerald-500" />
              Submit to Baker
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
