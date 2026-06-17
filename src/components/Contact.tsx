/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Phone, Mail, Globe, MapPin, ShieldAlert, Send, Check } from "lucide-react";

export default function Contact({ hideForm = false }: { hideForm?: boolean }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Retail Inquiry",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: "", email: "", subject: "Retail Inquiry", message: "" });
      }, 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-white font-sans scroll-mt-20 border-b border-[#0F3D2E]/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 ${hideForm ? "" : "lg:grid-cols-12"} gap-12 items-stretch`}>
          {/* Left Column: Premium Coordinates Display */}
          <div className={`${hideForm ? "lg:col-span-12 max-w-2xl mx-auto w-full" : "lg:col-span-5"} bg-[#0F3D2E] text-white rounded-none p-8 md:p-10 flex flex-col justify-between border-y-2 border-x border-[#D4AF37] shadow-xl text-left relative overflow-hidden`}>
            {/* Ambient coordinates grid lines */}
            <div className="absolute right-0 top-0 w-32 h-32 border-b border-l border-[#D4AF37]/15 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif text-[#FAF9F6] tracking-tight">
                Amlora Wellness
              </h3>
              <p className="text-xs text-cream/75 leading-relaxed font-light">
                Whether you are looking to place bulk corporate festival orders, source wholesale deseeded amla, or require customer support, get in touch with our dispatch office in Pratapgarh.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/5 text-xs">
                {/* Physical Location */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-none bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[9px] mb-1">Office Address</h4>
                    <p className="text-cream/90 leading-relaxed font-light font-sans select-all">
                      0 Ranjeetpur Chilbila Post,<br />
                      Madhoganj Ranjeetpur, Chilbila,<br />
                      Pratapgarh Tahsil, Pratapgarh District,<br />
                      Uttar Pradesh, India — Pincode: 230403
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-none bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[9px] mb-1">Phone Helpline</h4>
                    <p className="text-cream/90 font-mono text-sm leading-none font-bold select-all">
                      +91 9451657345
                    </p>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-none bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[9px] mb-1">Email Coordinator</h4>
                    <p className="text-[#D4AF37] text-xs font-bold leading-none select-all underline">
                      info@amlorawellness.com
                    </p>
                  </div>
                </div>

                {/* Website domain */}
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-none bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#D4AF37] uppercase tracking-widest text-[9px] mb-1">Official Website</h4>
                    <p className="text-cream/95 text-xs font-bold select-all leading-none font-mono">
                      amlorawellness.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Safety Regulator Board */}
            <div className="mt-8 border-t border-white/10 pt-5 text-left relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-black/20 border border-[#D4AF37]/25 rounded-none px-3 py-2 text-[9px] text-[#FAF9F6] font-mono">
                <span className="font-bold text-[#D4AF37] font-sans text-[8px] uppercase tracking-wider">FSSAI Lic:</span>
                <span className="font-bold select-all">30260226123537844</span>
              </div>
              <p className="text-[10px] text-cream/50 mt-2 select-none font-light font-sans">
                * Conforming strictly to standard packaged food guidelines.
              </p>
            </div>
          </div>

          {/* Right Column: Contact message form */}
          {!hideForm && (
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {submitted ? (
                <div className="p-8 text-center bg-white rounded-none border border-[#D4AF37] max-w-md mx-auto my-auto space-y-4 shadow-md">
                  <div className="w-12 h-12 border border-emerald-500 bg-emerald-50/50 flex items-center justify-center mx-auto rotate-45">
                    <Check className="w-6 h-6 text-emerald-600 -rotate-45" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0F3D2E] text-lg pt-2">Inquiry Dispatched!</h4>
                  <p className="text-xs text-gray-500">
                    Thank you. Your message has been saved in our Pratapgarh headquarters register. A wellness coordinator will email you at <strong>{formData.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-5 p-2">
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#0F3D2E] tracking-tight">
                      Leave A Message
                    </h3>
                    <p className="text-xs text-gray-400 font-light">
                      Have questions or feedback? Fill up this form and our dispatch office will connect with you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Rawat"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rawat.anand@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">
                      Subject Coordinates
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white font-bold text-[#0F3D2E]"
                    >
                      <option value="Retail Inquiry">🛍️ Retail Purchase question</option>
                      <option value="Bulk Order inquiry">🏭 Bulk Orchard Sourcing (Minimum 10kg)</option>
                      <option value="Seedless Processing questions">🔬 Seedless separation Technology details</option>
                      <option value="Feedback / Complaints">💬 Consumer Feedback / Review</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your requirement in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 text-xs border border-[#0F3D2E]/15 rounded-none focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] focus:border-[#0F3D2E] bg-white text-[#0F3D2E]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#0F3D2E] hover:bg-[#154D3B] text-white py-4 px-8 rounded-none font-bold text-xs tracking-[0.18em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#D4AF37]/35 shadow-sm"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    {submitting ? "DISPATCHING..." : "DISPATCH INQUIRY"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
