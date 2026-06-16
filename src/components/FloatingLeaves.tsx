/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";

interface LeafParticle {
  id: number;
  left: number; // percentage from left
  delay: number; // seconds delay
  duration: number; // seconds duration
  size: number; // size in px
  opacity: number;
  rotateStart: number;
  colorType: "green" | "gold";
}

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState<LeafParticle[]>([]);

  useEffect(() => {
    // Generate a fixed set of coordinates so it works consistently on mount
    const initialLeaves: LeafParticle[] = Array.from({ length: 9 }).map((_, idx) => ({
      id: idx,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 8,
      duration: 15 + Math.random() * 15,
      size: 14 + Math.random() * 24,
      opacity: 0.08 + Math.random() * 0.12,
      rotateStart: Math.random() * 360,
      colorType: Math.random() > 0.65 ? "gold" : "green",
    }));
    setLeaves(initialLeaves);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <style>{`
        @keyframes gentleDriftSway {
          0% {
            transform: translateY(110vh) translateX(0) rotate(0deg);
          }
          30% {
            transform: translateY(70vh) translateX(25px) rotate(45deg);
          }
          60% {
            transform: translateY(35vh) translateX(-20px) rotate(110deg);
          }
          100% {
            transform: translateY(-10vh) translateX(15px) rotate(220deg);
          }
        }
        .organic-anim-leaf {
          animation: gentleDriftSway linear infinite;
        }
      `}</style>

      {leaves.map((leaf) => (
        <svg
          key={leaf.id}
          className="absolute organic-anim-leaf"
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            opacity: leaf.opacity,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            transform: `rotate(${leaf.rotateStart}deg)`,
            bottom: "-50px",
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {leaf.colorType === "gold" ? (
            // Exquisite fine golden leaf vector
            <path
              d="M12 2C12 2 15 7 15 12C15 17 12 22 12 22C12 22 9 17 9 12C9 7 12 2 12 2Z"
              fill="#D4AF37"
              stroke="#AA7C11"
              strokeWidth="0.5"
            />
          ) : (
            // Delicate organic green Ayurvedic leaf vector with vein structure
            <g>
              <path
                d="M12 2C12 2 17 6 17 12C17 18 12 22 12 22C12 22 7 18 7 12C7 6 12 2 12 2Z"
                fill="#135A43"
                opacity="0.85"
              />
              <path
                d="M12 2V22"
                stroke="#FAF9F6"
                strokeWidth="0.5"
                opacity="0.3"
              />
              <path
                d="M12 8L15 10M12 11L16 13M12 14L15 16M12 7L9 9M12 10L8 12M12 13L9 15"
                stroke="#FAF9F6"
                strokeWidth="0.35"
                opacity="0.25"
              />
            </g>
          )}
        </svg>
      ))}
    </div>
  );
}
