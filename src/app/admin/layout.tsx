"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Protect all /admin/* routes except /admin itself (login)
    const path = window.location.pathname;
    const isAuthenticated = localStorage.getItem("admin_auth") === "true";
    if (!isAuthenticated && path !== "/admin") {
      router.replace("/admin");
    }
  }, [router]);

  return (
    // Admin has its own isolated layout — no public Navbar/Footer
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {children}
    </div>
  );
}
