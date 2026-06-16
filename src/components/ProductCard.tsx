/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart, RefreshCw, Eye, CheckCircle, Info, Star } from "lucide-react";
import AmloraLogo from "./AmloraLogo";

interface ProductCardProps {
  product: Product;
  key?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState<"front" | "nutrition" | "directions">("front");

  const renderPackagingMockup = () => {
    const imgSrc = product.id === "amla-powder" 
      ? "/src/assets/images/amla_powder_packaging_1781600016813.jpg"
      : product.id === "amla-candy"
        ? "/src/assets/images/amla_candy_packaging_1781599999918.jpg"
        : "/src/assets/images/amla_cubes_packaging_1781600033441.jpg";

    const showBack = activeTab === "nutrition" || activeTab === "directions";

    return (
      <div className="w-full aspect-[4/3] relative rounded-none border border-[#0F3D2E]/15 overflow-hidden group select-none bg-[#0F3D2E]/5 shadow-inner">
        {/* Shine glare sweep effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
        
        {/* Render Front (left 50%) or Back (right 50%) dynamically using translation animation */}
        <div 
          className="absolute inset-0 w-[200%] h-full transition-transform duration-500 ease-out flex"
          style={{
            transform: showBack ? "translateX(-50%)" : "translateX(0%)"
          }}
        >
          {/* Front part (Left 50%) */}
          <div className="w-1/2 h-full relative">
            <img
              src={imgSrc}
              alt={`${product.name} Front Packaging`}
              className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
              style={{
                objectPosition: "25% center"
              }}
            />
          </div>
          {/* Back part (Right 50%) */}
          <div className="w-1/2 h-full relative">
            <img
              src={imgSrc}
              alt={`${product.name} Back Labels`}
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              referrerPolicy="no-referrer"
              style={{
                objectPosition: "75% center"
              }}
            />
          </div>
        </div>

        {/* Dynamic authentic state badge */}
        <div className="absolute top-3 left-3 bg-[#0F3D2E]/95 text-[#D4AF37] border border-[#D4AF37]/35 text-[8px] font-mono tracking-widest font-black px-2.5 py-1 z-10 uppercase flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
          {showBack ? "Verified Label Back" : "Real Sourced Packaging"}
        </div>

        {/* Brand Emblem strictly enforcing Amlora Wellness Logo in the packaging mockup */}
        <div className="absolute top-3 right-3 bg-[#0F3D2E]/95 border border-[#D4AF37]/45 py-1.5 px-3 shadow-md z-10 flex items-center justify-center rounded-none backdrop-blur-md select-none transition-all hover:border-[#D4AF37]">
          <AmloraLogo height={9} />
        </div>
      </div>
    );
  };

  return (
    <div
      className="bg-white rounded-none border border-[#0F3D2E]/15 overflow-hidden shadow-sm hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col relative"
    >
      {/* Product Card Top Ribbon */}
      <div className={`px-4 py-2 ${product.colorTheme.banner} flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] border-b border-[#0F3D2E]/10`}>
        <span className="flex items-center gap-1 text-[#0F3D2E]">🛡️ SOURCING INTEGRITY</span>
        <span className="text-[#0F3D2E]">{product.purityBadge}</span>
      </div>

      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        {/* Visual Packaging Render - Always visible, flips to match tab state */}
        <div className="pb-4 cursor-pointer relative" onClick={() => setActiveTab(activeTab === "front" ? "nutrition" : "front")}>
          {renderPackagingMockup()}
          {/* Quick helper hover button */}
          <div className="absolute bottom-6 right-3 bg-[#0F3D2E]/95 border border-[#D4AF37]/35 text-[#D4AF37] px-2.5 py-1 text-[8px] uppercase tracking-widest font-black opacity-85 hover:opacity-100 flex items-center gap-1 shadow-md z-10 transition-all">
            <RefreshCw className="w-3 h-3 text-[#D4AF37] animate-pulse" /> 
            {activeTab === "front" ? "Flip for back label" : "Flip for beauty shot"}
          </div>
        </div>

        {/* Toggleable Inner Views */}
        {activeTab === "front" && (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {/* Titles & Description */}
            <div className="text-left space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0F3D2E] leading-tight tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-gray-450 font-bold uppercase tracking-[0.14em] mt-0.5">
                    {product.packagingType} • MRP <span className="line-through">₹{product.mrp}</span> <span className="text-[#0F3D2E] bg-yellow-400/20 px-1 py-0.2 mx-1 border border-yellow-400/30">₹{product.price} (40% OFF)</span>
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-[#0F3D2E]">{product.rating}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 font-light leading-relaxed min-h-[50px]">
                {product.description}
              </p>

              {/* Core seedless alert */}
              {product.type === "powder" && (
                <div className="bg-[#FAF9F6] border border-[#D4AF37]/40 rounded-none p-2.5 flex items-start gap-2 text-[10px] text-[#0F3D2E]">
                  <span className="font-serif font-bold text-[#D4AF37]">★ Flesh:</span>
                  <span className="font-light leading-tight">100% deseeded mature pulp. Zero seed grit or woody sediment.</span>
                </div>
              )}

              {product.id === "organic-amla-juice" && (
                <div className="bg-[#FAF9F6] border border-[#D4AF37]/40 rounded-none p-2.5 flex items-start gap-2 text-[10px] text-[#0F3D2E]">
                  <span className="font-serif font-bold text-[#D4AF37]">★ Extract:</span>
                  <span className="font-light leading-tight">Sub-20°C mechanical cold-pressed pulp. No heat treating or boiling.</span>
                </div>
              )}

              {/* Short features bullets */}
              <ul className="space-y-1 pt-1.5">
                {product.features.slice(0, 3).map((feat, index) => (
                  <li key={index} className="text-[10px] text-gray-600 flex items-center gap-1.5 font-light uppercase tracking-wide">
                    <span className="text-[#D4AF37] font-bold">✓</span> {feat}
                  </li>
                ))}
              </ul>

              {/* Premium Packaging Highlight */}
              <div className="bg-[#FAF9F6] border-l-2 border-[#D4AF37] p-2.5 flex flex-col gap-1 text-[10px] text-gray-700">
                <span className="font-serif font-bold text-[#0F3D2E] uppercase tracking-wider text-[9px] flex items-center gap-1">
                  📦 Premium Protective Packaging:
                </span>
                <span className="font-light leading-normal">
                  {product.id === "amla-powder" && "Multi-layer Moisture-Lock UV-Shield Resealable Zip-lock pouch. Vacuum packed to block air oxidation and maintain 100% active vitamin density."}
                  {product.id === "amla-candy" && "Airtight high-barrier PET container. Blocks solar UV rays and humidity, ensuring spices and raw sweet pieces remain soft and chewable."}
                  {product.id === "amla-cubes" && "Double-sealed child-friendly hygiene jar. Preserves delicate natural pectin structure, preventing the fruit slices from drying out."}
                  {product.id === "organic-amla-juice" && "High-density lead-free emerald glass bottle. Blocks sunlight radiation completely, shielding delicate ascorbic vitamins and clinical compounds."}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "nutrition" && (
          <div className="space-y-4 flex-1 text-left flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-[#0F3D2E]/10 pb-1.5 mb-2">
                <h4 className="font-serif font-black text-xs text-[#0F3D2E] uppercase tracking-widest">
                  Nutritional Values
                </h4>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold">(Per 100g)</span>
              </div>

              {/* Table rendering derived from real uploaded labels */}
              <div className="border border-[#0F3D2E]/10 overflow-hidden bg-[#FAF9F6] text-xs font-mono rounded-none">
                <div className="grid grid-cols-2 p-2 bg-gray-50/50 border-b border-[#0F3D2E]/5">
                  <span className="font-sans font-medium text-gray-500">Energy Value</span>
                  <span className="text-right font-bold text-[#0F3D2E]">{product.nutritionalInfo.energy}</span>
                </div>
                <div className="grid grid-cols-2 p-2 border-b border-[#0F3D2E]/5">
                  <span className="font-sans font-medium text-gray-500">Protein content</span>
                  <span className="text-right font-bold text-[#0F3D2E]">{product.nutritionalInfo.protein}</span>
                </div>
                <div className="grid grid-cols-2 p-2 bg-gray-50/50 border-b border-[#0F3D2E]/5">
                  <span className="font-sans font-medium text-gray-500">Carbohydrate</span>
                  <span className="text-right font-bold text-[#0F3D2E]">{product.nutritionalInfo.carbohydrate}</span>
                </div>
                <div className="grid grid-cols-2 p-2 border-b border-[#0F3D2E]/5">
                  <span className="font-sans font-medium text-gray-500">Total Fruit Sugars</span>
                  <span className="text-right font-bold text-[#0F3D2E]">{product.nutritionalInfo.totalSugars}</span>
                </div>
                <div className="grid grid-cols-2 p-2 bg-gray-50/50 border-b border-[#0F3D2E]/5">
                  <span className="font-sans font-medium text-gray-500">Dietary Plant Fibre</span>
                  <span className="text-right font-bold text-[#0F3D2E]">{product.nutritionalInfo.dietaryFiber}</span>
                </div>
                <div className="grid grid-cols-2 p-2">
                  <span className="font-sans font-medium text-gray-500">Total Fat</span>
                  <span className="text-right font-bold text-[#0F3D2E]">{product.nutritionalInfo.totalFat}</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-[9px] uppercase tracking-[0.15em] text-[#0F3D2E] border-t border-[#0F3D2E]/10 pt-3 mb-1">
                Ingredients:
              </h5>
              <p className="text-[10px] text-gray-600 font-sans italic leading-relaxed font-light">
                {product.ingredients}
              </p>
            </div>
          </div>
        )}

        {activeTab === "directions" && (
          <div className="space-y-4 flex-1 text-left flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-serif font-black text-xs text-[#0F3D2E] uppercase tracking-widest border-b border-[#0F3D2E]/10 pb-1.5">
                Compliance & Usage Guide
              </h4>
              <ul className="space-y-2">
                {product.backDetails.instructions.map((inst, index) => (
                  <li key={index} className="text-[11px] text-gray-600 leading-tight flex items-start gap-2.5">
                    <span className="w-4 h-4 border border-[#D4AF37]/50 bg-[#0F3D2E] text-[#D4AF37] text-[8px] font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="font-light">{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F5F5F0] border border-[#0F3D2E]/10 p-3 text-[10px] font-mono text-gray-500 space-y-1 rounded-none">
              <div className="flex justify-between">
                <span>Mfgr Batch No:</span>
                <span className="font-bold text-[#0F3D2E]">{product.backDetails.batchNo}</span>
              </div>
              <div className="flex justify-between">
                <span>Mfg Date:</span>
                <span className="font-bold text-[#0F3D2E]">{product.backDetails.mfgDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Best Before:</span>
                <span className="font-bold text-[#0F3D2E] uppercase">{product.backDetails.bestBefore}</span>
              </div>
              <div className="flex justify-between border-t border-[#0F3D2E]/10 pt-1 mt-1 text-[9px]">
                <span>FSSAI Lic No:</span>
                <span className="font-bold text-[#0F3D2E] select-all">30260226123537844</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Selection controller buttons */}
        <div className="flex bg-[#F5F5F0] border border-[#0F3D2E]/10 p-1 rounded-none my-4">
          <button
            onClick={() => setActiveTab("front")}
            className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] cursor-pointer transition-all rounded-none ${
              activeTab === "front" ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]/65 hover:bg-black/5"
            }`}
          >
            Showcase
          </button>
          <button
            onClick={() => setActiveTab("nutrition")}
            className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] cursor-pointer transition-all rounded-none ${
              activeTab === "nutrition" ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]/65 hover:bg-black/5"
            }`}
          >
            Label Info
          </button>
          <button
            onClick={() => setActiveTab("directions")}
            className={`flex-1 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] cursor-pointer transition-all rounded-none ${
              activeTab === "directions" ? "bg-[#0F3D2E] text-white" : "text-[#0F3D2E]/65 hover:bg-black/5"
            }`}
          >
            Usage
          </button>
        </div>

        {/* Dynamic CTA panel */}
        <div className="pt-4 border-t border-gray-150 flex items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-[9px] text-[#0F3D2E]/60 font-bold uppercase tracking-wider leading-none">SPECIAL PRICE (40% OFF)</p>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-xl md:text-2xl font-mono font-black text-[#0F3D2E] leading-none">
                ₹{product.price}
              </span>
              <span className="text-xs font-mono font-medium text-gray-400 line-through leading-none">
                ₹{product.mrp}
              </span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-[#0F3D2E] hover:bg-[#154D3B] text-white border border-[#D4AF37]/35 py-3.5 px-4 font-bold text-xs tracking-[0.18em] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 rounded-none"
          >
            <ShoppingCart className="w-4 h-4 text-gold-premium" />
            SECURE BUY
          </button>
        </div>
      </div>
    </div>
  );
}
