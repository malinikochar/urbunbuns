"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const menuLinks = ["Smoky Veg Supreme", "Cheesy Crunch", "Spicy Tandoori", "Seasonal Specials"];
  const supportLinks = ["FAQ", "Contact Us", "Delivery Info", "Allergen Guide"];

  return (
    <footer className="relative bg-gradient-to-b from-stone-950 to-black pt-20 pb-8 px-6 md:px-12 border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Urban Buns
          </h3>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Redefining the future of plant-based burgers. Crafted with
            passion, served with purpose.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
            Menu
          </h4>
          <ul className="space-y-2.5">
            {menuLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
            Support
          </h4>
          <ul className="space-y-2.5">
            {supportLinks.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-neutral-400 hover:text-orange-400 transition-colors duration-200"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
            Newsletter
          </h4>
          <p className="text-sm text-neutral-400 mb-4">
            Get exclusive offers and be the first to try new flavors.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black text-sm font-semibold rounded-lg"
            >
              Join
            </motion.button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Urban Buns. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Cookies"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs text-neutral-500 hover:text-orange-400 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
