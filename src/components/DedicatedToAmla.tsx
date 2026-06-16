/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, HelpCircle, Heart, Star } from "lucide-react";

export default function DedicatedToAmla() {
  return (
    <section 
      id="dedicated-to-amla" 
      className="py-24 bg-[#0F3D2E] text-[#FAF9F5] font-sans scroll-mt-20 relative overflow-hidden text-center border-y border-[#D4AF37]/20"
    >
      {/* Decorative concentric structural background lines representing hyper-focus on one singular core */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full border border-white" />
        <div className="w-[500px] h-[500px] rounded-full border border-white absolute" />
        <div className="w-[700px] h-[700px] rounded-full border border-white absolute" />
        <div className="w-[900px] h-[900px] rounded-full border border-white absolute" />
      </div>

      {/* Decorative leafy patterns in margins */}
      <div className="absolute left-6 top-8 text-[8px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]/45 pointer-events-none">
        Amlora Brand Covenant
      </div>
      <div className="absolute right-6 bottom-8 text-[8px] font-mono tracking-[0.2em] uppercase text-[#D4AF37]/45 pointer-events-none">
        Sovereign Purity
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-8 select-none">
        
        {/* Absolute Focus Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 bg-black/20 rounded-none">
          <Star className="w-3.5 h-3.5 text-[#D4AF37]" fill="#D4AF37" />
          <span className="text-[9px] uppercase font-bold tracking-[0.18em] text-[#D4AF37]">
            The Sovereign Choice
          </span>
        </div>

        {/* Big Wow Headline */}
        <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-[#FAF9F5]">
          One Fruit. <br className="sm:hidden" />
          <span className="italic text-[#D4AF37]">One Mission.</span> <br className="sm:hidden" />
          One Brand.
        </h2>

        {/* Visual focal element */}
        <div className="flex justify-center py-2">
          <div className="h-[2px] w-32 bg-[#D4AF37]" />
        </div>

        {/* Pure evocative branding argument */}
        <p className="text-base md:text-xl font-serif text-cream/90 italic font-light leading-relaxed max-w-2xl mx-auto">
          "Most wellness brands dilute their attention by manufacturing hundreds of disparate formulas, pills, and capsules. We believe in sovereign focus. We dedicated our entire existence to one single, extraordinary Ayurvedic botanical. <span className="font-bold text-white not-italic border-b border-[#D4AF37]">AMLA</span>."
        </p>

        {/* Small supportive list of focal facts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 max-w-3xl mx-auto text-left">
          <div className="border border-white/5 bg-black/10 p-5 space-y-2">
            <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#D4AF37]">01 / Single-Origin Sourcing</h4>
            <p className="text-[11px] text-cream/70 leading-relaxed font-light">
              Nurtured exclusively within selected certified family orchards of Pratapgarh, Uttar Pradesh.
            </p>
          </div>
          <div className="border border-white/5 bg-black/10 p-5 space-y-2">
            <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#D4AF37]">02 / Manual Processing Only</h4>
            <p className="text-[11px] text-cream/70 leading-relaxed font-light">
              Separating seedless segments manually to prevent seed-crush bitterness from entering the pulp.
            </p>
          </div>
          <div className="border border-white/5 bg-black/10 p-5 space-y-2">
            <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#D4AF37]">03 / Total Transparency</h4>
            <p className="text-[11px] text-cream/70 leading-relaxed font-light">
              100% trace evidence of organic cultivation, double-batch tested for zero pesticides or toxic chemicals.
            </p>
          </div>
        </div>

        <p className="text-[10px] uppercase font-mono tracking-[0.22em] text-cream/40">
          — Crafted with supreme reverence by AMLORA WELLNESS —
        </p>
      </div>
    </section>
  );
}
