import React, { useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isReset) {
        // Reset password
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/#reset-password`,
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Password reset link sent to your email successfully!",
        });
      } else if (isSignUp) {
        // Sign Up with custom metadata fields
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
            }
          }
        });
        if (error) throw error;
        
        setMessage({
          type: "success",
          text: isSupabaseConfigured 
            ? "Activation link dispatched! Please verify your email inbox."
            : "Test Account created safely and logged in successfully!",
        });
        
        if (data?.user) {
          setTimeout(() => {
            onSuccess(data.user);
            onClose();
          }, 1500);
        }
      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        setMessage({
          type: "success",
          text: "Authenticated successfully! Transferring sessions...",
        });

        if (data?.user) {
          setTimeout(() => {
            onSuccess(data.user);
            onClose();
          }, 1000);
        }
      }
    } catch (err: any) {
      console.error("Auth error triggered:", err);
      setMessage({
        type: "error",
        text: err.message || "An authentication error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoAdmin = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "amlorawellness@gmail.com",
        password: "demo-admin-password",
      });
      if (error) throw error;
      setMessage({
        type: "success",
        text: "Demonstration Admin access established!",
      });
      if (data?.user) {
        setTimeout(() => {
          onSuccess(data.user);
          onClose();
        }, 1000);
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-[#FAF9F5] border border-[#0F3D2E]/20 text-[#0F3D2E] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]"
        id="auth-modal-card"
      >
        {/* Modal Header */}
        <div className="bg-[#0F3D2E] text-[#FAF9F5] p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#FAF9F5]/85 hover:text-[#D4AF37] text-xl transition-colors"
            id="auth-modal-close-btn"
          >
            ✕
          </button>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">✦ Amlora Pure Sourcing</span>
          <h3 className="text-2xl font-serif mt-1">
            {isReset ? "Reset Password" : isSignUp ? "Create Account" : "Access Sourcing Hub"}
          </h3>
          <p className="text-[11px] text-[#FAF9F5]/70 mt-1 font-light">
            {isReset 
              ? "Specify your email to retrieve recovery credentials."
              : isSignUp 
                ? "Register below for premium member-only checkouts."
                : "Submit your account passwords to review dispatch journals."}
          </p>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans">
          {message && (
            <div 
              className={`p-3 rounded-lg text-xs leading-relaxed ${
                message.type === "success" 
                  ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-800" 
                  : "bg-rose-500/10 border border-rose-500/20 text-rose-800"
              }`}
            >
              <strong>{message.type === "success" ? "✔ Success: " : "✖ Alert: "}</strong>
              {message.text}
            </div>
          )}

          {isSignUp && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]/80 mb-1">Full Name</label>
                <input 
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Alok Pratap"
                  className="w-full bg-white border border-[#0F3D2E]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-3.5 py-2 text-xs outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]/80 mb-1">Phone Number</label>
                <input 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +91 98765 43210"
                  className="w-full bg-white border border-[#0F3D2E]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-3.5 py-2 text-xs outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]/80 mb-1">Email Address</label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., candidate@amlorawellness.com"
              className="w-full bg-white border border-[#0F3D2E]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-3.5 py-2 text-xs outline-none transition-all"
            />
          </div>

          {!isReset && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0F3D2E]/80">Password</label>
                {!isSignUp && (
                  <button 
                    type="button"
                    onClick={() => { setIsReset(true); setIsSignUp(false); }}
                    className="text-[10px] text-[#A2811A] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#0F3D2E]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] rounded-lg px-3.5 py-2 text-xs outline-none transition-all"
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F3D2E] hover:bg-[#07241a] text-[#FAF9F5] font-bold uppercase tracking-wider py-2.5 rounded-lg text-xs transition-colors shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#FAF9F5] border-t-transparent rounded-full animate-spin" />
            ) : isReset ? (
              "Dispatch Reset Instructions ➜"
            ) : isSignUp ? (
              "Create Account ➜"
            ) : (
              "Verify Credentials ➜"
            )}
          </button>
        </form>

        {/* Modal Footer toggles */}
        <div className="bg-[#FAF9F5] border-t border-[#0F3D2E]/10 p-4 text-center space-y-2">
          {isReset ? (
            <button 
              onClick={() => { setIsReset(false); setIsSignUp(false); }}
              className="text-xs text-[#0F3D2E]/70 hover:text-[#0F3D2E] transition-all"
            >
              Return to login portal
            </button>
          ) : (
            <div className="text-xs text-gray-500">
              {isSignUp ? "Already a verified patron? " : "New to Amlora Sourcing? "}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#A2811A] font-bold hover:underline"
              >
                {isSignUp ? "Log In" : "Register Now"}
              </button>
            </div>
          )}

          {/* Integration Sandbox Quick-Access */}
          <div className="pt-2 border-t border-[#0F3D2E]/5">
            <button 
              type="button"
              onClick={handleQuickDemoAdmin}
              className="text-[10px] bg-[#D4AF37]/10 text-[#A2811A] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-[#D4AF37]/25 w-full hover:bg-[#D4AF37]/15 transition-all"
            >
              ⚡ Bypass with Demo Admin Session
            </button>
            {!isSupabaseConfigured && (
              <p className="text-[9px] text-[#A2811A] mt-1 font-sans italic">
                Local Sandbox Mode enabled. Use any password to test live database updates locally!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
