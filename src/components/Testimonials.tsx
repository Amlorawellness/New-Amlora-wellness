/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TESTIMONIALS } from "../data/products";
import { Testimonial } from "../types";
import { Star, CheckCircle, MessageSquare, Plus, Check } from "lucide-react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    title: "",
    review: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review || !formData.title) return;

    const newReview: Testimonial = {
      id: "ut_" + Date.now(),
      name: formData.name,
      location: formData.location || "Verified Indian Customer",
      rating: formData.rating,
      date: "Today",
      title: formData.title,
      review: formData.review,
      verified: true
    };

    setTestimonials([newReview, ...testimonials]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setFormData({ name: "", location: "", rating: 5, title: "", review: "" });
    }, 1500);
  };

  return (
    <section id="testimonials" className="py-16 md:py-20 bg-[#FAF9F6] font-sans border-b border-[#0F3D2E]/15 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 text-left">
          <div className="space-y-3">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] bg-[#0F3D2E] px-4 py-2 border border-[#D4AF37]/30 inline-block">
              Consumer Validation
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#0F3D2E] leading-tight tracking-tight">
              Loved by Ayurvedic Enthusiasts
            </h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-lg leading-relaxed font-light">
              See how our pure, seed-extracted Amla developments are transforming health regimes around India. Read comments from qualified consultants and daily active consumers.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="flex-shrink-0 border border-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white text-[#0F3D2E] font-bold px-6 py-4 rounded-none text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> {showReviewForm ? "Close Review Panel" : "Write A Review"}
          </button>
        </div>

        {/* Dynamic review submission form */}
        {showReviewForm && (
          <div className="bg-white border-y-2 border-x border-[#D4AF37] p-8 mb-12 max-w-2xl mx-auto transition-all text-left rounded-none shadow-xl relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#0F3D2E]" />
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 border border-emerald-500 bg-emerald-50/50 flex items-center justify-center mx-auto rotate-45">
                  <Check className="w-6 h-6 text-emerald-600 -rotate-45" />
                </div>
                <h4 className="font-serif font-bold text-[#0F3D2E] text-base pt-2">Review Submitted Successfully!</h4>
                <p className="text-xs text-gray-400">Your feedback has been published onto our public storefront.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-serif font-bold text-[#0F3D2E] text-base border-b border-[#0F3D2E]/10 pb-1.5 uppercase tracking-wider">
                  Post Your Verified Satiety
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi, India"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">Overall Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E] font-bold"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                      <option value="3">⭐⭐⭐ 3 Stars</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">Review Headline *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Absolutely delicious and pure!"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">Detailed Comment *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe your taste experience, water solubility, packaging quality, etc..."
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#0F3D2E] hover:bg-[#154D3B] text-white px-6 py-3 rounded-none text-xs font-bold tracking-[0.18em] uppercase transition-colors cursor-pointer border border-[#D4AF37]/30"
                >
                  Publish Verified Review
                </button>
              </form>
            )}
          </div>
        )}

        {/* Testimonials Review Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 md:p-8 border border-[#0F3D2E]/10 rounded-none text-left flex flex-col justify-between hover:border-[#D4AF37]/50 shadow-sm transition-all group relative"
            >
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#D4AF37]/20 border-b border-l border-[#D4AF37]/40" />
              <div className="space-y-4">
                {/* Score & verification details */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-3.5 h-3.5 ${
                          index < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {review.verified && (
                    <span className="flex items-center gap-1 text-[9px] text-[#0F3D2E] font-bold uppercase tracking-[0.15em] bg-[#F5F5F0] border border-[#0F3D2E]/10 px-2.5 py-1 rounded-none leading-none">
                      <CheckCircle className="w-3 h-3 text-emerald-700" /> Verified Buyer
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-sm font-bold text-[#0F3D2E]">
                    &ldquo;{review.title}&rdquo;
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed min-h-[72px]">
                    {review.review}
                  </p>
                </div>
              </div>

              {/* Author signatures */}
              <div className="border-t border-[#0F3D2E]/10 pt-4 mt-6 flex justify-between items-center text-[10px]">
                <div>
                  <h4 className="font-serif font-bold text-[#0F3D2E]">{review.name}</h4>
                  <p className="text-gray-400 font-light mt-0.5 uppercase tracking-wide text-[9px]">{review.location}</p>
                </div>
                <span className="text-gray-400 font-mono text-[9px]">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
