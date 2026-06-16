/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BookOpen, MapPin, Wine, Calendar, Heart } from "lucide-react";

// Import images directly as modules so Vite correctly compiles and resolves them in the production build
import amloraWellnessStoryImg from "../assets/images/amlora_wellness_story_1781518791172.jpg";

export default function AmlaStory() {
  const timelineSteps = [
    {
      id: "heritage",
      year: "5000 Years Ago",
      title: "The Ancient Origins",
      subtitle: "Divine Amritphal of Vedic Sages",
      description: "Spoken of in ancient scriptures as the nectar of immortality. Vedic rishis described a sacred fruit so potent it could cool systemic fires, nourish the heart, and preserve the deep essence of youth.",
      icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: "ayurveda",
      year: "Ayurveda",
      title: "The Sacred Texts",
      subtitle: "Wisdom of Charaka Samhita",
      description: "Documented as India's ultimate Rasayana (rejuvenator). Traditional healers cherished Amla's rare five-taste profile, utilizing it to harmonize biological pathways and restore systemic balance.",
      icon: <Wine className="w-5 h-5 text-[#D4AF37]" /> // Using wine cups as traditional vessel elixir icon
    },
    {
      id: "generations",
      year: "Generations",
      title: "Generational Guardians",
      subtitle: "Pratapgarh Agricultural Heritage",
      description: "Passed down through families of small-holder orchards. Farmers harvest tree-ripened Indian gooseberries by hand, ensuring that every fruit is nurtured with absolute local ancestral pride.",
      icon: <MapPin className="w-5 h-5 text-[#D4AF37]" />
    },
    {
      id: "amlora",
      year: "Amlora Wellness",
      title: "Amlora's Pure Standard",
      subtitle: "Crafted for Modern Living",
      description: "Today, we carry this torch. By separating the bitter woody seed from the lush pulp by hand and avoiding bulk corporate crushing, we deliver natural Amla in its pristine therapeutic power.",
      icon: <Heart className="w-5 h-5 text-[#D4AF37]" />
    }
  ];

  return (
    <section id="our-story" className="py-16 md:py-20 bg-[#FAF9F6] font-sans border-b border-[#0F3D2E]/15 scroll-mt-20 overflow-hidden relative">
      {/* Decorative vertical drafting axis */}
      <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-[#D4AF37]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 text-left">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] bg-[#0F3D2E] px-4 py-2 border border-[#D4AF37]/30 inline-block">
              Centuries of Devotion
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
              An Ancestral Blessing, Handcrafted for Modern Healing
            </h2>
            <div className="h-[1px] w-24 bg-[#D4AF37]" />

            <div className="space-y-5 text-xs md:text-sm text-gray-600 leading-relaxed font-light">
              <p>
                For thousands of years, the Amla tree has been revered across India not simply as a nutrient, but as a living maternal spirit. On the sacred morning of <em>Amla Navami</em>, entire families gather around its canopy, tying threads of deep love and gratitude. It is hailed as the <em>Amritphal</em>—the nectar-fruit of immortality—carrying a natural, perfect blueprint designed to harmonize our inner waters and restore the human soul.
              </p>
              <p>
                But modern industrialization has stripped the heart from this ancient wisdom. Huge wellness corporations treat these sacred fruits as simple commodities on bulk spreadsheets. They rip them raw from trees, toss them into violent hammer-mills that grind the woody, bitter, heavy-metal-retaining seeds along with the skin, and pass them through scorching heaters that burn off every active enzyme and delicate vitamin.
              </p>
              <p className="font-semibold text-[#0F3D2E] text-sm md:text-base italic font-serif">
                Amlora Wellness was born from a simple, unshakeable promise: to guard this sacred heritage. We walked into the morning fog of India’s family orchards, witnessed the quiet dignity of hands picking each apple-green fruit, and resolved to build a sanctuary where Amla is cured like gold.
              </p>
            </div>

            {/* Product Luxury Real Image Card */}
            <div className="border border-[#0F3D2E]/10 bg-white p-4 shadow-md hover:border-[#D4AF37]/45 transition-colors group">
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 border border-gray-150 relative">
                <img
                  src={amloraWellnessStoryImg}
                  alt="Amlora Wellness Sourced Fresh Amla and Premium Elixir"
                  className="w-full h-full object-cover grayscale-[20%] opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-[#0F3D2E] text-[#D4AF37] border border-[#D4AF37]/35 text-[8px] font-mono tracking-widest font-bold px-2 py-1">
                  ✦ THE INTEGRITY OF HARVEST
                </div>
              </div>
              <p className="text-[10px] text-gray-500 font-sans italic text-center mt-3 leading-dashed">
                Freshly gathered organic Pratapgarh amla and cold-extracted Amlora Wellness liquid.
              </p>
            </div>

            {/* Quote block - Geometric styling */}
            <div className="bg-[#0F3D2E] text-white p-6 border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/15 shadow-lg relative">
              <div className="absolute right-3 bottom-2 text-cream/[0.04] font-serif text-6xl leading-none select-none">“</div>
              <p className="text-xs italic font-serif leading-relaxed text-[#FAF9F6]/90 relative z-10">
                &ldquo;We focus entirely on one single, extraordinary botanical. This unyielding devotion ensures that every drop and granule bearing the Amlora Wellness seal is the purest, most biologically vital amla on this Earth.&rdquo;
              </p>
              <p className="text-[9px] font-bold uppercase text-[#D4AF37] tracking-[0.2em] mt-3 block relative z-10">
                — OUR MATERNAL HEALING PROMISE
              </p>
            </div>
          </div>

          {/* Right Column: Timeline Design */}
          <div className="lg:col-span-12 xl:col-span-7 relative pl-4 md:pl-10">
            {/* Timeline vertical bar */}
            <div className="absolute left-[24px] md:left-[54px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-[#D4AF37] via-[#0F3D2E]/20 to-transparent" />

            <div className="space-y-8">
              {timelineSteps.map((step) => (
                <div key={step.id} className="relative flex gap-4 md:gap-8 items-start text-left group">
                  {/* Timeline point - Rotated Square/Diamond for Geometric Theme */}
                  <div className="w-10 h-10 bg-[#0F3D2E] border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 z-10 transition-all group-hover:scale-105 shadow-md rotate-45">
                    <div className="-rotate-45">
                      {step.icon}
                    </div>
                  </div>

                  {/* Text card - Sharp rectilinear custom card */}
                  <div className="flex-1 bg-white p-6 border border-[#0F3D2E]/10 shadow-sm hover:border-[#D4AF37]/50 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase">
                        {step.year}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-[#0F3D2E] opacity-75 tracking-wide mt-1 sm:mt-0">
                        {step.subtitle}
                      </h4>
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#0F3D2E] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
