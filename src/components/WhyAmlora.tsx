/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Check, Star, RefreshCw, Flame, Award, Heart, CheckCircle } from "lucide-react";

export default function WhyAmlora() {
  const brandPillars = [
    {
      title: "Real Amla",
      desc: "Direct farm sourcing from Pratapgarh UP. Only fully mature, tree-ripened gooseberries harvested by generational hands are chosen.",
      icon: <CheckCircle className="w-5 h-5 text-gold-premium" />
    },
    {
      title: "Carefully Selected Ingredients",
      desc: "We rigorously source each ingredient for our candying and sweetening. No pesticide residue, no cheap synthetic additives, and no dynamic compromises.",
      icon: <Award className="w-5 h-5 text-gold-premium" />
    },
    {
      title: "Premium Quality",
      desc: "Absolutely 100% seed-free pulp and sediment integrity. A clean trace, zero sandy grit, zero bitterness, and absolute safety with double QA verification.",
      icon: <Star className="w-5 h-5 text-gold-premium" />
    },
    {
      title: "Modern Manufacturing",
      desc: "Hygienic seedless extraction, low-temperature protective shade-drying, and state-of-the-art sterile packaging in certified compliance facilities.",
      icon: <RefreshCw className="w-5 h-5 text-gold-premium" />
    },
    {
      title: "Traditional Wisdom",
      desc: "Combining ancient Ayurvedic formulations and seasonal curing techniques to preserve delicate, active bio-compounds in their natural harmony.",
      icon: <Flame className="w-5 h-5 text-gold-premium" />
    },
    {
      title: "Everyday Wellness",
      desc: "Curated into delightful daily formats that fit modern busy lives. From morning wellness shots to lunchtime treats that the whole family savors.",
      icon: <Heart className="w-5 h-5 text-gold-premium" />
    }
  ];

  return (
    <section id="why-amlora" className="py-16 md:py-20 bg-[#0F3D2E] text-white font-sans scroll-mt-20 relative overflow-hidden border-b border-[#D4AF37]/30">
      {/* Structural Drafting Grid Overlay (Geometric Balance Signature) */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,rgba(212,175,55,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Decorative center glow */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-rich/30 opacity-20 pointer-events-none blur-3xl" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-gold-premium/5 opacity-50 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 bg-black/20 px-4 py-2 inline-block">
            Our Quality Standards
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-white leading-tight tracking-tight">
            Why Choose Amlora Wellness
          </h2>
          <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto" />
          <p className="text-xs md:text-sm text-cream/70 leading-relaxed font-light">
            We are dedicated to single-fruit perfection. We do not dilute our attention across hundreds of products—allowing us to maintain unmatched parameters in raw selection and technical care.
          </p>
        </div>

        {/* Bento Grid (Geometric Balance Squares) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandPillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="bg-black/20 hover:bg-black/30 border border-white/10 hover:border-[#D4AF37]/50 p-8 rounded-none transition-all duration-300 group text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 bg-black/30 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform rotate-45">
                  <div className="-rotate-45">
                    {pillar.icon}
                  </div>
                </div>
                <h3 className="text-base font-serif font-semibold text-[#F4E8C1] tracking-wide mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-cream/85 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom tag line */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-1.5 text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest leading-none">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Active Quality Guaranteed
              </div>
            </div>
          ))}
        </div>

        {/* The Comparative Sourcing Checklist (Us vs Them) */}
        <div className="mt-20 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
              ✦ SOURCING CALIBRATION COMPARISON
            </span>
            <h3 className="font-serif text-xl md:text-2xl text-[#F4E8C1]">
              The Sourcing Standards Decoded
            </h3>
            <p className="text-xs text-cream/60 max-w-lg mx-auto font-light leading-relaxed">
              See how our dedicated single-fruit model elevates natural quality over mass generic processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* The standard competitor */}
            <div className="bg-[#FAF9F6]/5 border border-white/10 p-6 shadow-sm space-y-4 text-left rounded-none flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-8 h-8 border border-red-500/30 bg-red-500/10 flex items-center justify-center rotate-45">
                  <span className="text-red-400 font-bold -rotate-45 text-xs">✕</span>
                </div>
                <h4 className="font-serif text-white/90 font-bold text-sm leading-tight tracking-wide">
                  Generic Corporation Brands
                </h4>
                <p className="text-[11px] text-cream/75 leading-relaxed font-light">
                  Sell hundreds of non-vetted herbal supplements, synthetic vitamins, and generic wellness powders.
                </p>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2.5 text-[10px]">
                <p className="flex items-center gap-2 text-cream/60 capitalize">
                  <span className="text-red-500 font-bold text-xs">✕</span> Grinds whole fruit including woody seeds
                </p>
                <p className="flex items-center gap-2 text-cream/60 capitalize">
                  <span className="text-red-500 font-bold text-xs">✕</span> Chalky, bitter water residue & sand-like taste
                </p>
                <p className="flex items-center gap-2 text-cream/60 capitalize">
                  <span className="text-red-500 font-bold text-xs">✕</span> Excessive high-heat oven drying (destroys Vitamin C)
                </p>
              </div>
            </div>

            {/* The Amlora way */}
            <div className="bg-[#0B2A20] border-2 border-[#D4AF37] p-6 shadow-xl space-y-4 text-left text-white rounded-none flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-8 h-8 border border-[#D4AF37] bg-black/30 flex items-center justify-center rotate-45">
                  <span className="text-[#D4AF37] font-bold -rotate-45 text-xs">✓</span>
                </div>
                <h4 className="font-serif text-[#F4E8C1] font-bold text-sm leading-tight tracking-wide">
                  Amlora Dedicated Model
                </h4>
                <p className="text-[11px] text-cream/80 leading-relaxed font-light font-sans">
                  Dedicated exclusively to one masterpiece superfruit: Amla. Highly concentrated processing.
                </p>
              </div>
              <div className="border-t border-white/15 pt-4 space-y-2.5 text-[10px]">
                <p className="flex items-center gap-2 text-cream/90 uppercase tracking-wide">
                  <span className="text-[#D4AF37] font-extrabold text-sm">✓</span> 100% Seedless pure fruit flesh
                </p>
                <p className="flex items-center gap-2 text-cream/90 uppercase tracking-wide">
                  <span className="text-[#D4AF37] font-extrabold text-sm">✓</span> Smooth, highly soluble & pleasant taste
                </p>
                <p className="flex items-center gap-2 text-cream/90 uppercase tracking-wide">
                  <span className="text-[#D4AF37] font-extrabold text-sm">✓</span> Low-temperature shade cure protection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Promise Footer (Geometric Card Style) */}
        <div className="mt-16 bg-black/25 p-8 rounded-none border border-[#D4AF37]/30 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]" />
          <div className="text-left space-y-2 md:max-w-xl pl-2">
            <h4 className="font-serif text-sm font-bold text-[#F4E8C1] tracking-wider uppercase flex items-center gap-1.5">
              <span>🛡️ The Absolute Seed-Free and Sourcing Promise</span>
            </h4>
            <p className="text-xs text-cream/80 font-light leading-relaxed">
              Every package of Amlora Amla Powder holds our written guarantee: 100% pure deseeded Amla pulp. If you ever encounter even a single grain of seed sediment or gritty ash at the bottom of your morning water, we will refund your purchase immediately.
            </p>
          </div>
          <a
            href="#our-products"
            className="flex-shrink-0 bg-[#D4AF37] hover:bg-amber-600 text-[#0F3D2E] font-bold px-6 py-4 rounded-none text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer text-center whitespace-nowrap"
          >
            Savor Purity Now
          </a>
        </div>
      </div>
    </section>
  );
}
