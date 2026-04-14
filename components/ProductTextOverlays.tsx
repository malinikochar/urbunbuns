"use client";

import { motion } from "framer-motion";
import { BurgerProduct } from "@/data/products";

interface ProductTextOverlaysProps {
  product: BurgerProduct;
  scrollProgress: number; // 0 to 1
}

const sections = [
  { start: 0.0, end: 0.25, type: "intro" },
  { start: 0.25, end: 0.5, type: "details" },
  { start: 0.5, end: 0.75, type: "freshness" },
  { start: 0.75, end: 1.0, type: "buy" },
];

function getSectionOpacity(
  progress: number,
  start: number,
  end: number
): number {
  const fadeZone = 0.05;
  // special-case: first section starts at 0, no fade-in needed
  if (start === 0 && progress < fadeZone) return 1;
  if (progress < start) return 0;
  if (progress < start + fadeZone)
    return (progress - start) / fadeZone;
  if (progress > end - fadeZone)
    return Math.max((end - progress) / fadeZone, 0);
  if (progress >= end) return 0;
  return 1;
}

export default function ProductTextOverlays({
  product,
  scrollProgress,
}: ProductTextOverlaysProps) {
  const activeSection = sections.find(
    (s) => scrollProgress >= s.start && scrollProgress < s.end
  );

  const opacities = sections.map((s) =>
    getSectionOpacity(scrollProgress, s.start, s.end)
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Section 0: Intro */}
      <motion.div
        style={{ opacity: opacities[0] }}
        className="absolute inset-0 flex flex-col justify-end pb-16 px-8 md:px-16 lg:px-24 max-w-2xl"
      >
        <motion.span
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
          style={{ color: product.themeColor }}
        >
          Urban Buns Presents
        </motion.span>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-2">
          {product.name}
        </h1>
        <h2
          className="text-5xl md:text-7xl font-black leading-none mb-6"
          style={{
            background: `linear-gradient(135deg, ${product.themeColor}, #fff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {product.subName}
        </h2>
        <p className="text-sm md:text-base text-neutral-300 max-w-sm leading-relaxed">
          {product.description}
        </p>
        {/* Features pills */}
        <div className="flex flex-wrap gap-2 mt-6">
          {product.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/10 backdrop-blur-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Stats - always visible in intro */}
      <motion.div
        style={{ opacity: opacities[0] }}
        className="absolute right-8 md:right-16 bottom-16 flex flex-col gap-6"
      >
        {product.stats.map((stat) => (
          <div key={stat.label} className="text-right">
            <div
              className="text-3xl font-black"
              style={{ color: product.themeColor }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-neutral-400 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Section 1: Details */}
      <motion.div
        style={{ opacity: opacities[1] }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-xl"
      >
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: product.themeColor }}
        >
          The Details
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          {product.details.title}
        </h2>
        <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
          {product.details.description}
        </p>
      </motion.div>

      {/* Section 2: Freshness */}
      <motion.div
        style={{ opacity: opacities[2] }}
        className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 ml-auto max-w-xl text-right"
      >
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 block"
          style={{ color: product.themeColor }}
        >
          Ingredients
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
          {product.freshness.title}
        </h2>
        <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
          {product.freshness.description}
        </p>
      </motion.div>

      {/* Section 3: Buy Now */}
      <motion.div
        style={{ opacity: opacities[3] }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
      >
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          style={{ color: product.themeColor }}
        >
          Ready to Order?
        </span>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
          {product.buyNow.title}
        </h2>
        <div
          className="text-5xl md:text-7xl font-black mb-10"
          style={{
            background: `linear-gradient(135deg, ${product.themeColor}, #fff)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {product.buyNow.priceStr}
        </div>
        <div className="pointer-events-auto flex gap-4 flex-wrap justify-center">
          <motion.button
            whileHover={{ scale: 1.06, boxShadow: `0 0 30px ${product.themeColor}80` }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: `linear-gradient(135deg, ${product.themeColor}, #F97316)`,
              boxShadow: `0 8px 30px ${product.themeColor}40`,
            }}
            className="px-8 py-4 rounded-full font-bold text-black text-sm md:text-base transition-all duration-300"
          >
            Add to Cart
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-bold text-white text-sm md:text-base border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
