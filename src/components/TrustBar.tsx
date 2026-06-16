/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    { text: "Made with Real Amla", desc: "100% genuine farm fruit" },
    { text: "Rich in Vitamin C", desc: "Natural therapeutic levels" },
    { text: "Premium Quality", desc: "Double-checked for purity" },
    { text: "FSSAI Certified", desc: "Lic: 30260226123537844" },
    { text: "Made in India", desc: "Vocal for local heritage" }
  ];

  const ecommerceSites = [
    { name: "Amazon", logoText: "Amazon India" },
    { name: "Flipkart", logoText: "Flipkart" },
    { name: "Blinkit", logoText: "Blinkit" },
    { name: "BigBasket", logoText: "BigBasket" },
    { name: "Zepto", logoText: "Zepto" }
  ];

  return (
    <div id="trust-bar" className="w-full bg-[#FAF9F5] border-y border-[#0F3D2E]/10 py-6 px-6 md:px-12 relative overflow-hidden">
      {/* Background organic mesh */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0F3D2E_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Core Trust Factors */}
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-6 md:gap-4 pb-5 border-b border-[#0F3D2E]/5">
          {trustItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-3 text-left transition-all hover:translate-y-[-1px] group border-b md:border-b-0 pb-3 md:pb-0 w-full md:w-auto last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F3D2E] group-hover:border-[#D4AF37] transition-all">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700 group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <div>
                <p className="text-xs font-serif font-bold text-[#0F3D2E] uppercase tracking-wider leading-none">
                  {item.text}
                </p>
                <p className="text-[9px] text-[#0F3D2E]/60 uppercase tracking-widest mt-1 font-sans">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Top E-commerce Availability Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShoppingBag className="w-4 h-4 text-[#A2811A]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0F3D2E]/70 uppercase">
              Also Available On Top E-commerce Platforms:
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            {ecommerceSites.map((site, sIdx) => (
              <span 
                key={sIdx}
                className="text-[10px] sm:text-xs font-serif font-extrabold italic tracking-wider text-[#0F3D2E]/40 hover:text-[#A2811A]/80 transition-all duration-300 border border-[#0F3D2E]/10 px-3.5 py-1.5 bg-white/70 shadow-2xs hover:shadow-sm"
              >
                {site.name} <span className="text-[7px] not-italic font-sans font-normal text-gray-400 align-super ml-0.5">✔</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
