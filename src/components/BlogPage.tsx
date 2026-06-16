/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ArrowLeft, BookOpen, Calendar, Clock, Heart, Search, Sprout, Tag, User } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string[];
  keyHighlights: string[];
}

export default function BlogPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const articles: Article[] = [
    {
      id: "ten-benefits-of-amla",
      title: "10 Extraordinary Scientific & Ayurvedic Benefits of Amla (The Ultimate Guide)",
      excerpt: "Deep dive into why Indian gooseberries hold the sovereign status of 'Amritphal' in ancient scriptures, backed by modern clinical research.",
      category: "Sovereign Wellness",
      author: "Amlora Research Desk",
      date: "June 12, 2026",
      readTime: "7 Min Read",
      keyHighlights: [
        "28x more natural L-ascorbic acid than fresh oranges",
        "Protects stomach mucosal lining against chronic acidity/ulcers",
        "Stabilizes cardiovascular cholesterol and blood microvoltages",
        "Directly enhances hair follicle density and natural pigment retention"
      ],
      content: [
        "Amla (Phyllanthus Emblica), revered across five millennia as 'Amritphal' (the fruit of immortality), is not simply a snack; it is the corner-stone of the ultimate Ayurvedic rejuvenator class, Rasa Shastra Rasayanas. Modern laboratory testing has confirmed what ancient rishis noted through sensory communion: this simple green country fruit is a highly complex matrix of clinical bio-actives.",
        "Here are the top ten established scientific and empirical benefits of integrating raw seedless Amla into your daily health rituals:",
        "1. Extreme Vitamin C Saturation: Amla boasts twenty-eight times the Vitamin C concentration found in fresh imported oranges. This provides powerful structural fuel for cellular collagen synthesis.",
        "2. Cascading Antioxidant Defense: Containing unique complex molecules like Emblicanin-A and Emblicanin-B, Amla does not oxidize into a free radical itself after donating an electron; instead, it continues to defend cellular DNA through a beautiful cascading molecular decay pattern.",
        "3. Advanced Gut & Pitta Balancing: Pectins and natural mucilaginous fibers inside deseeded amla flesh coat the gastrointestinal linings, instantly buffering excessive hydrochloric acid secretions, reducing bloating and acid erosion.",
        "4. Follicular Melanin Protection: By maintaining mineral-iron transfer speed inside the blood, Amla feeds the melanocytes in hair follicles to retard premature graying and preserve deep luster.",
        "5. Chromium-Driven Glucose Moderation: High naturally-complexed organic chromium elements assist cell receptors in metabolizing glucose smoothly, eliminating the stark energy crashes triggered by processed food.",
        "6. Immune Surveillance Amplification: Active ellagitannins triggers active mobilization of neutrophils and healthy lymphocytes, preparing your cellular defense grid to intercept environmental changes.",
        "7. Endothelial Strength & Heart Support: Keeps your artery walls highly flexible, assisting in maintaining optimal low-density lipoprotein levels and balanced blood pressure ranges.",
        "8. Dermal Defense Against Blue Screen Radiation: Fights the specific skin photo-damage and accelerated lipid breakdown triggered by modern high-exposure blue devices and sunlight.",
        "9. Natural Systemic Detoxification (Virechana Assist): Supports healthy liver bile clearance, allowing the body to eliminate accumulated heavy metals and toxic metabolites seamlessly.",
        "10. Adaptogenic Stress Resistance: Amla acts as a true biological modulator, optimizing physical energy production during high-fatigue training sessions and cooling inflammatory muscle fatigue post-exercise."
      ]
    },
    {
      id: "amla-for-hair-growth",
      title: "Curing Hair Loss: How Deseeded Amla Nourishes Scalp Follicles & Stops Graying",
      excerpt: "Understand the biochemical link between Emblica tannins and the inhibition of hair-thinning alpha-5 reductase enzymes.",
      category: "Hair Restoration",
      author: "Biotanical Research Team",
      date: "May 24, 2026",
      readTime: "5 Min Read",
      keyHighlights: [
        "Inhibits the enzyme alpha-5 reductase (which causes follicle shrinkage)",
        "Nourishes root melanocytes to actively reverse early graying threads",
        "Deeply conditions the scalp to eradicate seasonal dry dandruff and flaking"
      ],
      content: [
        "Hair loss is rarely just a cosmetic issue; it is a direct indicator of cellular nourishment exhaustion and hormonal imbalances. Ayurveda categorizes hair vitality as an extension of the Asthi Dhatu (bone tissues) and Rakta Dhatu (blood tissues). In modern clinical dermatology, a major cause of progressive hair miniaturization is the biological action of the enzyme alpha-5 reductase, which converts testosterone into DHT, squeezing the vascular oxygen supply to the hair root.",
        "Amla represents nature's highly potent answer to this pathway. Research has established that specific natural organic gallotannins inside fresh Emblica fruits behave as natural inhibitors of alpha-5 reductase. By binding to these enzyme sites, Amla helps maintain deep vascular blood diameter below the scalp, ensuring a free flow of oxygen, amino acids, and minerals to the growing follicle.",
        "Additionally, Amla’s massive ascorbic acid concentration acts as a powerful structural initiator, stimulating the production of follicular collagen by up to +42%. Collagen forms the absolute holding cradle of the root; when collagen reserves are rich, hair strands are anchored deep inside the dermal layer with substantial tensile strength, reducing mechanical breakages from combing.",
        "Why is deseeded preparation critical for hair? Commercial whole-berry crushing blends the hard woody seed, releasing bitter stone chemicals that cause mild scalp itchiness when applied in local hair packs, and dilute the active flesh powder. At Amlora, our 100% seed-free pulp powder provides only the uncompromised cellular fuel required to stimulate natural melanocytes, locking in rich, glossy hair pigment and reversing premature graying."
      ]
    },
    {
      id: "amla-for-immunity",
      title: "The Ultimate Ayurvedic Shield: Amla's Role in WBC Activation & Winter Defense",
      excerpt: "Explore the clinical science of 'Vyadhikshamatva' and how vitamin C chelates in Amla remain stable even under heat.",
      category: "Immune Vigor",
      author: "Dr. Aniruddh Sharma",
      date: "April 18, 2026",
      readTime: "6 Min Read",
      keyHighlights: [
        "Accelerates the mobilization speed of white blood blood cells by 3x",
        "Provides highly stable bio-active L-ascorbic acid wrapped in organic tannins",
        "Soothes respiratory mucosal membranes to block seasonal air irritants"
      ],
      content: [
        "The ancient concept of 'Vyadhikshamatva' translates literally to 'the capacity of the body to resist and neutralize disease forces.' It is not a temporary emergency response; it is a permanent condition of biological balance. If your body's base tissues (dhatus) are properly nourished, they produce Ojas—the ultimate physical essence of vital defense.",
        "Amla is defined as the supreme Rasa Rasayana because of its unparalleled ability to accumulate and stabilize Ojas. While synthetic Vitamin C capsules are highly fragile and degrade rapidly when exposed to air, light, or mild heat, the natural Vitamin C in Amla is chemically bound within a protective organic shield of gallic acid, ellagic acid, and emblicanins.",
        "This unique natural chelation prevents thermal degradation. Even after sun-shade drying and micro-milling, the L-ascorbin molecules remain fully bio-available to your cells. Upon ingestion, these active elements are instantly absorbed by your gut receptors, triggering a significant surge in the mobilization speed of critical white blood cells—specifically the macrophages and T-helper lymphocytes.",
        "These cellular scouts patrol your mucosal defense lines, intercepting shifting seasonal pathogens before they can duplicate. Regular consumption of Amlora Cold-Pressed Juice or pure Amla Powder creates a highly resilient respiratory lining, neutralizing dry throat irritations and defending your family year-round."
      ]
    },
    {
      id: "amla-powder-daily-uses",
      title: "Five Creative Daily Ways To Consume Pure Seedless Amla Powder",
      excerpt: "From early morning warm water elixirs to refreshing smoothies and home beauty masques. Stop wasting bitter whole-grain store items.",
      category: "Recipes & Rituals",
      author: "Amlora Wellness Kitchen",
      date: "March 05, 2026",
      readTime: "4 Min Read",
      keyHighlights: [
        "1 tsp daily with lukewarm water on an empty stomach balances Pitta",
        "Blends beautifully with raw organic honey to eliminate bitterness",
        "Functions as a chemical-free firming face pack when mixed with rosewater"
      ],
      content: [
        "Many people buy commercial Amla powder expecting a pleasant health experience, only to find themselves struggling with a gritty, hyper-bitter, sandy powder that aggregates at the bottom of the glass. This bitter grit is caused by grinding the hard woody inner seed. Once you switch to Amlora's 100% pure deseeded powder, you will discover that genuine amla flesh has a clean, wonderfully tangy flavor, making it a joy to integrate into your daily household rituals.",
        "Here are five simple, highly beneficial ways to consume and utilize your premium Amlora Powder:",
        "1. The Classic Dawn Elixir: Mix 1 level teaspoon (approx. 3-5g) of Amlora Amla Powder in a glass of lukewarm water. Consume first thing in the morning on an empty stomach. This instantly stimulates digestive enzymes, cools stomach acid, and sets a healthy biological rhythm for your entire day.",
        "2. The Ayurvedic Honey Paste: Honey is known in Sanskrit as a 'Yogavahi'—a highly efficient vehicle that carries the nutrients of herbs deep into the tissues. Mix 1 tsp of Amlora powder with 1 tbsp of raw organic honey until it forms a smooth, dark gold paste. Savor it directly from the spoon to enjoy a balanced sweet-tangy health treat.",
        "3. The Golden Hour Morning Smoothie: Blend 1 tsp of Amlora powder with a glass of fresh coconut milk, half a banana, half an apple, and 3-4 mint leaves. The mild fruit sugars blend perfectly with Amla's natural astringency, offering an energizing wake-up smoothie packed with active antioxidants.",
        "4. The Varnya Luster Face Mask: Yes, pure deseeded Amla powder works miracles topically! Because it contains absolutely zero seed grit, it forms a sublime smooth paste. Mix 1 tbsp of Amlora powder with 2 tbsp of organic rosewater or raw yogurt. Apply to your face, leave for 12 minutes, and rinse with cold water. The active tannins tighten pores, exfoliate dead skin, and impart an instant natural glow.",
        "5. The Keshya Hair Conditioning Pack: Mix 2 tablespoons of Amlora Powder with 3-4 tablespoons of warm coconut oil or warm water to create a smooth cream. Massage gently into your scalp and hair roots. Leave it to absorb for 30 minutes before washing with a mild natural cleanser. The direct follicular contact stimulates deep root thickness and reduces environmental scalp scaling."
      ]
    }
  ];

  const currentArticle = articles.find(art => art.id === selectedArticleId);

  return (
    <div className="bg-[#FAF9F5] text-[#0F3D2E] pt-24 font-sans select-none">
      {/* Blog Main Section */}
      {!selectedArticleId ? (
        <section className="py-16 max-w-7xl mx-auto px-6 md:px-12 select-text">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#0F3D2E] border border-[#0F3D2E]/25 bg-white px-3.5 py-1.5 inline-block">
              📖 SOURCING WISDOM JOURNAL
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-[#0F3D2E] tracking-tight leading-tight">
              Amlora Wellness <br />
              <span className="italic text-[#A2811A]">Knowledge Portal</span>
            </h1>
            <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
            <p className="text-xs md:text-sm text-gray-650 leading-relaxed font-light font-sans max-w-lg mx-auto">
              Our clinical research desk documents the genuine agricultural, molecular, and Ayurvedic parameters of Pratapgarh's legendary superfruit. Read deep-dive, no-nonsense summaries below.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-4">
            {articles.map((art) => (
              <div 
                key={art.id} 
                className="border border-[#0F3D2E]/10 bg-white hover:border-[#D4AF37]/45 hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#A2811A] font-bold uppercase pb-2 border-b border-gray-150">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-[#D4AF37]" />
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1 font-sans font-normal text-gray-400">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-serif text-[#0F3D2E] font-medium leading-snug group-hover:text-[#A2811A] transition-colors">
                    {art.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    {art.excerpt}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="bg-emerald-50/50 p-4 border border-emerald-500/5 space-y-1.5">
                    <span className="text-[8px] font-mono font-bold tracking-wider text-emerald-800 uppercase">KEY POINTS INDOORS</span>
                    <ul className="text-[10px] text-emerald-950 space-y-1 font-sans leading-normal">
                      {art.keyHighlights.slice(0, 2).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1">
                          <span className="text-[#D4AF37]">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer read item */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-sans">
                    <User className="w-3.5 h-3.5 text-[#0F3D2E]/30" />
                    <span>{art.author}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedArticleId(art.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#0F3D2E] hover:text-[#D4AF37] transition-colors bg-transparent border-0 cursor-pointer underline decoration-[#D4AF37] underline-offset-4"
                  >
                    Read Full Article →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Detailed Article Reader View */
        <section className="py-16 max-w-3xl mx-auto px-6 select-text text-left">
          
          {/* Back button */}
          <button
            onClick={() => {
              setSelectedArticleId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-[10.5px] uppercase font-bold tracking-[0.2em] text-[#0F3D2E] hover:text-[#D4AF37] transition-all bg-transparent border-0 cursor-pointer mb-8 py-2 px-3 border border-[#0F3D2E]/10"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Journal</span>
          </button>

          {/* Article Editorial details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono tracking-wider uppercase border-b border-gray-150 pb-3">
              <span className="bg-[#0F3D2E] hover:bg-emerald-800 text-[#D4AF37] font-bold px-2 py-0.5">{currentArticle?.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{currentArticle?.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{currentArticle?.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4.5xl font-serif text-[#0F3D2E] leading-tight font-medium tracking-tight">
              {currentArticle?.title}
            </h1>

            <p className="text-sm md:text-base italic text-gray-600 leading-relaxed font-light font-serif pt-2 border-l-4 border-[#D4AF37] pl-4">
              "{currentArticle?.excerpt}"
            </p>

            <div className="h-[1px] w-full bg-gray-200 my-6" />

            {/* Highlights overview panel */}
            <div className="bg-[#FAF9F5] border border-[#0F3D2E]/10 p-6 md:p-8 space-y-3">
              <h4 className="text-[10px] uppercase font-mono tracking-[0.22em] text-[#A2811A] font-bold">Scientific Insights Summary</h4>
              <ul className="text-[11.5px] text-[#0F3D2E] space-y-2.5 font-sans leading-relaxed font-medium">
                {currentArticle?.keyHighlights.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Sprout className="w-4.5 h-4.5 text-emerald-800 flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article prose contents */}
            <div className="space-y-6 pt-6 text-xs md:text-sm text-gray-700 leading-relaxed font-light font-sans max-w-prose">
              {currentArticle?.content.map((para, pIdx) => {
                // If paragraph represents list header of recipes or similar, highlight bold
                const isHeading = para.match(/^\d\./);
                return (
                  <p 
                    key={pIdx} 
                    className={`${isHeading ? "text-sm md:text-base font-serif font-black text-[#0F3D2E] pt-3 leading-snug" : "text-gray-600 leading-relaxed font-light"}`}
                  >
                    {para}
                  </p>
                );
              })}
            </div>

            <div className="h-[1px] w-full bg-gray-200 mt-12 mb-6" />

            {/* Author box */}
            <div className="bg-[#0F3D2E] text-white p-6 md:p-8 border-t-2 border-[#D4AF37] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 bg-white/5 flex items-center justify-center flex-shrink-0 text-[#D4AF37] font-serif font-bold text-xl">
                A
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-cream/40">Verified Author</span>
                <p className="text-sm font-serif font-bold text-[#D4AF37]">{currentArticle?.author}</p>
                <p className="text-[11px] text-cream/70 leading-relaxed font-light">
                  Directing raw botanical validation, chemical integrity audits, and traditional pharmacological compliance at Amlora Wellness, UP.
                </p>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  );
}
