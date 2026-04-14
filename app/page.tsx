"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductSection from "@/components/ProductSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useCallback(
    (dir: number) => {
      const next = currentIndex + dir;
      if (next < 0 || next >= products.length) return;
      setDirection(dir);
      setCurrentIndex(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [currentIndex]
  );

  const product = products[currentIndex];

  return (
    <main className="relative bg-[#0c0a09]">
      <Navbar />

      {/* Burger product area */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={product.id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductSection product={product} />
        </motion.div>
      </AnimatePresence>

      {/* Next burger CTA section */}
      <section className="relative flex flex-col items-center justify-center py-32 px-6 text-center overflow-hidden">
        {/* ambient glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, ${product.themeColor} 0%, transparent 70%)`,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          {currentIndex < products.length - 1 ? (
            <>
              <p className="text-xs font-semibold tracking-[0.35em] uppercase text-neutral-500 mb-4">
                Next Up
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-3">
                {products[currentIndex + 1].name}
              </h2>
              <h3
                className="text-4xl md:text-6xl font-black mb-10"
                style={{
                  background: `linear-gradient(135deg, ${products[currentIndex + 1].themeColor}, #fff)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {products[currentIndex + 1].subName}
              </h3>
              <motion.button
                whileHover={{
                  scale: 1.06,
                  boxShadow: `0 0 40px ${products[currentIndex + 1].themeColor}60`,
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(1)}
                style={{
                  background: `linear-gradient(135deg, ${products[currentIndex + 1].themeColor}, #F97316)`,
                  boxShadow: `0 8px 30px ${products[currentIndex + 1].themeColor}40`,
                }}
                className="px-10 py-4 rounded-full font-bold text-black text-base transition-all duration-300"
              >
                Explore Next Burger →
              </motion.button>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold tracking-[0.35em] uppercase text-neutral-500 mb-4">
                You&apos;ve seen them all
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-10">
                Ready to Order?
              </h2>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 40px #F9731660" }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-4 rounded-full font-bold text-black text-base bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-orange-500/30 transition-all duration-300"
              >
                Order Now
              </motion.button>
            </>
          )}
        </motion.div>
      </section>

      <Footer />

      {/* ── Left / Right Navigation Arrows ── */}
      <div className="fixed left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-40 pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          disabled={currentIndex === 0}
          className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 text-white disabled:opacity-0 hover:bg-white/20 transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(1)}
          disabled={currentIndex === products.length - 1}
          className="pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 text-white disabled:opacity-0 hover:bg-white/20 transition-all duration-200"
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* ── Bottom Pill Selector ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-xl">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
            style={{
              background:
                i === currentIndex ? `${p.themeColor}25` : "transparent",
              border:
                i === currentIndex
                  ? `1px solid ${p.themeColor}60`
                  : "1px solid transparent",
            }}
          >
            <span
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === currentIndex ? p.themeColor : "#4b5563",
              }}
            />
            <span
              className="text-xs font-medium transition-colors duration-300 hidden sm:block"
              style={{
                color: i === currentIndex ? p.themeColor : "#9ca3af",
              }}
            >
              {p.name}
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
