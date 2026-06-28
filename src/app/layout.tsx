import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anah Cakes | Premium Patisserie & Custom Cakes in Coimbatore",
    template: "%s | Anah Cakes",
  },
  description: "Order luxury custom cakes, wedding cakes, cupcakes and theme cakes online from Anah Cakes - the best patisserie and bakery in Coimbatore, Tamil Nadu.",
  metadataBase: new URL("https://www.anahcakes.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.anahcakes.com",
    title: "Anah Cakes | Premium Custom Cakes in Coimbatore",
    description: "Handcrafted luxury custom cakes, eggless options, and premium desserts. Order online via WhatsApp. Delivery in Coimbatore.",
    siteName: "Anah Cakes",
    images: [
      {
        url: "/cake_wedding.jpg",
        width: 800,
        height: 800,
        alt: "Anah Cakes Luxury Wedding Cake",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-warm-bg text-text-espresso">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
