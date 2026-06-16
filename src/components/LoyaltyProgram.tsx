/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Star, Award, ShieldCheck, HelpCircle, Gift, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoyaltyProgram() {
  const [spendAmount, setSpendAmount] = useState<number>(1500);
  const [selectedTier, setSelectedTier] = useState<"bronze" | "gold" | "royal">("gold");
  const [emailJoined, setEmailJoined] = useState<string>("");
  const [joinedSuccess, setJoinedSuccess] = useState<boolean>(false);

  // Subscription plan schema
  const tiers = [
    {
      id: "bronze",
      name: "Club Amlora",
      level: "Bronze Tier",
      price: "Free to Join",
      requirements: "Simply sign up with your email",
      pointsMultiplier: 1.0,
      rewardText: "1x Wellness Points on all orders",
      benefits: [
        "Earn 1 point per ₹1 spent",
        "500 Welcome Points upon joining",
        "Early access to seasonal harvests",
        "Private digital recipe handbook"
      ],
      color: "border-bronze text-amber-800",
      bgStyle: "bg-amber-800/5 border-amber-800/15"
    },
    {
      id: "gold",
      name: "Gold Sovereign",
      level: "Premium Tier",
      price: "Automatic with Purchase",
      requirements: "Spend ₹2,000+ annually",
      pointsMultiplier: 1.5,
      rewardText: "1.5x Sovereign Points on all orders",
      benefits: [
        "Earn 1.5 points per ₹1 spent",
        "Flat 15% VIP discount on all orders",
        "Free Express Courier shipping",
        "Priority reserve on the winter crop"
      ],
      color: "border-[#D4AF37] text-[#D4AF37]",
      bgStyle: "bg-[#D4AF37]/5 border-[#D4AF37]/30 scale-102 ring-1 ring-[#D4AF37]/20"
    },
    {
      id: "royal",
      name: "Royal Patron",
      level: "Elite Sanctuary",
      price: "₹3,999 / Year",
      requirements: "Or spend ₹15,000+ annually",
      pointsMultiplier: 2.5,
      rewardText: "2.5x Royal Points on all orders",
      benefits: [
        "Earn 2.5 points per ₹1 spent",
        "Personal certified Ayurveda Counselor",
        "Complimentary fresh seasonal tester jar",
        "VIP Invite to Amla Navami orchard blessing in Pratapgarh",
        "Hand-signed limited edition crop certifications"
      ],
      color: "border-purple-400 text-purple-700",
      bgStyle: "bg-purple-950/5 border-purple-500/15"
    }
  ];

  // Calculate points earned dynamically
  const tierMultiplier = selectedTier === "bronze" ? 1.0 : selectedTier === "gold" ? 1.5 : 2.5;
  const pointsEarned = Math.round(spendAmount * tierMultiplier);
  const rupeesSaved = Math.round(pointsEarned * 0.1); // 10 points = 1 rupee cashback value

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailJoined.trim()) {
      setJoinedSuccess(true);
      setTimeout(() => {
        setJoinedSuccess(false);
        setEmailJoined("");
      }, 5000);
    }
  };

  return (
    <section 
      id="loyalty-program" 
      className="py-24 bg-[#FAF9F5] text-[#0F3D2E] font-sans scroll-mt-20 border-b border-[#0F3D2E]/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#0F3D2E] border border-[#0F3D2E]/25 bg-white px-3.5 py-1.5 inline-block">
            ✦ Amlora Sovereignty Club
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#0F3D2E] tracking-tight leading-tight">
            Wellness Membership & <br />
            <span className="italic text-[#A2811A]">Loyalty Rewards</span>
          </h2>
          <div className="h-[2px] w-24 bg-[#D4AF37] mx-auto" />
          <p className="text-xs md:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed font-light">
            Savor the pure therapeutic rewards of ancient Amla. Earn points with every purchase, unlock exclusive culinary guides, and secure express home shipping.
          </p>
        </div>

        {/* Membership Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
          {tiers.map((tier) => {
            const isGold = tier.id === "gold";
            return (
              <div 
                key={tier.id}
                className={`flex flex-col justify-between p-8 border hover:border-emerald-700/40 transition-all duration-300 relative group bg-white shadow-sm hover:shadow-md ${tier.bgStyle}`}
              >
                {isGold && (
                  <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-[#0F3D2E] text-[8px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 border border-[#FAF9F5] shadow-sm z-10">
                    🏆 MOST POPULAR PARTNERSHIP
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* Tier Title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block">
                      {tier.level}
                    </span>
                    <h3 className="text-2xl font-serif text-[#0F3D2E] font-medium leading-none">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Pricing / Criteria */}
                  <div className="border-y border-[#0F3D2E]/10 py-4">
                    <div className="text-xl font-bold text-[#0F3D2E]">
                      {tier.price}
                    </div>
                    <div className="text-[10px] text-gray-500 italic mt-0.5">
                      {tier.requirements}
                    </div>
                  </div>

                  {/* Benefit points pill */}
                  <div className="flex items-center gap-2.5 bg-emerald-50/50 border border-emerald-500/10 px-3 py-2">
                    <Gift className="w-4 h-4 text-emerald-700" />
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">
                      {tier.rewardText}
                    </span>
                  </div>

                  {/* Benefits checklist */}
                  <ul className="space-y-3 pt-2 text-left">
                    {tier.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs font-light text-gray-600 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => {
                      setSelectedTier(tier.id as "bronze" | "gold" | "royal");
                      const calcElement = document.getElementById("points-calculator");
                      if (calcElement) calcElement.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-3.5 text-center font-bold text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                      isGold 
                        ? "bg-[#0F3D2E] hover:bg-emerald-800 text-white" 
                        : "border border-[#0F3D2E]/20 hover:border-[#0F3D2E] text-[#0F3D2E]"
                    }`}
                  >
                    Select & Calculate Points
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Loyalty Calculator & Quick Join */}
        <div id="points-calculator" className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white border border-[#0F3D2E]/10 shadow-lg p-8 md:p-12 relative overflow-hidden">
          {/* Decorative side color band */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4AF37]" />

          {/* Column 1: Interactive calculator */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 border border-[#D4AF37]/35">
                <Calculator className="w-5 h-5 text-[#A2811A]" />
              </div>
              <div>
                <h4 className="text-lg font-serif text-[#0F3D2E]">Interactive Sourcing Points Calculator</h4>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#0F3D2E]/60 mt-0.5">Explore your real cashback rewards</p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-[#0F3D2E]/10" />

            {/* Slider container */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F3D2E]/80">Estimated Session Value</label>
                <div className="text-3xl font-serif font-bold text-[#0F3D2E]">
                  ₹ {spendAmount.toLocaleString("en-IN")}
                </div>
              </div>

              <input 
                type="range"
                min="300"
                max="12000"
                step="100"
                value={spendAmount}
                onChange={(e) => setSpendAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
              />

              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>₹ 300 (Standard Pack)</span>
                <span>₹ 5,000 (Family Pack)</span>
                <span>₹ 12,000 (Yearly Sanctuary)</span>
              </div>
            </div>

            {/* Selector For Tiers */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F3D2E]/80 block">Select Target Sourcing Tier</label>
              <div className="grid grid-cols-3 gap-3">
                {["bronze", "gold", "royal"].map((tId) => {
                  const t = tiers.find(item => item.id === tId)!;
                  const isSel = selectedTier === tId;
                  return (
                    <button
                      key={tId}
                      onClick={() => setSelectedTier(tId as any)}
                      className={`py-3 px-2 text-center border transition-all text-[10px] font-bold uppercase tracking-wider cursor-pointer ${
                        isSel 
                          ? "bg-[#0F3D2E] border-[#D4AF37] text-[#D4AF37]" 
                          : "bg-gray-50 border-gray-200 hover:border-gray-400 text-[#0F3D2E]/70"
                      }`}
                    >
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Live Points Outcome Counter */}
          <div className="lg:col-span-5 bg-emerald-50/50 border border-emerald-500/10 p-8 flex flex-col justify-between text-left space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-emerald-800 font-bold">Accumulative Rewards Result</span>
              <h5 className="text-sm font-serif font-bold text-emerald-950 uppercase">Active Yield Metrics</h5>
            </div>

            {/* Live calculation displays */}
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-emerald-900/10">
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">Points Earned</span>
                <p className="text-2xl font-mono font-bold text-emerald-800">{pointsEarned} pts</p>
                <p className="text-[10px] text-gray-500 italic font-mono mt-0.5">({tierMultiplier}x mult)</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">Cashback Value</span>
                <p className="text-2xl font-mono font-bold text-[#A2811A]">₹ {rupeesSaved}</p>
                <p className="text-[10px] text-gray-500 italic font-mono mt-0.5">(For next order)</p>
              </div>
            </div>

            {/* Join club email sign up block */}
            <div className="space-y-3">
              <div className="text-[10px] text-emerald-800 tracking-wider font-light uppercase leading-snug">
                🎁 Claim <strong className="font-bold">500 Welcome Points</strong> instantly by creating your free account now!
              </div>

              {joinedSuccess ? (
                <div className="p-3 bg-[#0F3D2E]/10 border border-[#0F3D2E]/25 text-[11px] text-emerald-900 leading-relaxed font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>Sovereignty welcomes you! 500 Welcome points credited. Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={emailJoined}
                    onChange={(e) => setEmailJoined(e.target.value)}
                    className="flex-grow bg-white border border-gray-300 px-4 py-3 text-xs placeholder-gray-400 font-light focus:outline-emerald-800"
                  />
                  <button
                    type="submit"
                    className="bg-[#0F3D2E] hover:bg-emerald-900 text-[#D4AF37] px-5 py-3 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
                  >
                    <span>Claim</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
