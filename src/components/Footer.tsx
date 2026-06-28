import Link from "next/link";
import { Phone, MapPin, Clock, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-text-espresso text-warm-bg font-sans border-t border-accent-gold/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand & Mission */}
        <div className="flex flex-col space-y-4">
          <Link href="/" className="flex flex-col items-start select-none">
            <span className="font-serif text-2xl font-bold tracking-wide text-accent-gold">
              ANAH <span className="text-warm-bg">CAKES</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm-bg/60 -mt-1 font-sans">
              Premium Patisserie
            </span>
          </Link>
          <p className="text-sm text-warm-bg/75 leading-relaxed">
            Crafting luxury custom cakes and premium desserts for weddings, birthdays, and anniversaries in Coimbatore. Made fresh daily with finest ingredients.
          </p>
        </div>

        {/* Contact Information (NAP Consistency) */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-lg font-bold text-accent-gold tracking-wide">
            Our Patisserie
          </h3>
          <ul className="space-y-3 text-sm text-warm-bg/80">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-accent-gold shrink-0 mt-0.5" />
              <span>
                <strong>Anah Cakes</strong><br />
                124, RS Puram Main Road,<br />
                Coimbatore, Tamil Nadu - 641002
              </span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-accent-gold shrink-0" />
              <a href="tel:+919876543210" className="hover:text-accent-gold transition-colors">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-accent-gold shrink-0" />
              <a href="mailto:hello@anahcakes.com" className="hover:text-accent-gold transition-colors">
                hello@anahcakes.com
              </a>
            </li>
          </ul>
        </div>

        {/* Hours & Services */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-lg font-bold text-accent-gold tracking-wide">
            Hours & Deliveries
          </h3>
          <ul className="space-y-3 text-sm text-warm-bg/80">
            <li className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-accent-gold shrink-0 mt-0.5" />
              <span>
                <strong>Store Hours:</strong><br />
                Mon - Sun: 9:00 AM - 10:00 PM
              </span>
            </li>
            <li>
              <strong>Delivery Radius:</strong> Coimbatore City, RS Puram, Peelamedu, Gandhipuram, Saibaba Colony.
            </li>
            <li className="text-xs text-accent-gold">
              * Eggless preparation options available for all cakes.
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-serif text-lg font-bold text-accent-gold tracking-wide">
            Discover
          </h3>
          <ul className="space-y-2 text-sm text-warm-bg/80">
            <li>
              <Link href="/catalog" className="hover:text-accent-gold transition-colors">
                Signature Cake Catalog
              </Link>
            </li>
            <li>
              <Link href="/custom-order" className="hover:text-accent-gold transition-colors">
                Custom Cake Designer
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-accent-gold transition-colors">
                Our Gallery & Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent-gold transition-colors">
                Patisserie Blog & Guides
              </Link>
            </li>
            <li>
              <Link href="/delivery/rs-puram" className="hover:text-accent-gold transition-colors">
                Cake Delivery in RS Puram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-warm-bg/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-warm-bg/60">
        <div>
          &copy; {new Date().getFullYear()} Anah Cakes. All rights reserved. Registered Bakery in Coimbatore, Tamil Nadu.
        </div>
        <div className="flex items-center gap-1 select-none">
          Made with <Heart className="w-3.5 h-3.5 text-primary-wine fill-primary-wine" /> in Tamil Nadu | Designed for Luxury
        </div>
      </div>
    </footer>
  );
}
