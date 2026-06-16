/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { FAQS } from "../data/products";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>("q2"); // Default open "What makes Amlora different?"
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "About Amla", "Our Brand", "Ingredients & Sourcing", "Usage Guide"];

  const filteredFaqs = activeCategory === "All"
    ? FAQS
    : FAQS.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-[#F5F5F0] font-sans border-b border-[#0F3D2E]/15 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] bg-[#0F3D2E] px-4 py-2 border border-[#D4AF37]/30 inline-block">
            Intelligent Consumer Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
            Frequently Answered Queries
          </h2>
          <div className="h-[1px] w-24 bg-[#D4AF37] mx-auto" />
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light max-w-xl mx-auto">
            Got questions about mineral values, dietary routines, or our proprietary Pratapgarh deseeded standards? Explore our comprehensive answers below.
          </p>
        </div>

        {/* Category filters - Unrounded Geometric */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenId(null);
              }}
              className={`px-4 py-2.5 rounded-none text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0F3D2E] border border-[#D4AF37] text-white shadow-md"
                  : "bg-white border border-[#0F3D2E]/10 text-[#0F3D2E]/70 hover:text-[#0F3D2E] hover:border-[#D4AF37]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-none border border-[#0F3D2E]/10 overflow-hidden shadow-sm hover:border-[#D4AF37]/45 transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <div className="flex gap-3 items-center pr-4">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="font-serif text-sm font-bold text-[#0F3D2E] tracking-wide leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#0F3D2E] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#0F3D2E] flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-left text-xs md:text-sm text-gray-500 leading-relaxed font-light border-t border-[#0F3D2E]/5">
                    <div className="bg-[#FAF9F6] p-4 rounded-none border-l-4 border-[#D4AF37] text-[#0F3D2E]/85">
                      {faq.answer}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-[9px] bg-[#0F3D2E] text-[#D4AF37] border border-[#D4AF37]/25 font-mono uppercase tracking-widest px-3 py-1 rounded-none select-none">
                        Category: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic fallback */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No queries found under the '{activeCategory}' filter. Select another filter above.
          </div>
        )}
      </div>
    </section>
  );
}
