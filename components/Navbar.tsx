"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-12 py-3 md:py-4 backdrop-blur-xl bg-black/30 border-b border-white/5"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <svg
          width="28"
          height="28"
          className="md:w-[36px] md:h-[36px] drop-shadow-lg"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top bun */}
          <path
            d="M6 16h24c0-7-5-12-12-12S6 9 6 16z"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="0.5"
          />
          {/* Sesame seeds */}
          <ellipse cx="14" cy="10" rx="1.2" ry="0.7" fill="#FDE68A" />
          <ellipse cx="20" cy="8" rx="1.2" ry="0.7" fill="#FDE68A" />
          <ellipse cx="18" cy="12" rx="1.2" ry="0.7" fill="#FDE68A" />
          {/* Lettuce */}
          <path
            d="M5 17c2-1 4 1 6 0s4 1 6 0 4 1 6 0 4 1 6 0 2 1 2 1v2H5v-2z"
            fill="#22C55E"
          />
          {/* Patty */}
          <rect x="6" y="20" width="24" height="4" rx="2" fill="#92400E" />
          {/* Bottom bun */}
          <path
            d="M6 25h24v3c0 2-2 4-4 4H10c-2 0-4-2-4-4v-3z"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="0.5"
          />
        </svg>
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          Urban Buns
        </span>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold text-black bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-shadow duration-300"
      >
        Order Now
      </motion.button>
    </motion.nav>
  );
}
