/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import WhyAmla from "./components/WhyAmla";
import AmlaStory from "./components/AmlaStory";
import WhyAmlora from "./components/WhyAmlora";
import DedicatedToAmla from "./components/DedicatedToAmla";
import ProductCard from "./components/ProductCard";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import FloatingLeaves from "./components/FloatingLeaves";
import { PRODUCTS } from "./data/products";

// New Pages
import AboutPage from "./components/AboutPage";
import BenefitsPage from "./components/BenefitsPage";
import BlogPage from "./components/BlogPage";
import LoyaltyProgram from "./components/LoyaltyProgram";

export default function App() {
  const [activeTab, setActiveTabState] = useState<string>("home");

  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#FAF9F5] text-[#0F3D2E] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-[#0F3D2E] font-sans">
        {/* Organic floating botanical leaves in background */}
        <FloatingLeaves />

        {/* Header navigation bar */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Main Workspace Rendering */}
        <main className="flex-grow">
          {activeTab === "home" && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              {/* 1. HERO SECTION */}
              <Hero setActiveTab={setActiveTab} />

              {/* 2. TRUST BAR */}
              <TrustBar />

              {/* 3. WHY AMLA */}
              <WhyAmla />

              {/* 4. BESTSELLER PRODUCTS SHOWCASE */}
              <section id="our-products" className="py-24 bg-white border-b border-[#0F3D2E]/10 scroll-mt-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div className="space-y-4 max-w-2xl">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#0F3D2E] border border-[#0F3D2E]/25 bg-[#FAF9F5] px-3.5 py-1.5 inline-block">
                        ✦ Bestseller Products
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
                        Our Signature <br />
                        <span className="italic text-[#A2811A]">Sourcing Catalog</span>
                      </h2>
                      <div className="h-[2px] w-16 bg-[#D4AF37]" />
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light font-sans max-w-sm">
                      Discover our three government-licensed, farm-fresh developments. Hand-deseeded, hygienically managed, and packed strictly within audited net weight parameters in Pratapgarh, UP.
                    </p>
                  </div>

                  {/* Products grid showing all 3 premium products */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PRODUCTS.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                </div>
              </section>

              {/* 5. THE AMLORA DIFFERENCE */}
              <WhyAmlora />

              {/* 6. THE STORY OF AMLA */}
              <AmlaStory />

              {/* 7. DEDICATED TO AMLA */}
              <DedicatedToAmla />

              {/* 8. CUSTOMER REVIEWS */}
              <Testimonials />
            </div>
          )}

          {activeTab === "shop" && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              {/* Product Sourcing Hub Hero */}
              <section className="bg-[#0F3D2E] text-[#FAF9F5] py-20 text-center relative overflow-hidden select-none">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="max-w-4xl mx-auto px-6 space-y-4 relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">✦ Artisanal Marketplace</span>
                  <h1 className="text-4xl md:text-5xl font-serif font-medium">The Signature Range</h1>
                  <div className="h-[2px] w-20 bg-[#D4AF37] mx-auto" />
                  <p className="text-xs md:text-sm text-cream/70 max-w-md mx-auto font-light leading-relaxed">
                    Choose from our flagship pure d-seeded powder, spiced chatpata candies, or juicy chewable fruity cubes. Sourced genuine, packed premium.
                  </p>
                </div>
              </section>

              {/* Main Sourcing Product Grid */}
              <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {PRODUCTS.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </section>

              {/* Embedded Loyalty Rewards for immediate shop incentive */}
              <LoyaltyProgram />
            </div>
          )}

          {activeTab === "about" && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <AboutPage />
            </div>
          )}

          {activeTab === "benefits" && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <BenefitsPage />
            </div>
          )}

          {activeTab === "blog" && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <BlogPage />
            </div>
          )}

          {activeTab === "contact" && (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <div className="py-12 bg-[#0F3D2E] text-center select-none relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px)] bg-[size:40px_40px]" />
                <h1 className="text-3xl md:text-4xl font-serif text-white relative z-10 font-bold">Connect With Our Sourcing Office</h1>
                <p className="text-[11px] text-[#FAF9F5]/75 uppercase tracking-widest mt-2 relative z-10">Pratapgarh, Uttar Pradesh, India</p>
              </div>
              <Contact />
              {/* Rewards incentive footer */}
              <div className="py-12 bg-white">
                <blockquote className="max-w-2xl mx-auto px-6 text-center text-xs md:text-sm italic text-gray-500 leading-relaxed font-light">
                  "For bulk sourcing inquiries, retail outlet partnerships, or deseeded technological licensing requests, please write to us. Our dispatch registers are reviewed daily by our lead founders."
                </blockquote>
              </div>
            </div>
          )}
        </main>

        {/* Global luxury footer */}
        <Footer setActiveTab={setActiveTab} />

        {/* Sticky Sliding Right-hand Shopping Cart Drawer */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
