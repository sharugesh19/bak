import { Suspense } from "react";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Cake Catalog & Menu",
  description: "Browse our premium cakes menu including wedding cakes, anniversary cakes, custom birthday cakes, and luxury cupcakes in Coimbatore.",
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-warm-bg flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent-gold border-t-primary-wine rounded-full animate-spin mx-auto"></div>
            <p className="font-serif text-xl text-text-espresso">Preparing Sweet Delights...</p>
          </div>
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
