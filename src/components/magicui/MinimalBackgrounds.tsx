"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";
import GridPattern from "./GridPattern";

// Option 1: Enhanced Grid Pattern with Subtle Animation
export const EnhancedGrid: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        className={
          "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,white,transparent)] " +
          `absolute inset-0 ${
            theme === 'light' 
              ? 'stroke-orange-200/70 fill-orange-100/50' 
              : 'stroke-orange-500/60 fill-orange-500/30'
          }`
        }
      />
      {/* Enhanced glow overlay */}
      <div className={`absolute inset-0 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-orange-50/60 via-transparent to-slate-50/60'
          : 'bg-gradient-to-br from-orange-950/50 via-transparent to-neutral-950/60'
      }`} />
    </div>
  );
};

// Option 2: Floating Minimal Dots
export const FloatingDots: React.FC = () => {
  const { theme } = useTheme();
  const [dots, setDots] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  // Generate dots after hydration to avoid SSR/client mismatch
  useEffect(() => {
    setDots(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${
            theme === 'light' 
              ? 'bg-orange-300/40' 
              : 'bg-orange-500/30'
          }`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Subtle radial gradient overlay */}
      <div className={`absolute inset-0 ${
        theme === 'light'
          ? 'bg-radial-gradient from-orange-50/20 via-transparent to-transparent'
          : 'bg-radial-gradient from-orange-950/10 via-transparent to-transparent'
      }`} style={{
        background: theme === 'light' 
          ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(251, 146, 60, 0.05), transparent)'
          : 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(251, 146, 60, 0.08), transparent)'
      }} />
    </div>
  );
};

// Option 3: Gradient Mesh
export const GradientMesh: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated mesh background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        animate={{
          background: theme === 'light' ? [
            'radial-gradient(ellipse 80% 80% at 20% 40%, rgba(251, 146, 60, 0.2), transparent), radial-gradient(ellipse 80% 80% at 80% 80%, rgba(251, 146, 60, 0.15), transparent)',
            'radial-gradient(ellipse 80% 80% at 40% 20%, rgba(251, 146, 60, 0.25), transparent), radial-gradient(ellipse 80% 80% at 60% 90%, rgba(251, 146, 60, 0.12), transparent)',
            'radial-gradient(ellipse 80% 80% at 20% 40%, rgba(251, 146, 60, 0.2), transparent), radial-gradient(ellipse 80% 80% at 80% 80%, rgba(251, 146, 60, 0.15), transparent)'
          ] : [
            'radial-gradient(ellipse 80% 80% at 20% 40%, rgba(251, 146, 60, 0.3), transparent), radial-gradient(ellipse 80% 80% at 80% 80%, rgba(251, 146, 60, 0.25), transparent)',
            'radial-gradient(ellipse 80% 80% at 40% 20%, rgba(251, 146, 60, 0.35), transparent), radial-gradient(ellipse 80% 80% at 60% 90%, rgba(251, 146, 60, 0.20), transparent)',
            'radial-gradient(ellipse 80% 80% at 20% 40%, rgba(251, 146, 60, 0.3), transparent), radial-gradient(ellipse 80% 80% at 80% 80%, rgba(251, 146, 60, 0.25), transparent)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Static overlay */}
      <div className={`absolute inset-0 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-transparent via-white/20 to-orange-50/30'
          : 'bg-gradient-to-br from-transparent via-neutral-950/30 to-orange-950/20'
      }`} />
    </div>
  );
};

// Option 4: High Contrast Geometric Lines
export const GeometricLines: React.FC = () => {
  const { theme } = useTheme();
  const [lines, setLines] = useState<Array<{
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    duration: number;
    delay: number;
    thickness: number;
  }>>([]);

  // Generate lines after hydration to avoid SSR/client mismatch
  useEffect(() => {
    setLines(Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      duration: Math.random() * 12 + 15,
      delay: Math.random() * 8,
      thickness: Math.random() * 1.5 + 0.5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full">
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke={theme === 'light' ? 'rgba(251, 146, 60, 0.45)' : 'rgba(251, 146, 60, 0.7)'}
            strokeWidth={line.thickness}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              delay: line.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
      {/* Minimal hotspots for depth in dark mode; no wide orange glow */}
      {theme === 'dark' && (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(300px 220px at 12% 18%, rgba(251, 146, 60, 0.06), transparent 60%),\
                 radial-gradient(280px 200px at 88% 82%, rgba(251, 146, 60, 0.05), transparent 60%)',
            }}
          />
        </>
      )}
      {/* In light mode keep a very subtle wash */}
      {theme === 'light' && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/10 via-transparent to-orange-100/10" />
      )}
    </div>
  );
};

// Option 5: Clean Texture with Subtle Animation
export const CleanTexture: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create subtle noise texture
    const createNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Use a simple pseudo-random function for consistent results
      let seed = 1;
      const pseudoRandom = () => {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      };

      for (let i = 0; i < data.length; i += 4) {
        const noise = pseudoRandom() * 255;
        const alpha = theme === 'light' ? 0.15 : 0.25; // Much more visible
        
        data[i] = 251;     // Orange R
        data[i + 1] = 146; // Orange G
        data[i + 2] = 60;  // Orange B
        data[i + 3] = noise * alpha; // Alpha
      }

      ctx.putImageData(imageData, 0, 0);
    };

    createNoise();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-100"
      />
      
      {/* Enhanced gradient overlay */}
      <div className={`absolute inset-0 ${
        theme === 'light'
          ? 'bg-gradient-to-br from-transparent via-orange-50/30 to-slate-50/40'
          : 'bg-gradient-to-br from-transparent via-orange-950/25 to-neutral-950/35'
      }`} />
    </div>
  );
};

// Option 6: Simple Glow (Most Minimal)
export const SimpleGlow: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Single central glow */}
      <motion.div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${
          theme === 'light'
            ? 'bg-orange-200/20'
            : 'bg-orange-500/15'
        } blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary smaller glow */}
      <motion.div
        className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full ${
          theme === 'light'
            ? 'bg-orange-100/15'
            : 'bg-orange-600/10'
        } blur-2xl`}
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};
