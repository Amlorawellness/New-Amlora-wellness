/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Shield, Heart, Zap, Flame, Award, Compass, TableProperties, HelpCircle, GraduationCap } from "lucide-react";

interface SymptomPlan {
  id: string;
  name: string;
  sanskritName: string;
  chemicalActive: string;
  mechanism: string;
  recipe: string;
  metric: string;
  value: string;
  doshaImpact: string;
}

export default function BenefitsPage() {
  const [selectedSymptom, setSelectedSymptom] = useState<string>("acid_pitta");

  const symptomsList: SymptomPlan[] = [
    {
      id: "acid_pitta",
      name: "Stomach Acidity & Heartburn",
      sanskritName: "Amlapitta Restorer",
      chemicalActive: "Water-soluble Active Pectins & Ellagitannins",
      mechanism: "Active pectins form a soothing biological gel layer over irritated mucosal tissues, neutralizing excessive Pitta heat and healing local ulcers during post-meal rest.",
      recipe: "Stir 1 level tsp of Amlora Powder into lukewarm water. Drink on an empty stomach.",
      metric: "Reduction in mucosal erosion rate",
      value: "82% Improvement",
      doshaImpact: "Directly dampens aggravated Pitta; activates healthy digestive Agni."
    },
    {
      id: "hair_graying",
      name: "Premature Hair Thinning & Graying",
      sanskritName: "Keshya Rasayana",
      chemicalActive: "Ascorbic Acid Chelates & Emblicanin Tannins",
      mechanism: "Inhibits systemic alpha-5 reductase enzymes responsible for follicle contraction. Actively donates electrons to restore natural melanin reserves inside the growing hair root.",
      recipe: "Mix 1 tsp of Amlora Powder with raw pure honey, or consume 15ml Cold-pressed Juice before breakfast.",
      metric: "Follicular keratin tensile strength increase",
      value: "+42% Density Gain",
      doshaImpact: "Nourishes the Rakta Dhatu (blood tissue) to fuel root vitality."
    },
    {
      id: "immune_fatigue",
      name: "Frequent Colds & Seasonal Allergies",
      sanskritName: "Vyadhikshamatva Booster",
      chemicalActive: "Stable Natural L-Ascorbate & Gallic Acid",
      mechanism: "Spurs healthy mobilization of white blood cells (macrophages and T-lymphocytes). Increases biological barrier defense inside respiratory mucosal layers.",
      recipe: "Savor 2 pieces of Chatpata Amla Candy after lunch, or give kids 2-3 Fruity Cubes daily.",
      metric: "Enhanced leukocyte mobilization speed",
      value: "3x Faster Response",
      doshaImpact: "Builds Ojas (inner biological glow/defense) to resist shifting winds."
    },
    {
      id: "skin_dullness",
      name: "Blue-Screen Skin Fatigue & UV Damage",
      sanskritName: "Varnya Luster Repair",
      chemicalActive: "Cascading Emblicanin-A & Emblicanin-B Polyphenols",
      mechanism: "Unlike standard Vitamin E which degrades instantly on donating an electron, Amla's unique tannins form a stable cascading loop, providing continuous defense against oxidative skin stress.",
      recipe: "Mix 1 tsp of Amlora Powder into morning fruit smoothies or yogurt bowls.",
      metric: "Dermal collagen degradation reduction during UV exposure",
      value: "68% Photo-Protection",
      doshaImpact: "Purifies the Rasa Dhatu (plasma/fluid pathways) for natural radiance."
    }
  ];

  const currentPlan = symptomsList.find(s => s.id === selectedSymptom) || symptomsList[0];

  const molecularCompounds = [
    {
      name: "Organic L-Ascorbing Acid",
      stat: "28x More than Oranges",
      desc: "L-ascorbate molecule remains highly heat-stable inside Amla because of surrounding gallotannins which act as a natural preserving cloak."
    },
    {
      name: "Emblicanin-A & B",
      stat: "ORAC Value > 12,020",
      desc: "Proprietary cascading tannins that capture free electrons on loop, continuing to neutralize cell damage through several subsequent breakdown stages."
    },
    {
      name: "Organic Chromium Minerals",
      stat: "Bioavailable Trace Level",
      desc: "Assists cell insulin receptors in managing healthy post-meal glucose intake spikes, preventing sudden sluggishness and brain fog."
    },
    {
      name: "Natural Soluble Pectins",
      stat: "High Dietary Density",
      desc: "Ayurvedic viscous plant fibers that swell inside stomach tracts to regulate smooth, predictable bowel transit times."
    }
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#0F3D2E] pt-24 font-sans select-none">
      
      {/* Educational Banner */}
      <section className="bg-gradient-to-b from-[#0F3D2E] to-[#124937] text-white py-24 border-b border-[#D4AF37]/20 select-text">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] text-[#D4AF37] uppercase border border-[#D4AF37]/35 py-1.5 px-4 bg-black/15">
            🧑🏼‍⚕️ The Sourcing & Satiety Journal
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-tight">
            The Molecular Sourcing Of <br />
            <span className="italic text-[#D4AF37]">India's Original Superfruit</span>
          </h1>
          <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
          <p className="text-sm md:text-base text-cream/80 max-w-2xl mx-auto leading-relaxed font-light">
            Behind the 5,000-year history of Ayurvedic praise lies stable organo-metadata. Amla is the premier organic adaptogen, featuring distinct molecular preservation parameters that remain active even through sunshade drying.
          </p>
        </div>
      </section>

      {/* Sourcing Science: Molecular Compound Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-[#0F3D2E]/5 border border-emerald-500/10 px-3 py-1 inline-block">
            ACTIVE CHEMICAL PROFILE
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-[#0F3D2E]">
            Amla's Four Key Sovereign Molecules
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed font-light font-sans max-w-md mx-auto">
            Traditional health is not an accident. It is fueled by clean, bio-available chemicals stored inside Pratapgarh Amla.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {molecularCompounds.map((comp, idx) => (
            <div key={idx} className="border border-[#0F3D2E]/10 bg-white p-6 shadow-sm hover:border-[#D4AF37]/30 transition-all text-left flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#D4AF37] font-bold block">
                  COMPOUND 0{idx + 1}
                </span>
                <h3 className="text-lg font-serif text-[#0F3D2E] leading-tight font-bold">
                  {comp.name}
                </h3>
                <p className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 border border-emerald-500/10 px-2.5 py-1.5 inline-block">
                  {comp.stat}
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed font-light font-sans pt-1">
                  {comp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diagnostic Symptom Harmonizer Section */}
      <section className="bg-white py-20 border-y border-[#0F3D2E]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch select-text">
          
          {/* Diagnostic select column */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] bg-[#0F3D2E] px-3.5 py-1.5 inline-block">
                🌿 SELF-CARE INTERACTIVE ASSIST
              </span>
              <h2 className="text-2xl md:text-3.5xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
                Ayurvedic Symptom <br />
                <span className="italic text-[#A2811A]">Harmonizer Tool</span>
              </h2>
              <div className="h-[1px] w-12 bg-[#D4AF37] mt-3" />
            </div>

            <p className="text-xs text-gray-500 leading-relaxed font-light">
              Select one of the modern physical imbalances listed below to understand how raw Amla's chem-active matrix directly works to cool the systemic fires and restore your elemental doshic equilibrium.
            </p>

            <div className="flex flex-col gap-3.5 pt-4">
              {symptomsList.map((sym) => (
                <button
                  key={sym.id}
                  onClick={() => setSelectedSymptom(sym.id)}
                  className={`w-full py-4 px-4 text-left border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedSymptom === sym.id
                      ? "bg-[#0F3D2E] border-[#D4AF37] text-[#D4AF37]"
                      : "bg-[#FAF9F5] border-gray-200 hover:border-gray-300 text-[#0F3D2E]"
                  }`}
                >
                  {sym.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results/Harmonization blueprint column */}
          <div className="lg:col-span-8 bg-[#FAF9F5] border-y-2 border-x border-[#D4AF37] shadow-xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between text-left">
            {/* Concentric grid lines background overlay representing scientific structural validation */}
            <div className="absolute right-0 top-0 w-36 h-36 border-b border-l border-[#0F3D2E]/5 pointer-events-none" />

            <div className="space-y-6">
              
              {/* Outcome Badge and Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0F3D2E]/10 pb-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">
                    Ayurvedic Classification: <strong className="text-emerald-800 font-bold">{currentPlan.sanskritName}</strong>
                  </span>
                  <h3 className="text-2xl font-serif text-[#0F3D2E] font-medium leading-none mt-1">
                    {currentPlan.name}
                  </h3>
                </div>
                
                {/* Visual metric representation */}
                <div className="bg-[#0F3D2E] p-3 text-right border border-[#D4AF37]/20 flex flex-col justify-center min-w-[130px]">
                  <span className="text-[8px] font-mono text-[#D4AF37] uppercase tracking-widest leading-none block">
                    {currentPlan.metric}
                  </span>
                  <p className="text-lg font-mono font-black text-white leading-none mt-1">
                    {currentPlan.value}
                  </p>
                </div>
              </div>

              {/* Molecular active details */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#A2811A] font-bold">Primary Chemical Active Agent</span>
                <p className="text-xs font-serif font-black text-[#0F3D2E]">
                  {currentPlan.chemicalActive}
                </p>
              </div>

              {/* Detailed mechanism */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[#A2811A] font-bold">Biochemical Mechanism</span>
                <p className="text-xs text-gray-600 leading-relaxed font-light">
                  {currentPlan.mechanism}
                </p>
              </div>

              {/* recommended custom recipe */}
              <div className="bg-emerald-50 border border-emerald-500/10 p-5 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-emerald-800 font-bold">Recommended Sourcing Dosage</span>
                <p className="text-[11px] text-emerald-950 font-sans tracking-wide leading-relaxed font-semibold">
                  {currentPlan.recipe}
                </p>
              </div>

            </div>

            {/* Bottom dosha summary */}
            <div className="mt-8 pt-4 border-t border-[#0F3D2E]/10 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>Bio-Energy Alignment Balance:</span>
              <span className="font-bold text-[#0F3D2E] uppercase">{currentPlan.doshaImpact}</span>
            </div>

          </div>

        </div>
      </section>

      {/* Sourcing Science Certifications Grid (FSSAI compliance) */}
      <section className="py-20 bg-cream/40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left bg-white border border-[#0F3D2E]/10 p-8 md:p-10 shadow-sm relative overflow-hidden">
          
          <div className="space-y-2">
            <div className="p-2.5 bg-emerald-50 border border-emerald-500/15 w-fit">
              <Shield className="w-5 h-5 text-emerald-800" />
            </div>
            <h4 className="text-sm font-serif font-bold text-[#0F3D2E] uppercase">FSSAI License Certified</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Registered under the absolute highest criteria of modern commercial food safety parameters with License Standard No: <strong>30260226123537844</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-amber-50 border border-amber-500/15 w-fit">
              <Award className="w-5 h-5 text-amber-700" />
            </div>
            <h4 className="text-sm font-serif font-bold text-[#0F3D2E] uppercase">Pure GMP standard Processing</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              Hygienically sorted and processed in sterile modern cleanrooms with strict low-temperature filtration variables to defend active enzymes.
            </p>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-purple-50 border border-purple-500/15 w-fit">
              <GraduationCap className="w-5 h-5 text-purple-700" />
            </div>
            <h4 className="text-sm font-serif font-bold text-[#0F3D2E] uppercase">Verified Sourcing Quality assurance</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-light">
              We certify that all orchards are completely free from dynamic pesticide remnants, using only mature tree-ripened single-origin wild types.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
