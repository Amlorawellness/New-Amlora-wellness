/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X, Shield, Phone, MapPin } from "lucide-react";
import AmloraLogo from "./AmloraLogo";

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Header({ activeTab = "home", setActiveTab }: HeaderProps) {
  const { setIsCartOpen, cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const announcements = [
    "🔥 EXCLUSIVE: Use code PUREHERITAGE for 15% off today!",
    "📦 FREE EXPEDITED DELIVERY PAN-INDIA FOR ORDERS ABOVE ₹500",
    "🍃 100% PURE SEEDLESS AMLA POWDER — ZERO SEED GRIT GUARANTEED",
    "🇮🇳 SOURCED DIRECTLY FROM THE AMLA CAPITAL: PRATAPGARH, UP"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", tabId: "home" },
    { label: "Shop", tabId: "shop" },
    { label: "About Amlora", tabId: "about" },
    { label: "Benefits of Amla", tabId: "benefits" },
    { label: "Blog", tabId: "blog" },
    { label: "Contact", tabId: "contact" }
  ];

  const handleTabClick = (tabId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full fixed top-0 z-40 font-sans transition-all duration-300">
      {/* Announcement bar - Geometric styling */}
      <div className="w-full bg-[#0F3D2E] text-cream border-b border-[#D4AF37]/20 py-2 px-4 text-center overflow-hidden h-[34px] flex items-center justify-center">
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#F4E8C1] transition-all duration-500 transform">
          {announcements[announcementIndex]}
        </p>
      </div>

      {/* Main Navbar - Geometric grid aligned */}
      <nav
        className={`w-full py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#0F3D2E]/95 backdrop-blur-md shadow-2xl border-[#D4AF37]/30 py-3"
            : "bg-[#0F3D2E]/80 backdrop-blur-xs border-[#D4AF37]/10"
        }`}
      >
        {/* Toggle mobile menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 border border-[#D4AF37]/20 text-cream transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo and Branding - showing only our real elegant logo pic */}
        <button 
          onClick={() => handleTabClick("home")} 
          className="flex items-center gap-2 hover:opacity-90 transition-opacity bg-transparent border-0 cursor-pointer"
        >
          <AmloraLogo
            height={isScrolled ? 38 : 50}
            lightMode={true}
            className="transition-all duration-300"
          />
        </button>

        {/* Desktop Menu - elegant grid lines */}
        <div className="hidden md:flex items-center gap-5 xl:gap-7">
          {menuItems.map((item) => {
            const isActive = activeTab === item.tabId;
            return (
              <button
                key={item.tabId}
                onClick={() => handleTabClick(item.tabId)}
                className={`text-[11.5px] uppercase tracking-[0.16em] font-bold transition-all relative group py-1.5 bg-transparent border-0 cursor-pointer ${
                  isActive ? "text-[#D4AF37]" : "text-[#F5F5F0]/85 hover:text-[#D4AF37]"
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            );
          })}
        </div>

        {/* Action button: Cart Icon and Secure FSSAI Seal */}
        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden lg:flex items-center gap-1.5 bg-black/20 px-3 py-1 border border-[#D4AF37]/20 text-[9px] uppercase tracking-[0.2em] font-bold text-[#F4E8C1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block" />
            <span>FSSAI Certified</span>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F3D2E] text-[11px] uppercase tracking-[0.15em] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md bg-transparent"
            aria-label="View shopping bag"
          >
            <ShoppingCart className="w-4 h-4 text-[#D4AF37] group-hover:text-[#0F3D2E] transition-colors" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="bg-[#D4AF37] text-[#0F3D2E] text-[9px] font-black px-1.5 py-0.5 border border-[#0F3D2E]/20 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[82px] left-0 w-full bg-[#0F3D2E] shadow-2xl border-b border-[#D4AF37]/35 flex flex-col p-6 space-y-4 md:hidden text-left z-50">
          {menuItems.map((item) => {
            const isActive = activeTab === item.tabId;
            return (
              <button
                key={item.tabId}
                onClick={() => handleTabClick(item.tabId)}
                className={`text-[11px] uppercase tracking-[0.15em] font-bold text-left pb-2.5 border-b border-[#D4AF37]/10 bg-transparent cursor-pointer ${
                  isActive ? "text-[#D4AF37]" : "text-[#F5F5F0] hover:text-[#D4AF37]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 flex items-center justify-between text-[10px] text-cream/50 uppercase tracking-widest">
            <span className="flex items-center gap-1 text-[#D4AF37]">🛡️ Lic: 30260226123537844</span>
            <span>Amlora Wellness</span>
          </div>
        </div>
      )}
    </header>
  );
}
