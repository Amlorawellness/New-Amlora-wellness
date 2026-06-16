/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface AmlaIllustrationProps {
  className?: string;
  size?: number;
  showShadow?: boolean;
  dewy?: boolean;
}

export default function AmlaIllustration({
  className = "",
  size = 200,
  showShadow = true,
  dewy = true,
}: AmlaIllustrationProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {showShadow && (
        <div
          className="absolute bottom-1 w-[80%] h-[12px] bg-black/10 rounded-full blur-[6px] transition-all duration-300"
          style={{ transform: "scale(0.9)" }}
        />
      )}

      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
      >
        <defs>
          {/* Translucent translucent green of fresh, natural Indian Amla superfruit */}
          <radialGradient id="amlaSkin" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#E2F3B1" />   {/* Light golden sunrise highlight */}
            <stop offset="45%" stopColor="#AACC22" />  {/* Sweet lime green pulp */}
            <stop offset="85%" stopColor="#6C9A05" />  {/* Tannin rich outer layer */}
            <stop offset="100%" stopColor="#3C5B01" /> {/* Deep forest outline */}
          </radialGradient>

          {/* Golden outline sheen representing luxury premium feel */}
          <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.5" />
          </linearGradient>

          {/* Organic Leaf Green Gradient */}
          <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9ECA31" />
            <stop offset="50%" stopColor="#699214" />
            <stop offset="100%" stopColor="#314B00" />
          </linearGradient>

          {/* Dewdrop Gradient */}
          <radialGradient id="dewDrop" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#AACC22" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0F3D2E" stopOpacity="0.6" />
          </radialGradient>
        </defs>

        {/* BACKGROUND GLOW */}
        <circle cx="80" cy="85" r="55" fill="#8DA922" opacity="0.12" filter="blur(15px)" />

        {/* ORGANIC STEM AND LEAF (Ayurvedic botanical identity) */}
        <path
          d="M 80 40 C 78 30, 60 15, 45 28 C 40 32, 42 42, 55 41 C 65 40, 75 38, 80 40 Z"
          fill="url(#leafGrad)"
          stroke="#0F3D2E"
          strokeWidth="1.2"
        />
        {/* Leaf veins */}
        <path d="M 45 28 Q 58 35, 78 39 M 52 32 Q 58 37, 60 39 M 60 28 Q 63 34, 68 37" stroke="#FAF9F6" strokeWidth="0.8" opacity="0.6" />

        <path
          d="M 80 40 C 82 30, 100 15, 115 28 C 120 32, 118 42, 105 41 C 95 40, 85 38, 80 40 Z"
          fill="url(#leafGrad)"
          stroke="#0F3D2E"
          strokeWidth="1.2"
        />
        {/* Leaf veins 2 */}
        <path d="M 115 28 Q 102 35, 82 39 M 108 32 Q 102 37, 100 39 M 100 28 Q 97 34, 92 37" stroke="#FAF9F6" strokeWidth="0.8" opacity="0.6" />

        {/* Small wood-like twig stem */}
        <path d="M 80 50 L 80 32 Z" stroke="#5C4012" strokeWidth="4" strokeLinecap="round" />

        {/* MAIN AMLA SPHERE */}
        <circle cx="80" cy="87" r="52" fill="url(#amlaSkin)" stroke="#1A3026" strokeWidth="1" />

        {/* NATURAL RIDGES (6 distinct vertical ribs representing the classic emblica structure) */}
        <path d="M 80 35 C 70 50, 70 120, 80 139" stroke="#3C5B01" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.4" />
        <path d="M 80 35 C 53 50, 53 120, 80 139" stroke="#3C5B01" strokeWidth="2" strokeDasharray="4 2" opacity="0.35" />
        <path d="M 80 35 C 107 50, 107 120, 80 139" stroke="#3C5B01" strokeWidth="2" strokeDasharray="4 2" opacity="0.35" />
        <path d="M 80 35 C 38 52, 38 118, 80 139" stroke="#3C5B01" strokeWidth="1" opacity="0.25" />
        <path d="M 80 35 C 122 52, 122 118, 80 139" stroke="#3C5B01" strokeWidth="1" opacity="0.25" />

        {/* GOLD PREMIUM HIGHLIGHT SHEEN (Enhancing luxury look) */}
        <circle cx="80" cy="87" r="50" stroke="url(#goldSheen)" strokeWidth="1.5" opacity="0.75" pointerEvents="none" />

        {/* TRANSLUCENT INNER SHADOW/CORE */}
        <circle cx="72" cy="79" r="42" fill="#E2F3B1" opacity="0.15" />

        {/* ORGANIC SPECKLES (Mature, vitamin-rich fruit markings) */}
        <circle cx="56" cy="74" r="1.5" fill="#314B00" opacity="0.3" />
        <circle cx="85" cy="58" r="1" fill="#314B00" opacity="0.4" />
        <circle cx="108" cy="82" r="1.5" fill="#314B00" opacity="0.2" />
        <circle cx="95" cy="115" r="1" fill="#314B00" opacity="0.3" />
        <circle cx="48" cy="98" r="1" fill="#314B00" opacity="0.4" />
        <circle cx="75" cy="122" r="1.5" fill="#314B00" opacity="0.2" />

        {/* CORE STEM DOT (Where the fruit connects) */}
        <circle cx="80" cy="38" r="4" fill="#314B00" opacity="0.8" />
        <circle cx="80" cy="38" r="2" fill="#D4AF37" />

        {/* MORNING DEW DROPLET (Real pure ingredient promise) */}
        {dewy && (
          <g>
            <ellipse cx="64" cy="62" rx="4" ry="5.5" fill="url(#dewDrop)" transform="rotate(-15, 64, 62)" />
            {/* Dewdrop reflection point */}
            <circle cx="62.5" cy="59.5" r="1" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
}
