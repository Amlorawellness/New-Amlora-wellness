/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import AmloraLogo from "./AmloraLogo";
import { Phone, Mail, MapPin, Heart, Shield, Award, CheckCircle } from "lucide-react";

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tabId: string, anchorId?: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      if (anchorId) {
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#0F3D2E] text-[#FAF9F6] font-sans border-t-2 border-[#D4AF37] pt-16 pb-8 text-left relative overflow-hidden">
      {/* Decorative quadrant accents */}
      <div className="absolute right-0 bottom-0 w-48 h-48 border-t border-l border-[#D4AF37]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10">
        {/* Column 1: Core Brand Info */}
        <div className="md:col-span-4 space-y-4">
          <AmloraLogo height={36} lightMode={true} className="!items-start" />
          <p className="text-xs text-cream/70 leading-relaxed font-light mt-4">
            India's premium dedicated destination for Amla-focused wellness and deseeded preparation. Rooted in Ayurvedic wisdom and refined by deseeded sorting parameters.
          </p>

          <div className="pt-3 border-t border-white/5 space-y-1.5 text-[10px] text-cream/60">
            <p className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> FSSAI License: 30260226123537844
            </p>
            <p className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Pure GMP Standard Processing
            </p>
            <p className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Sourced from Pratapgarh Orchards, UP
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-serif text-[#D4AF37] text-xs font-bold uppercase tracking-[0.15em] border-b border-white/10 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-cream/75 font-light list-none p-0 m-0">
            <li>
              <button 
                onClick={() => handleLinkClick("home")} 
                className="hover:text-[#D4AF37] transition-colors font-sans uppercase tracking-wider text-[9px] font-bold bg-transparent border-0 cursor-pointer p-0 text-left"
              >
                Home Page
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("benefits")} 
                className="hover:text-[#D4AF37] transition-colors font-sans uppercase tracking-wider text-[9px] font-bold bg-transparent border-0 cursor-pointer p-0 text-left"
              >
                Why Amla
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("about")} 
                className="hover:text-[#D4AF37] transition-colors font-sans uppercase tracking-wider text-[9px] font-bold bg-transparent border-0 cursor-pointer p-0 text-left"
              >
                The Amla Story
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("home", "why-amlora")} 
                className="hover:text-[#D4AF37] transition-colors font-sans uppercase tracking-wider text-[9px] font-bold bg-transparent border-0 cursor-pointer p-0 text-left"
              >
                Why Amlora
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("home", "faq")} 
                className="hover:text-[#D4AF37] transition-colors font-sans uppercase tracking-wider text-[9px] font-bold bg-transparent border-0 cursor-pointer p-0 text-left"
              >
                FAQ Support
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Products Grid */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif text-[#D4AF37] text-xs font-bold uppercase tracking-[0.15em] border-b border-white/10 pb-2">
            Our Products
          </h4>
          <ul className="space-y-2 text-xs text-cream/75 font-light list-none p-0 m-0">
            <li>
              <button 
                onClick={() => handleLinkClick("shop")} 
                className="hover:text-[#D4AF37] transition-colors flex justify-between font-sans text-[10px] bg-transparent border-0 cursor-pointer p-0 w-full text-left"
              >
                <span>🍃 Amlora Amla Powder</span> <span className="text-[10px] text-[#D4AF37] font-bold"><span className="line-through text-white/40 mr-1.5 font-normal">₹499</span>₹299</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("shop")} 
                className="hover:text-[#D4AF37] transition-colors flex justify-between font-sans text-[10px] bg-transparent border-0 cursor-pointer p-0 w-full text-left"
              >
                <span>🌶️ Chatpata Amla Candy</span> <span className="text-[10px] text-[#D4AF37] font-bold"><span className="line-through text-white/40 mr-1.5 font-normal">₹499</span>₹299</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("shop")} 
                className="hover:text-[#D4AF37] transition-colors flex justify-between font-sans text-[10px] bg-transparent border-0 cursor-pointer p-0 w-full text-left"
              >
                <span>🍬 Amla Fruity Cubes</span> <span className="text-[10px] text-[#D4AF37] font-bold"><span className="line-through text-white/40 mr-1.5 font-normal">₹499</span>₹299</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Sourcing Contact Coordinate Card */}
        <div className="md:col-span-3 space-y-4 text-xs font-light">
          <h4 className="font-serif text-[#D4AF37] text-xs font-bold uppercase tracking-[0.15em] border-b border-white/10 pb-2">
            Sourcing Hub
          </h4>
          <div className="space-y-3 pt-1 text-cream/80">
            <p className="flex items-start gap-2 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span>Pratapgarh District, Uttar Pradesh, 230403</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span className="font-mono text-[11px]">+91 9451657345</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span className="underline select-all text-[#D4AF37] font-mono text-[10px]">info@amlorawellness.com</span>
            </p>
          </div>
        </div>
      </div>

      {/* Compliance banner / Bottom Seals */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cream/50">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[9px] uppercase font-bold text-[#D4AF37] tracking-wider block">
            GOVERNMENT OF INDIA REGULATIONS SECURITY
          </span>
          <p className="leading-relaxed">
            Registered Trade Mark &copy; {currentYear} Amlora Wellness. All product formulations conform to FSSAI Lic: <strong>30260226123537844</strong>. India's Dedicated Premium Amla Destination.
          </p>
        </div>

        {/* Payment and trust seals */}
        <div className="flex flex-wrap gap-2 items-center justify-center opacity-45 hover:opacity-100 transition-opacity">
          <span className="border border-white/20 rounded-none px-3 py-1.5 text-[8px] font-sans font-bold uppercase tracking-widest text-[#FAF9F6]">UPI GPay</span>
          <span className="border border-white/20 rounded-none px-3 py-1.5 text-[8px] font-sans font-bold uppercase tracking-widest text-[#FAF9F6]">RuPay</span>
          <span className="border border-white/20 rounded-none px-3 py-1.5 text-[8px] font-sans font-bold uppercase tracking-widest text-[#FAF9F6]">Secured VISA</span>
        </div>
      </div>

      {/* Love sign */}
      <div className="text-center text-[9px] text-cream/30 mt-8 flex items-center justify-center gap-1 font-mono uppercase tracking-[0.1em]">
        With <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Indian Ayurveda
      </div>
    </footer>
  );
}
