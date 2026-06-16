/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface AmloraLogoProps {
  className?: string;
  lightMode?: boolean;
  height?: number;
}

export default function AmloraLogo({ className = "", lightMode = false, height = 54 }: AmloraLogoProps) {
  // Let the logo fill its space with rich luxurious elements - beautifully proportional
  const finalHeight = height * 1.15; 

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        style={{ height: `${finalHeight}px` }}
        viewBox="0 0 310 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto transition-all duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:drop-shadow-[0_4px_16px_rgba(215,180,95,0.2)]"
      >
        <defs>
          {/* Champagne/Antique Gold luxury metallic gradient precisely matched to the uploaded image */}
          <linearGradient id="amloraGoldMetallic" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6623" />
            <stop offset="25%" stopColor="#D9B464" />
            <stop offset="50%" stopColor="#FDF1CC" />
            <stop offset="75%" stopColor="#E4C075" />
            <stop offset="100%" stopColor="#9C7730" />
          </linearGradient>

          {/* Premium subtle shadow for letter-depth */}
          <filter id="refinedGoldLusterShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.0" floodColor="#06120B" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Typography "AML" */}
        <text
          x="126"
          y="56"
          fontFamily="'Cinzel', 'Marcellus', 'Playfair Display', 'Constantia', 'Georgia', serif"
          fontSize="46"
          fontWeight="500"
          letterSpacing="0.04em"
          textAnchor="end"
          fill="url(#amloraGoldMetallic)"
          filter="url(#refinedGoldLusterShadow)"
        >
          AML
        </text>

        {/* 2. Concentric Golden Double Circle (O) - beautifully centered in the brand flow */}
        <g transform="translate(133, 17)" filter="url(#refinedGoldLusterShadow)">
          {/* Outer Ring */}
          <circle cx="22" cy="22" r="21.5" stroke="url(#amloraGoldMetallic)" strokeWidth="1.8" fill="none" />
          {/* Inner Ring (equally clear and thin stroke) */}
          <circle cx="22" cy="22" r="16.5" stroke="url(#amloraGoldMetallic)" strokeWidth="1.4" fill="none" />
        </g>

        {/* 3. Typography "RA" */}
        <text
          x="184"
          y="56"
          fontFamily="'Cinzel', 'Marcellus', 'Playfair Display', 'Constantia', 'Georgia', serif"
          fontSize="46"
          fontWeight="500"
          letterSpacing="0.04em"
          textAnchor="start"
          fill="url(#amloraGoldMetallic)"
          filter="url(#refinedGoldLusterShadow)"
        >
          RA
        </text>

        {/* 4. Trademark TM Indicator superscript */}
        <text
          x="254"
          y="31"
          fontFamily="'Inter', 'Montserrat', sans-serif"
          fontSize="7"
          fontWeight="600"
          letterSpacing="0.02em"
          fill="url(#amloraGoldMetallic)"
          filter="url(#refinedGoldLusterShadow)"
        >
          TM
        </text>

        {/* 5. lowercase "wellness" elegantly centered with spacious tracking precisely as shown in the logo reference */}
        <text
          x="155"
          y="80"
          fontFamily="'Constantia', 'Georgia', 'Playfair Display', serif"
          fontSize="22"
          fontWeight="400"
          letterSpacing="0.18em"
          textAnchor="middle"
          fill="url(#amloraGoldMetallic)"
          filter="url(#refinedGoldLusterShadow)"
        >
          wellness
        </text>
      </svg>
    </div>
  );
}
