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
  { start: 0.75, end: 1.5, type: "buy" },
];

function getSectionOpacity(
  progress: number,
  start: number,
  end: number
): number {
  const fadeZone = 0.05;
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
  const opacities = sections.map((s) =>
    getSectionOpacity(scrollProgress, s.start, s.end)
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Section 0: Intro */}
      <motion.div
        style={{ opacity: opacities[0] }}
        className="absolute inset-0 flex flex-col justify-end md:justify-end md:pb-16 px-6 md:px-16 lg:px-24"
      >
        <div className="md:max-w-2xl mb-24 md:mb-0 text-center md:text-left pt-[50vh] md:pt-0">
          <motion.span
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-2 md:mb-3 flex justify-center md:justify-start"
            style={{ color: product.themeColor }}
          >
            Urban Buns Presents
          </motion.span>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-none mb-1 md:mb-2">
            {product.name}
          </h1>
          <h2
            className="text-4xl md:text-7xl font-black leading-none mb-4 md:mb-6"
            style={{
              background: `linear-gradient(135deg, ${product.themeColor}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.subName}
          </h2>
          <p className="text-xs md:text-base text-neutral-300 max-w-[300px] md:max-w-sm leading-relaxed mx-auto md:mx-0">
            {product.description}
          </p>
          
          {/* Features pills */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-4 md:mt-6 justify-center md:justify-start">
            {product.features.map((f) => (
              <span
                key={f}
                className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-medium bg-white/10 text-white border border-white/10 backdrop-blur-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats - bottom right on desktop, TOP right on mobile to avoid clashing with bottom text */}
      <motion.div
        style={{ opacity: opacities[0] }}
        className="absolute right-6 md:right-16 top-24 md:top-auto md:bottom-16 flex flex-col gap-4 md:gap-6"
      >
        {product.stats.map((stat) => (
          <div key={stat.label} className="text-right">
            <div
              className="text-xl md:text-3xl font-black"
              style={{ color: product.themeColor }}
            >
              {stat.value}
            </div>
            <div className="text-[9px] md:text-xs text-neutral-400 uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Section 1: Details */}
      <motion.div
        style={{ opacity: opacities[1] }}
        className="absolute inset-x-0 bottom-0 md:inset-0 flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 mb-24 md:mb-0"
      >
        <div className="md:max-w-xl text-center md:text-left">
          <span
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-4 flex justify-center md:justify-start"
            style={{ color: product.themeColor }}
          >
            The Details
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 md:mb-6">
            {product.details.title}
          </h2>
          <p className="text-neutral-300 text-xs md:text-base leading-relaxed max-w-[320px] md:max-w-none mx-auto md:mx-0">
            {product.details.description}
          </p>
        </div>
      </motion.div>

      {/* Section 2: Freshness */}
      <motion.div
        style={{ opacity: opacities[2] }}
        className="absolute inset-x-0 bottom-0 md:inset-0 flex flex-col justify-end md:justify-center px-6 md:px-16 lg:px-24 ml-auto mb-24 md:mb-0"
      >
        <div className="md:max-w-xl text-center md:text-right">
          <span
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-4 block text-center md:text-right"
            style={{ color: product.themeColor }}
          >
            Ingredients
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 md:mb-6">
            {product.freshness.title}
          </h2>
          <p className="text-neutral-300 text-xs md:text-base leading-relaxed max-w-[320px] md:max-w-none mx-auto md:ml-auto md:mr-0">
            {product.freshness.description}
          </p>
        </div>
      </motion.div>

      {/* Section 3: Buy Now */}
      <motion.div
        style={{ opacity: opacities[3] }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pb-24 md:pb-0"
      >
        <div className="mt-[44vh] md:mt-0">
          <span
            className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: product.themeColor }}
          >
            Ready to Order?
          </span>
          <h2 className="text-3xl md:text-6xl font-black text-white leading-tight mb-2 md:mb-4">
            {product.buyNow.title}
          </h2>
          <div
            className="text-4xl md:text-7xl font-black mb-8 md:mb-10"
            style={{
              background: `linear-gradient(135deg, ${product.themeColor}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.buyNow.priceStr}
          </div>
          <div className="pointer-events-auto flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: `0 0 30px ${product.themeColor}80` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: `linear-gradient(135deg, ${product.themeColor}, #F97316)`,
                boxShadow: `0 8px 30px ${product.themeColor}40`,
              }}
              className="px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-black text-xs md:text-base transition-all duration-300 w-[200px] sm:w-auto"
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-white text-xs md:text-base border border-white/20 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 w-[200px] sm:w-auto"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
