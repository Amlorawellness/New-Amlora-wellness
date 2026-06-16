/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Zap, Shield, Flame, Sparkles, Heart, Activity, Plus, Minus, Info, Clipboard, Activity as MuscleIcon, Eye, CheckCircle2 } from "lucide-react";
import AmlaIllustration from "./AmlaIllustration";

interface BotanicalSystem {
  id: string;
  name: string;
  sanskrit: string;
  icon: React.ReactNode;
  targetedBenefits: string[];
  impactRating: number;
  description: string;
  color: string;
  lineCoords: { cx: number; cy: number; labelX: number; labelY: number };
  scientificFact: string;
  pictorialSvg: React.ReactNode;
}

export default function WhyAmla() {
  const [orangeCount, setOrangeCount] = useState(3);
  const [activeTab, setActiveTab] = useState<"vitc" | "orac">("vitc");
  const [selectedSystem, setSelectedSystem] = useState<string>("immunity");

  const biologicalSystems: BotanicalSystem[] = [
    {
      id: "immunity",
      name: "Immunity",
      sanskrit: "Vyadhikshamatva Activation",
      icon: <Shield className="w-5 h-5" />,
      description: "Directly triggers immune surveillance. Activating macrophages and healthy lymphocytes provides a protective Ayurvedic shield against environmental changes.",
      targetedBenefits: [
        "Delivers 28x more concentrated Vitamin C than oranges",
        "Assists leukocyte mobilization for rapid defense action",
        "Locks in rich organic bioactive compounds for year-round vigor"
      ],
      impactRating: 95,
      color: "from-amber-500 to-yellow-600",
      lineCoords: { cx: 25, cy: 30, labelX: -20, labelY: -15 },
      scientificFact: "Natural vitamin levels inside Amla are bound by organic chelates, making them bioavailable.",
      pictorialSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-600">
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
          <path d="M50 28 L50 72 M28 50 L72 50" stroke="currentColor" strokeWidth="1" />
          <polygon points="50,14 55,24 45,24" fill="currentColor" />
          <polygon points="50,86 55,76 45,76" fill="currentColor" />
          <polygon points="14,50 24,45 24,55" fill="currentColor" />
          <polygon points="86,50 76,45 76,55" fill="currentColor" />
          <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-pulse" />
        </svg>
      )
    },
    {
      id: "digestion",
      name: "Digestion",
      sanskrit: "Agni-Deepana Comfort",
      icon: <Flame className="w-5 h-5" />,
      description: "Nourishes systemic digestion. Organic fruit acids and natural soluble pectins soothe mucosal intestinal layers while activating enzyme triggers.",
      targetedBenefits: [
        "Soothes hyperacidity and cools the deep intestinal tract",
        "Soluble fiber binds toxins and aids rapid daily transit",
        "Maintains balanced pH and balances digestive fires (Pitta)"
      ],
      impactRating: 92,
      color: "from-red-500 to-orange-600",
      lineCoords: { cx: 25, cy: 70, labelX: -15, labelY: 15 },
      scientificFact: "High pectin density blocks post-meal glucose absorption spikes inside stomach tracks.",
      pictorialSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-red-700">
          <path d="M30 35 C30 50, 45 40, 40 70 C42 80, 58 80, 60 70 C55 40, 70 50, 70 35 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 20 L50 35" stroke="currentColor" strokeWidth="1" />
          <path d="M42 52 C45 55, 55 55, 58 52" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="62" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "skin",
      name: "Skin",
      sanskrit: "Varnya Luster",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Stops free radical damage that accelerates aging. Promotes microcirculation and stabilizes skin tissues to block environmental stress damage.",
      targetedBenefits: [
        "Supports natural collagen synthesis inside dermal cells",
        "Neutralizes UV photo-damage and blue-screen aging fatigue",
        "Brightens overall complexion for natural luminescent clarity"
      ],
      impactRating: 91,
      color: "from-pink-500 to-rose-600",
      lineCoords: { cx: 75, cy: 30, labelX: 15, labelY: -10 },
      scientificFact: "Active emblicanin tannins are superior electron donors for repairing oxidative skin damage.",
      pictorialSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-pink-700">
          <path d="M12 35 C12 15, 35 10, 50 28 C65 10, 88 15, 88 35 C88 62, 50 88, 50 88 C50 88, 12 62, 12 35 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="44" r="12" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        </svg>
      )
    },
    {
      id: "hair",
      name: "Hair",
      sanskrit: "Keshya Rasayana",
      icon: <Zap className="w-5 h-5" />, // We use Zap or custom for Hair
      description: "Nourishes the scalp from deep within. Amla inhibits alpha-5 reductase enzymes (which cause hair miniaturization and thinning) while fueling follicular melanin reserves.",
      targetedBenefits: [
        "Boosts follicular collagen synthesis by +42%",
        "Maintains rich natural pigment (reduces premature graying)",
        "Deeply conditions hair roots for stronger tensile strength"
      ],
      impactRating: 98,
      color: "from-emerald-500 to-green-600",
      lineCoords: { cx: 50, cy: 15, labelX: -20, labelY: -15 },
      scientificFact: "Emblica tannins reinforce keratin bonds, reducing mechanical fracture of hair threads.",
      pictorialSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-700">
          <path d="M50 20 C65 20, 75 35, 75 55 C75 80, 50 95, 50 95 C50 95, 25 80, 25 55 C25 35, 35 20, 50 20 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 20 V95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M50 40 Q70 48, 72 55" stroke="currentColor" strokeWidth="1" />
          <path d="M50 30 Q30 38, 28 45" stroke="currentColor" strokeWidth="1" />
          <circle cx="50" cy="20" r="3" fill="currentColor" />
        </svg>
      )
    },
    {
      id: "antioxidants",
      name: "Antioxidants",
      sanskrit: "Prana-Rikta Cellular Shield",
      icon: <Activity className="w-5 h-5" />,
      description: "Packed with active polyphenols, emblicanin-A and emblicanin-B, which act as cascading electron donors for cell repair and natural cellular defense.",
      targetedBenefits: [
        "Fights cellular wear-and-tear at a deep mitochondrial level",
        "Remains stable even under heat and extended dry storage",
        "Neutralizes oxidative stress from modern fast-paced living"
      ],
      impactRating: 96,
      color: "from-purple-500 to-indigo-600",
      lineCoords: { cx: 75, cy: 70, labelX: 15, labelY: 15 },
      scientificFact: "Amla's active chemical profile acts as a continuous cascading antioxidant rather than a single-use action.",
      pictorialSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-purple-700">
          <ellipse cx="50" cy="50" rx="35" ry="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="50" cy="50" rx="20" ry="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: "daily_wellness",
      name: "Daily Wellness",
      sanskrit: "Sarvanga Sanjeevani",
      icon: <Heart className="w-5 h-5" />,
      description: "Integrates systemic vitality by nourishing all seven layers of tissues (Dhatus) in the human body, balancing the bio-energies (doshas).",
      targetedBenefits: [
        "Balances Pitta, Vata, and Kapha for absolute emotional equilibrium",
        "Boosts metabolic efficiency to convert food into pure vital energy",
        "Encourages sustainable wakefulness without coffee jitters"
      ],
      impactRating: 94,
      color: "from-blue-500 to-indigo-600",
      lineCoords: { cx: 50, cy: 85, labelX: 0, labelY: 20 },
      scientificFact: "Amla works adaptogenically, adjusting body systems based on high or low physical load states.",
      pictorialSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-indigo-700">
          <polygon points="50,15 85,80 15,80" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
        </svg>
      )
    }
  ];

  // Calculator figures
  const equivalentAmlaScoops = ((orangeCount * 53) / 240).toFixed(1);
  const equivalentOrangesForAntioxidants = (orangeCount * 4.5).toFixed(0);

  const activeSystem = biologicalSystems.find((s) => s.id === selectedSystem) || biologicalSystems[0];

  return (
    <section id="why-amla" className="py-16 md:py-20 bg-[#FAF9F5] font-sans border-b border-[#0F3D2E]/15 scroll-mt-20 relative">
      {/* Decorative vertical drafting axis */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#0F3D2E_1px,transparent_1px),linear-gradient(to_bottom,#0F3D2E_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Organic India Look Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-[#0F3D2E] border border-[#0F3D2E]/25 bg-[#FAF9F6] px-3.5 py-1.5 inline-block">
            🌿 Scientific Sourcing & Benefits Analysis
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F3D2E] tracking-tight leading-snug">
            Why Amla is India's <br />
            <span className="italic text-[#A2811A]">Original Superfruit</span>
          </h2>
          <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed font-light font-sans">
            Amla goes beyond simple chemical supplements. Its physical, raw nature interacts dynamically with these six core biological pathways of the human body.
          </p>
        </div>

        {/* PICTORIAL SEGMENT: Interactive Somerset Botanical Diagram Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-[#0F3D2E]/10 p-8 shadow-xl mb-20">
          
          {/* L1: Diagram Map Container (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative bg-gradient-to-b from-cream/20 to-cream/70 border border-[#D4AF37]/20 p-6">
            
            {/* Fine Grid Technical Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#0F3D2E_1px,transparent_1px)] bg-[size:16px_16px]" />
            <span className="absolute top-3 left-3 text-[8px] font-mono tracking-widest text-[#0F3D2E]/40 font-bold uppercase">Fig 1.2: Somatic Organic Map</span>

            {/* Interactive Anatomical SVG Stage */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Radial Pulse Backdrops */}
              <div className="absolute inset-0 rounded-full bg-emerald-100/30 animate-ping pointer-events-none" style={{ animationDuration: "10s" }} />

              {/* Central Real Amla Superfruit Image */}
              <div className="relative z-10 transition-transform duration-500 hover:scale-105 flex flex-col items-center">
                <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl relative bg-[#0F3D2E]/5">
                  <img 
                    src="/src/assets/images/fresh_amla_heritage_1781511324463.jpg" 
                    alt="Genuine Sourced Pratapgarh Amla"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d2e]/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <span className="mt-3 text-[9px] font-mono tracking-widest text-[#0F3D2E] font-bold uppercase bg-[#FAF9F5]/90 border border-[#D4AF37]/45 px-3 py-1 shadow-sm rounded-full">
                  🍃 100% Real Sourced Amla
                </span>
              </div>

              {/* Interactive Vector Overlay Network (Hotspots linked to the biological points) */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-20">
                {biologicalSystems.map((sys) => (
                  <line 
                    key={sys.id}
                    x1="50" 
                    y1="50" 
                    x2={sys.lineCoords.cx} 
                    y2={sys.lineCoords.cy} 
                    stroke="#135A43" 
                    strokeWidth="0.75" 
                    strokeDasharray="3 2" 
                  />
                ))}
              </svg>

              {/* Hotspot buttons centered over the botanical targets */}
              {biologicalSystems.map((sys) => {
                const isActive = sys.id === selectedSystem;
                return (
                  <button
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys.id)}
                    className={`absolute z-30 flex items-center justify-center p-2 rounded-full border shadow-lg transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                      isActive
                        ? "bg-[#0F3D2E] text-[#D4AF37] border-[#D4AF37] scale-125 ring-4 ring-[#D4AF37]/20"
                        : "bg-white text-[#0F3D2E] border-[#0F3D2E]/15 hover:border-[#D4AF37] hover:scale-110"
                    }`}
                    style={{
                      left: `${sys.lineCoords.cx}%`,
                      top: `${sys.lineCoords.cy}%`,
                    }}
                    title={`View ${sys.name}`}
                  >
                    {sys.icon}
                  </button>
                );
              })}
            </div>

            {/* Hint tag */}
            <p className="mt-4 text-[9px] font-mono tracking-wider text-gray-500 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              Click the nodal hubs above to chart biological targets
            </p>
          </div>

          {/* L2: Interactive Somatic Informational Deck (6 Columns) */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left space-y-6 lg:pl-4">
            
            <div className="space-y-4">
              {/* Tabs list directly aligned inside Somerset layout */}
              <div className="flex flex-wrap gap-2 border-b border-[#0F3D2E]/10 pb-3">
                {biologicalSystems.map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys.id)}
                    className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                      selectedSystem === sys.id
                        ? "bg-[#0F3D2E]/10 text-[#0F3D2E] border-[#D4AF37]"
                        : "border-transparent text-gray-500 hover:text-[#0F3D2E]"
                    }`}
                  >
                    {sys.name.split(" & ")[0]}
                  </button>
                ))}
              </div>

              {/* Dynamic systemic details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#0F3D2E] text-[#D4AF37] border border-[#D4AF37]/35 rotate-45">
                    <div className="-rotate-45">{activeSystem.icon}</div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-[#A2811A] block uppercase">
                      {activeSystem.sanskrit}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0F3D2E]">
                      {activeSystem.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {activeSystem.description}
                </p>
              </div>

              {/* Somatic Bullet Checklist - Visually stylized matching Organic India */}
              <div className="space-y-2 pt-2 bg-cream/20 p-4 border-l-2 border-[#D4AF37]">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-3">
                  ✦ TARGETED SOMATIC PROFILE
                </h4>
                {activeSystem.targetedBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pictorial comparison metric graph & raw scientific facts */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pt-4 border-t border-gray-100 items-center">
              
              {/* Graphic 1: Pictorial representation vector */}
              <div className="sm:col-span-3 flex justify-center sm:justify-start">
                <div className="p-2 bg-white border border-[#D4AF37]/30 shadow-inner flex items-center justify-center">
                  {activeSystem.pictorialSvg}
                </div>
              </div>

              {/* Graphic 2: Clinical performance index */}
              <div className="sm:col-span-9 space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-gray-500 uppercase tracking-widest">Somatic Absorption Rate</span>
                  <span className="font-mono font-bold text-emerald-800">{activeSystem.impactRating}%</span>
                </div>
                
                {/* Clean progress bar */}
                <div className="w-full h-1.5 bg-gray-200">
                  <div 
                    className="h-full bg-emerald-700 transition-all duration-700"
                    style={{ width: `${activeSystem.impactRating}%` }}
                  />
                </div>

                <p className="text-[9px] font-mono text-[#A2811A] tracking-wide leading-tight">
                  🧬 CLINICAL VERDICT: {activeSystem.scientificFact}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* COMPARATIVE INTERACTIVE CALCULATOR (The Wow Element!) - Styled like an Organic Ledger */}
        <div className="bg-[#0F3D2E] p-6 md:p-12 text-white shadow-2xl relative overflow-hidden border border-[#D4AF37]/30">
          <div className="absolute inset-3 border border-[#D4AF37]/10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-rich opacity-10 pointer-events-none blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            {/* Left intro text */}
            <div className="lg:col-span-5 space-y-4 md:pr-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/30 bg-black/20 px-3 py-1 inline-block">
                Superfood Comparison Ledger
              </span>
              <h3 className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                Estimate Your Daily <br />
                <span className="text-[#D4AF37] italic">Amla Potential</span>
              </h3>
              <p className="text-xs text-cream/75 leading-relaxed font-light">
                Did you know that taking just <strong>one spoonful</strong> of seed-free Amlora Amla Powder gives you more active Vitamin C and antioxidants than a bag of fresh citrus? Adjust the slider to see how standard grocery fruits compare.
              </p>

              {/* Toggle switch for Metric focus */}
              <div className="flex bg-black/20 border border-[#D4AF37]/25 p-1 max-w-[280px]">
                <button
                  onClick={() => setActiveTab("vitc")}
                  className={`flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                    activeTab === "vitc" ? "bg-[#D4AF37] text-[#0F3D2E]" : "text-cream/70 hover:text-white"
                  }`}
                >
                  Vitamin C
                </button>
                <button
                  onClick={() => setActiveTab("orac")}
                  className={`flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                    activeTab === "orac" ? "bg-[#D4AF37] text-[#0F3D2E]" : "text-cream/70 hover:text-white"
                  }`}
                >
                  Antioxidant ORAC
                </button>
              </div>
            </div>

            {/* Right slider interface */}
            <div className="lg:col-span-7 bg-black/10 border border-[#D4AF37]/20 p-6 md:p-8 md:grid md:grid-cols-12 gap-6 space-y-6 md:space-y-0">
              {/* Slider panel */}
              <div className="md:col-span-6 space-y-4 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F4E8C1]">If you consume:</span>
                  <span className="text-[11px] font-bold text-white bg-[#0F3D2E] border border-[#D4AF37]/40 px-3 py-1 flex items-center gap-1 font-mono">
                    {orangeCount} Oranges
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOrangeCount(Math.max(1, orangeCount - 1))}
                    className="p-2 border border-[#D4AF37]/20 bg-[#0F3D2E] hover:border-[#D4AF37] text-white cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={orangeCount}
                    onChange={(e) => setOrangeCount(parseInt(e.target.value))}
                    className="flex-grow accent-[#D4AF37] cursor-pointer h-1 rounded-none appearance-none bg-[#FAF9F6]/20"
                  />
                  <button
                    onClick={() => setOrangeCount(Math.min(15, orangeCount + 1))}
                    className="p-2 border border-[#D4AF37]/20 bg-[#0F3D2E] hover:border-[#D4AF37] text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[9px] text-cream/50 uppercase tracking-widest leading-normal">
                  * Based on USDA Database. 1 orange = ~53mg Ascorbic acid.
                </p>
              </div>

              {/* Equivalence display */}
              <div className="md:col-span-6 bg-[#0B2A20] border border-[#D4AF37]/25 p-5 flex flex-col justify-center text-center space-y-3 relative">
                <div className="absolute top-2.5 right-2.5 flex items-center text-cream/30">
                  <Info className="w-3.5 h-3.5" />
                </div>

                {activeTab === "vitc" ? (
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.18em] leading-none">
                      Equivalency Scoop
                    </p>
                    <span className="text-4xl md:text-5xl font-mono font-bold text-white block">
                      {equivalentAmlaScoops}
                    </span>
                    <p className="text-[11px] font-serif italic text-[#FAF9F6] pt-1">
                      Teaspoons of Amlora 🍃
                    </p>
                    <p className="text-[9px] text-cream/60 leading-tight">
                      Gives you {orangeCount * 53}mg of non-oxidized organic Vitamin C safely.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.18em] leading-none">
                      Antioxidant Satiety
                    </p>
                    <span className="text-4xl md:text-5xl font-mono font-bold text-white block">
                      {equivalentOrangesForAntioxidants}
                    </span>
                    <p className="text-[11px] font-serif italic text-[#FAF9F6] pt-1">
                      Sweet Oranges!
                    </p>
                    <p className="text-[9px] text-cream/60 leading-tight">
                      Amla contains complex biological tannins (Emblicanins) that multiply protection.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
