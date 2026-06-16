/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Award, Compass, Heart, Map, Quote, Sprout, ShieldCheck } from "lucide-react";
import LoyaltyProgram from "./LoyaltyProgram";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF9F5] text-[#0F3D2E] pt-24">
      {/* Editorial Sourced Banner */}
      <section className="relative overflow-hidden bg-[#0F3D2E] text-[#FAF9F5] py-24 border-b border-[#D4AF37]/20 select-none">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-[size:16px_16px]" />
        
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] border border-[#D4AF37]/35 bg-black/20 px-4 py-2 inline-block">
            Our Rooted Genesis & Cultivation
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight tracking-tight text-white">
            Sovereign Devotion. <br />
            <span className="italic text-[#D4AF37]">One Fruit. One Mission.</span>
          </h1>
          <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
          <p className="text-sm md:text-lg text-cream/80 max-w-2xl mx-auto leading-relaxed font-light">
            Founded with an unyielding mandate: to salvage the pure, therapeutic heritage of India’s maternal superfruit from industrial hyper-processing. We treat Amla not as a commodity list item, but as our absolute focus.
          </p>
        </div>
      </section>

      {/* Terroir & Origin Deep Dive */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Sourcing narrative */}
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#A2811A] font-bold">
              01 / Geographic Terroir Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
              Grown in Pratapgarh's <br />
              <span className="italic text-[#A2811A]">Sacred Mineral Soils</span>
            </h2>
            <div className="h-[1px] w-16 bg-[#D4AF37]" />
            
            <div className="space-y-4 text-xs md:text-sm text-gray-600 leading-relaxed font-light">
              <p>
                Pratapgarh, Uttar Pradesh is hailed throughout the Indian subcontinent as the absolute historical cradle of wild and grafted Amla heritage. Here, the unique topography is fed by pristine natural underground aquifers and historically enriched silt deposits.
              </p>
              <p>
                This specialized geographic terroir supercharges our tree-ripened fruits with incredibly elevated active chemical densities. The alkaline soil variables impart our fruits with substantially higher ascorbic acid (Vitamin C) metrics and highly concentrated protective antioxidants than commercial varieties grown in sandy, depleted regions.
              </p>
              <p className="font-semibold text-[#0F3D2E] italic">
                Amlora partners exclusively with local generational family orchards. We reject bulk mechanical auction-house commodity fruits to ensure every harvest represents the direct pride of generational earth care.
              </p>
            </div>
          </div>

          {/* Sourced image frame */}
          <div className="border border-[#0F3D2E]/10 bg-white p-4 shadow-xl hover:border-[#D4AF37]/35 transition-colors group">
            <div className="aspect-[4/3] overflow-hidden bg-gray-50 border border-gray-150 relative">
              <img
                src="/src/assets/images/fresh_amla_heritage_1781511324463.jpg"
                alt="Generational fresh amla harvest"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0F3D2E] text-[#D4AF37] border border-[#D4AF37]/30 text-[8px] font-mono tracking-widest font-bold px-2 py-1">
                ✦ PRATAPGARH HARVEST RECORD
              </div>
            </div>
            <p className="text-[10px] text-gray-500 font-sans italic text-center mt-3 leading-normal">
              Freshly gathered amla fruits displaying clean, tree-ripened deep forest green health profiles.
            </p>
          </div>

        </div>
      </section>

      {/* The Slicing difference (Seeds separation explanation) */}
      <section className="bg-white py-20 border-y border-[#0F3D2E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* visual representation of mechanical crush vs Amlora manual deseed */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Bad industry option */}
              <div className="border border-red-500/10 bg-red-50/5 p-6 space-y-4 text-left">
                <div className="text-xs font-mono font-bold tracking-wider text-red-700 uppercase">
                  ⚡ Mass Corporate Crusher
                </div>
                <p className="text-[11px] text-red-900 leading-relaxed font-light">
                  Standard factory operations toss entire raw fruits directly into bulk steel hammer-mills. This grinds the extremely hard, woody, highly bitter internal seed directly into the final powder blend.
                </p>
                <ul className="text-[10px] text-red-800 space-y-1 font-mono">
                  <li>❌ Bitterness contaminated pulp</li>
                  <li>❌ Leftover sandy/grit mouth-feel</li>
                  <li>❌ Diluted ascorbic vitality</li>
                  <li>❌ Heavy metals stored in seeds</li>
                </ul>
              </div>

              {/* Amlora exquisite manual approach */}
              <div className="border border-[#D4AF37]/30 bg-[#0F3D2E]/5 p-6 space-y-4 text-left relative overflow-hidden">
                <div className="absolute right-[-10px] top-[-10px] bg-[#D4AF37] text-[#0F3D2E]/80 text-[7px] font-black tracking-widest uppercase px-3 py-1 rotate-45 transform">
                  GENUINE
                </div>
                <div className="text-xs font-mono font-bold tracking-wider text-[#A2811A] uppercase">
                  🏆 The Amlora separation Method
                </div>
                <p className="text-[11px] text-[#0F3D2E] leading-relaxed font-light">
                  We hand-strip the lush ripe fruit pulp segments, letting the inner woody core fall away intact. No machinery crushes the seeds, thus absolutely zero bitter seed-grit is allowed to contaminate our formulations.
                </p>
                <ul className="text-[10px] text-emerald-800 space-y-1 font-sans font-bold">
                  <li>✔ 100% seed-free pulp</li>
                  <li>✔ Naturally sweet-tangy flavor trail</li>
                  <li>✔ Smooth, highly soluble micro-mill</li>
                  <li>✔ Pristine organic compliance</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Slicing Narrative */}
          <div className="order-1 lg:order-2 space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#A2811A] font-bold">
              02 / The Hand deseeded separation Integrity
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
              Why We Separately Hand-Strip <br />
              <span className="italic text-[#A2811A]">Every Single Seed</span>
            </h2>
            <div className="h-[1px] w-16 bg-[#D4AF37]" />
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
              Most mass wellness corporations treat Amla as a heavy mass-bulk throughput on spreadsheet layouts. They purchase low-cost country berries, sweep them onto large conveyor layouts, and crush them entire. The result is a gritty, gray, chalky powder plagued with a stark sand-like residue that remains at the bottom of your cup.
            </p>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
              At Amlora, our family-led operations perform manual deseeded segmentation. By parting the fruit wedges by hand, we secure the true, lush therapeutic flesh. This ensures a clean, gritty-free intake, delightfully tangy flavors, and absolute therapeutic security.
            </p>
          </div>

        </div>
      </section>

      {/* Founder's Majestic Devotional Letter */}
      <section className="py-24 bg-[#0F3D2E] text-white select-none border-b border-[#D4AF37]/20 relative">
        <div className="absolute right-12 bottom-6 text-cream/[0.04] font-serif text-9xl select-none pointer-events-none">“</div>
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/20 border border-[#D4AF37]/35">
            <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[9px] uppercase tracking-widest font-bold text-[#D4AF37]">A Message From our Family Sourcing Team</span>
          </div>

          <h3 className="text-3xl md:text-5xl font-serif italic text-cream leading-snug">
            "Reverence is our ultimate ingredient."
          </h3>

          <div className="space-y-6 text-sm text-cream/80 font-light leading-relaxed text-left max-w-2xl mx-auto">
            <p>
              In our childhood memories, the Amla tree represented more than fruits; it was a living maternal shelter. On <em>Amla Navami</em>, we tied sacred red threads around its branches as a token of absolute trust. Its fruits preserved our immunity through the dry winter winds.
            </p>
            <p>
              When we founded Amlora Wellness, we resolved never to sacrifice this childhood devotion for corporate volume. Each year, we personally walk the quiet orchards of Pratapgarh, watching the morning dew settle over the green canopy. We ensure every family orchard is compensated fairly, and we preserve every active enzyme through low-temperature shade curing.
            </p>
            <p>
              We dedicate our whole brand to this one singular tree. We invite you to experience the difference that true maternal devotion and clean, deseeded handling makes.
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 inline-block text-left">
            <p className="text-sm font-serif text-[#D4AF37] font-bold tracking-wide">The Sourcing Team of Amlora</p>
            <p className="text-[10px] text-cream/50 uppercase tracking-widest mt-0.5">Ranjeetpur Chilbila, Pratapgarh, UP</p>
          </div>
        </div>
      </section>

      {/* Embedded Rewards Loyalty Section */}
      <LoyaltyProgram />
    </div>
  );
}
