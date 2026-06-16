/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import AmlaIllustration from "./AmlaIllustration";
import { ArrowRight, Leaf, Shield, Award } from "lucide-react";

// Import images directly as modules so Vite correctly compiles and resolves them in the production build
import freshAmlaImg from "../assets/images/fresh_amla_heritage_1781511324463.jpg";

interface HeroProps {
  setActiveTab?: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  const handleShopClick = (e: React.MouseEvent) => {
    if (setActiveTab) {
      e.preventDefault();
      setActiveTab("shop");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDiscoverClick = (e: React.MouseEvent) => {
    if (setActiveTab) {
      e.preventDefault();
      setActiveTab("benefits");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0F3D2E] pt-36 pb-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden font-sans border-b border-[#D4AF37]/35"
    >
      {/* Structural Drafting Grid Overlay (Geometric Balance Signature) */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_right,rgba(212,175,55,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.12)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      {/* Background radial center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(19,90,67,0.4)_0%,#0F3D2E_90%)] pointer-events-none" />

      {/* Subtle giant vertical text accent (Aesthetic branding) */}
      <div className="absolute bottom-16 -left-12 transform -rotate-90 origin-left text-[110px] font-serif font-light text-cream/[0.03] pointer-events-none uppercase tracking-[0.1em] select-none">
        Ayurveda
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Epic copy, CTAs, and structure */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left lg:pr-6">
          {/* Sourcing Badge (Drawn with sharp balance lines) */}
          <div className="inline-flex flex-wrap items-center gap-2.5 bg-[#FAF9F6]/5 px-4 py-2 border-l-2 border-[#D4AF37] border-y border-r border-[#D4AF37]/20 shadow-sm">
            <span className="w-1.5 h-1.5 bg-[#D4AF37]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-[#F4E8C1] flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#D4AF37]" /> Manufactured in Pratapgarh UP • Best in class
            </span>
          </div>

          <div className="space-y-4">
            <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold block">
              Premium Estate Sourcing
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-serif tracking-tight leading-[1.15] text-white">
              Heritage of Amla.<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF2B2] to-[#D4AF37]">
                Crafted for Modern Wellness.
              </span>
            </h1>
            <p className="text-xs md:text-sm text-[#F5F5F0]/70 max-w-xl leading-relaxed font-light">
              Inspired by generations of trust and manufactured in Pratapgarh UP (best in class), Amlora Wellness brings the timeless goodness of seed-free, 100% pure Amla into products crafted with absolute purity and modern standards.
            </p>
          </div>

          {/* Value Props & Trust Grid (2x2 Balanced layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-2">
            <div className="p-4 border border-[#F5F5F0]/10 bg-black/15 text-left flex items-start gap-3">
              <div className="w-8 h-8 border border-[#D4AF37]/30 flex items-center justify-center rotate-45 flex-shrink-0 mt-0.5">
                <Shield className="w-3.5 h-3.5 text-[#D4AF37] -rotate-45" />
              </div>
              <div>
                <div className="text-[#D4AF37] text-xs font-serif font-bold tracking-wider mb-0.5">Pure Satiety</div>
                <div className="text-[10px] leading-tight text-cream/60 uppercase tracking-wider">100% Raw Flesh & Zero seed ash</div>
              </div>
            </div>
            
            <div className="p-4 border border-[#F5F5F0]/10 bg-black/15 text-left flex items-start gap-3">
              <div className="w-8 h-8 border border-[#D4AF37]/30 flex items-center justify-center rotate-45 flex-shrink-0 mt-0.5">
                <Award className="w-3.5 h-3.5 text-[#D4AF37] -rotate-45" />
              </div>
              <div>
                <div className="text-[#D4AF37] text-xs font-serif font-bold tracking-wider mb-0.5">Ancient Wisdom</div>
                <div className="text-[10px] leading-tight text-cream/60 uppercase tracking-wider">Traditional Ayurvedic curation</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons (Rectilinear, strict geometric framing) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
            <button
              onClick={handleShopClick}
              className="bg-[#D4AF37] hover:bg-amber-500 text-[#0F3D2E] text-center px-8 py-4 font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl hover:-translate-y-0.5 transition-all text-xs cursor-pointer border-0"
            >
              Shop Now
            </button>
            <button
              onClick={handleDiscoverClick}
              className="border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:text-[#D4AF37] text-cream text-center px-8 py-4 font-bold text-[11px] uppercase tracking-[0.18em] transition-all bg-black/10 hover:bg-[#FAF9F6]/5 cursor-pointer"
            >
              Discover Amla
            </button>
          </div>

          {/* Bottom regulatory small disclaimer */}
          <div className="flex items-center gap-4 text-[9px] text-cream/40 uppercase tracking-[0.15em] border-t border-[#D4AF37]/15 pt-4">
            <span>FSSAI NO: 30260226123537844</span>
            <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
            <span>GMP STANDARD COMPLIANT</span>
          </div>
        </div>

        {/* Right column: Rotating Showcase Container */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* Rectangular wireframe background grid accent */}
          <div className="absolute w-[360px] h-[360px] border border-[#D4AF37]/10 flex items-center justify-center pointer-events-none">
            <div className="w-[300px] h-[300px] border border-[#D4AF37]/20 flex items-center justify-center rotate-45">
              <div className="w-[240px] h-[240px] border border-[#D4AF37]/5 -rotate-45" />
            </div>
          </div>

          {/* Radiant gold sunburst background behind the Amla fruit */}
          <div className="absolute w-[240px] h-[240px] md:w-[320px] md:h-[320px] bg-[#FAF9F6] opacity-[0.02] blur-[45px] pointer-events-none" />

          {/* Dynamic Floating Label Card 1 - Sharp square layout */}
          <div className="absolute top-[12%] right-[2%] z-20 bg-[#0F3D2E] border border-[#D4AF37] p-3 shadow-2xl flex items-center gap-2.5">
            <div className="w-7 h-7 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-mono text-[10px] font-bold">
              28x
            </div>
            <div className="text-left">
              <p className="text-[9px] font-bold text-white uppercase tracking-wider">More Vitamin C</p>
              <p className="text-[8px] text-cream/60 uppercase tracking-wide">Than Fresh Oranges</p>
            </div>
          </div>

          {/* Main big Real Amla Image Render */}
          <div className="relative z-10 p-2">
            <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-2xl relative group">
              <img
                src={freshAmlaImg}
                alt="Real Pratapgarh Organic Amla"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              {/* Refined clean dark protective overlay in the bottom */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-center">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">Pratapgarh Harvest</span>
              </div>
            </div>
          </div>

          {/* Dynamic footer capsule replaced with custom geometric strip */}
          <div className="absolute -bottom-8 bg-[#0B2A20] border border-[#D4AF37]/35 px-5 py-2 flex items-center gap-4 text-[9px] font-bold text-[#F4E8C1] tracking-[0.18em] uppercase max-w-xs md:max-w-md shadow-lg">
            <span>Pure Pulp</span>
            <span className="w-1 h-1 bg-[#D4AF37]" />
            <span>Gluten-Free</span>
            <span className="w-1 h-1 bg-[#D4AF37]" />
            <span>No Sweeteners</span>
          </div>
        </div>
      </div>
    </section>
  );
}
