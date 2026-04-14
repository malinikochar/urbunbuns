"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { BurgerProduct } from "@/data/products";
import ProductBurgerScroll from "./ProductBurgerScroll";
import ProductTextOverlays from "./ProductTextOverlays";

interface ProductSectionProps {
  product: BurgerProduct;
}

export default function ProductSection({ product }: ProductSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const scrolled = window.scrollY - section.offsetTop;
    const progress = Math.min(Math.max(scrolled / scrollableHeight, 0), 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{
        background: `radial-gradient(ellipse at center, ${product.themeColor}18 0%, #0c0a09 70%)`,
      }}
    >
      {/* Canvas scroll animation */}
      <ProductBurgerScroll
        folderPath={product.folderPath}
        themeColor={product.themeColor}
        totalFrames={product.frameCount}
        frameExt={product.frameExt}
      />

      {/* Text overlays — positioned sticky so they float over the canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="sticky top-0 h-screen">
          <AnimatePresence mode="wait">
            <ProductTextOverlays
              key={product.id}
              product={product}
              scrollProgress={scrollProgress}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
