import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin, Check } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locality: string }>;
}

const localData: Record<
  string,
  {
    name: string;
    description: string;
    h1: string;
    aboutParagraph: string;
    testimonial: { name: string; text: string };
  }
> = {
  "rs-puram": {
    name: "RS Puram",
    h1: "Premium Birthday & Custom Cake Delivery in RS Puram, Coimbatore",
    description: "Order fresh, luxury eggless celebration cakes in RS Puram. Handcrafted custom designs, Belgian chocolates, safe prompt delivery to DB Road, TVS Nagar & nearby areas.",
    aboutParagraph: "Located in the heart of RS Puram, Anah Cakes provides express, temperature-controlled delivery for birthday bashes, anniversary dinners, and housewarming events. Whether you are hosting a celebration near DB Road, the RS Puram Club, or TVS Nagar, our logistics ensures your customized red velvet or Belgian chocolate cake arrives intact and perfectly chilled.",
    testimonial: {
      name: "Shruti Govind",
      text: "Anah Cakes delivered a 3-tier custom cake right to our home in RS Puram. It arrived in perfect condition, and the guests were blown away by the elegant cream and gold look!",
    },
  },
  "peelamedu": {
    name: "Peelamedu",
    h1: "Fresh Custom Cakes & Cupcakes Delivery in Peelamedu, Coimbatore",
    description: "Get premium custom cakes delivered to Peelamedu, Avinashi Road, and Hope College areas. Perfect for college events, corporate parties, and birthdays.",
    aboutParagraph: "Peelamedu is Coimbatore's vibrant academic and tech hub. Anah Cakes delivers gourmet cakes, cupcakes, and party platters directly to student residences, corporate parks, and homes near PSG Tech, Avinashi Road, and Hope College. Our easy WhatsApp order desk makes group customization simple and budget-friendly.",
    testimonial: {
      name: "Vikram Adithya",
      text: "We ordered 20 custom cupcakes and a chocolate drip cake for our college department festival in Peelamedu. Delivery was right on time, and the price was well within our budget!",
    },
  },
  "gandhipuram": {
    name: "Gandhipuram",
    h1: "Same-Day Cake Ordering & Home Delivery in Gandhipuram, Coimbatore",
    description: "Fast cake delivery in Gandhipuram. Order customized eggless chocolate truffles, theme cakes, and birthday treats. Safe transport near Cross Cut Road.",
    aboutParagraph: "As Coimbatore's bustling commercial center, Gandhipuram hosts hundreds of business and personal milestones daily. Anah Cakes offers reliable delivery to locations near Cross Cut Road, 100 Feet Road, and Sathy Road. Our specialized packaging prevents design shifts, guaranteeing your theme cake arrives looking stunning.",
    testimonial: {
      name: "Mohammed Rafi",
      text: "Needed a last-minute eggless truffle cake for an office celebration in Gandhipuram. Anah Cakes accommodated our request in just 4 hours. The flavor was phenomenal!",
    },
  },
};

export async function generateStaticParams() {
  return [
    { locality: "rs-puram" },
    { locality: "peelamedu" },
    { locality: "gandhipuram" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locality } = await params;
  const data = localData[locality];
  if (!data) return {};

  return {
    title: `Cake Delivery in ${data.name} | Anah Cakes Coimbatore`,
    description: data.description,
  };
}

export default async function LocalityPage({ params }: Props) {
  const { locality } = await params;
  const data = localData[locality];

  if (!data) {
    notFound();
  }

  const defaultMessage = `Hi Anah Cakes! I'd like to order a cake for delivery in ${data.name}.`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="bg-warm-bg min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SchemaMarkup type="breadcrumbs" items={[
        { name: "Home", url: "/" },
        { name: "Delivery Areas", url: "/catalog" },
        { name: data.name, url: `/delivery/${locality}` }
      ]} />
      
      {/* Main Content Card */}
      <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-accent-gold/15 p-6 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Localized SEO content */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-primary-wine/10 px-3.5 py-1.5 rounded-full w-fit text-primary-wine">
            <MapPin className="w-4.5 h-4.5 text-primary-wine" />
            <span className="text-xs uppercase tracking-widest font-semibold font-sans">
              Delivery to {data.name}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text-espresso leading-tight">
            {data.h1}
          </h1>

          <p className="font-sans text-base text-text-espresso/80 leading-relaxed">
            {data.aboutParagraph}
          </p>

          <div className="space-y-3 pt-2">
            <h3 className="font-serif text-lg font-bold text-text-espresso">What We Guarantee:</h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-text-espresso/85 font-sans">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                100% Eggless Preparation Options
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                Bespoke Design Customisation
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                AC-Van Secure Delivery to avoid melting
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                Premium Belgian Chocolate Base
              </li>
            </ul>
          </div>

          {/* CTA buttons */}
          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-sans text-sm font-bold uppercase tracking-wider shadow-lg transition-all duration-300 group"
            >
              <MessageCircle className="w-4.5 h-4.5 mr-2.5 fill-white text-emerald-500" />
              Order via WhatsApp
            </a>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-primary-wine text-primary-wine font-sans text-sm font-semibold uppercase tracking-wider hover:bg-primary-wine/5 transition-all"
            >
              Explore Catalog
            </Link>
          </div>
        </div>

        {/* Right Column: Imagery & Testimonials */}
        <div className="space-y-8">
          <div className="relative aspect-square border border-accent-gold/20 p-3 rounded-2xl glass-card">
            <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md">
              <Image
                src="/cake_wedding.jpg"
                alt={`Fresh Cake Delivery in ${data.name}`}
                fill
                className="object-cover"
                sizes="(max-w-640px) 100vw, 400px"
              />
            </div>
          </div>

          {/* Localized Testimonial */}
          <div className="border-l-4 border-accent-gold pl-4 py-2 italic font-sans text-sm text-text-espresso/80 space-y-1">
            <p>&quot;{data.testimonial.text}&quot;</p>
            <cite className="font-serif text-xs font-bold text-primary-wine not-italic block mt-1">
              — {data.testimonial.name}, Resident of {data.name}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}
