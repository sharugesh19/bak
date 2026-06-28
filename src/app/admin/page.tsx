"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

// Simple hardcoded credentials — replace with env secret in production
const ADMIN_PASSWORD = "anahcakes2024";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Already logged in
    if (typeof window !== "undefined" && localStorage.getItem("admin_auth") === "true") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("admin_auth", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-text-espresso flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Brand Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="font-serif text-3xl font-bold tracking-wide">
            <span className="text-accent-gold">ANAH</span>
            <span className="text-warm-bg"> CAKES</span>
          </span>
          <p className="text-warm-bg/50 text-xs uppercase tracking-widest font-sans">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-warm-bg/5 backdrop-blur-md border border-accent-gold/20 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary-wine/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-accent-gold" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-warm-bg">Secure Login</h1>
              <p className="text-warm-bg/50 text-xs font-sans">Enter your admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-accent-gold font-sans block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-warm-bg/10 border border-accent-gold/20 text-warm-bg placeholder-warm-bg/30 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-accent-gold focus:border-accent-gold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-warm-bg/40 hover:text-accent-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-sans font-semibold"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-accent-gold hover:bg-amber-500 text-text-espresso font-sans text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Enter Dashboard"}
            </button>
          </form>

          <p className="text-center text-[10px] text-warm-bg/30 font-sans pt-2">
            This portal is for Anah Cakes staff only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
