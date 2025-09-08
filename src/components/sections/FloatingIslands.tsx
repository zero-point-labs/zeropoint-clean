'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { StarsBackground } from '@/components/animate-ui/backgrounds/stars';

const FloatingIslands: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [diagonalOffset, setDiagonalOffset] = useState({ x: 0, y: 0 });
  const [islandOpacity, setIslandOpacity] = useState({ island1: 1, island2: 0, island3: 0 });
  const [isDiagonalScrollComplete, setIsDiagonalScrollComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const isScrolling = useRef(false);

  const BUFFER_SCROLL = 300; // Buffer to center first island before custom scrolling starts
  const MAX_SCROLL_STAGE_1 = 600; // Horizontal scroll to second island
  const MAX_SCROLL_STAGE_2 = 800; // Diagonal scroll to third island
  const TOTAL_SCROLL = BUFFER_SCROLL + MAX_SCROLL_STAGE_1 + MAX_SCROLL_STAGE_2;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const currentProgress = Math.min(Math.max(scrollAccumulator.current / TOTAL_SCROLL, 0), 1);
      
      // Allow normal scrolling if:
      // 1. At 100% progress and scrolling down (exit to next sections)
      // 2. At 0% progress and scrolling up (exit to previous sections)
      if ((currentProgress >= 1 && e.deltaY > 0) || (currentProgress <= 0 && e.deltaY < 0)) {
        // Allow normal page scrolling
        return;
      }
      
      // Prevent default for custom scrolling
      e.preventDefault();
      
      // Accumulate scroll delta
      scrollAccumulator.current += e.deltaY;
      scrollAccumulator.current = Math.max(0, Math.min(TOTAL_SCROLL, scrollAccumulator.current));
      
      // Calculate overall progress (0 to 1)
      const progress = scrollAccumulator.current / TOTAL_SCROLL;
      setScrollProgress(progress);
      
      let offsetX = 0;
      let offsetY = 0;
      
      if (scrollAccumulator.current <= BUFFER_SCROLL) {
        // Buffer Stage: No movement, just center the first island
        offsetX = 0;
        offsetY = 0;
        
        // Only first island visible during buffer
        setIslandOpacity({
          island1: 1,
          island2: 0,
          island3: 0
        });
      } else if (scrollAccumulator.current <= BUFFER_SCROLL + MAX_SCROLL_STAGE_1) {
        // Stage 1: Horizontal movement to second island
        const stage1Progress = (scrollAccumulator.current - BUFFER_SCROLL) / MAX_SCROLL_STAGE_1;
        offsetX = stage1Progress * MAX_SCROLL_STAGE_1;
        offsetY = 0;
        
        // Show second island when we're halfway through stage 1
        setIslandOpacity({
          island1: 1,
          island2: stage1Progress > 0.5 ? Math.min((stage1Progress - 0.5) * 2, 1) : 0,
          island3: 0
        });
      } else {
        // Stage 2: Diagonal movement to third island
        const stage2Progress = (scrollAccumulator.current - BUFFER_SCROLL - MAX_SCROLL_STAGE_1) / MAX_SCROLL_STAGE_2;
        offsetX = MAX_SCROLL_STAGE_1 + (stage2Progress * 400); // Continue right
        offsetY = stage2Progress * 500; // Move down
        
        // Show third island when we're in stage 2
        setIslandOpacity({
          island1: 1,
          island2: 1,
          island3: stage2Progress > 0.3 ? Math.min((stage2Progress - 0.3) * 1.5, 1) : 0
        });
      }
      
      setDiagonalOffset({ x: offsetX, y: offsetY });
      
      // Update completion state based on progress
      if (progress >= 1) {
        setIsDiagonalScrollComplete(true);
      } else if (progress < 0.95) {
        setIsDiagonalScrollComplete(false);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isDiagonalScrollComplete]);


  return (
    <>
      {/* Galaxy Background - Fixed behind everything */}
      <div className="fixed inset-0 z-0">
        {/* Galactic Center - Bright core */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-[1200px] h-[800px] rounded-full opacity-30"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 200, 100, 0.8) 0%, rgba(255, 140, 60, 0.6) 20%, rgba(100, 50, 200, 0.4) 40%, rgba(50, 20, 100, 0.2) 60%, transparent 80%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%) rotate(-15deg)',
              filter: 'blur(40px)',
            }}
          />
          {/* Spiral arm gradients */}
          <div 
            className="absolute w-[1600px] h-[400px] rounded-full opacity-20"
            style={{
              background: 'linear-gradient(45deg, rgba(255, 180, 120, 0.6) 0%, rgba(150, 100, 255, 0.4) 30%, transparent 60%)',
              left: '30%',
              top: '40%',
              transform: 'rotate(25deg)',
              filter: 'blur(60px)',
            }}
          />
          <div 
            className="absolute w-[1400px] h-[300px] rounded-full opacity-15"
            style={{
              background: 'linear-gradient(-30deg, rgba(255, 160, 80, 0.5) 0%, rgba(120, 80, 255, 0.3) 40%, transparent 70%)',
              right: '25%',
              bottom: '35%',
              transform: 'rotate(-35deg)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {/* Dense white stars layer - main starfield */}
        <StarsBackground 
          starColor="#ffffff" 
          speed={40}
          factor={0.03}
          pointerEvents={false}
          className="brightness-140 contrast-120"
        />
        
        {/* Blue giant stars - distant and cool */}
        <div className="absolute inset-0 opacity-60">
          <StarsBackground 
            starColor="#87ceeb" 
            speed={60}
            factor={0.02}
            pointerEvents={false}
            className="brightness-130"
          />
        </div>
        
        {/* Orange/Red giant stars - warm stellar objects */}
        <div className="absolute inset-0 opacity-50">
          <StarsBackground 
            starColor="#ffaa00" 
            speed={80}
            factor={0.04}
            pointerEvents={false}
            className="brightness-120"
          />
        </div>
        
        {/* Cosmic dust and nebula particles */}
        <div className="absolute inset-0 opacity-25">
          <StarsBackground 
            starColor="#d8bfd8" 
            speed={100}
            factor={0.01}
            pointerEvents={false}
            className="brightness-110 blur-[1px]"
          />
        </div>
      </div>
      
      {/* Static Background Layer - Completely independent of scroll */}
      <div className="fixed inset-0 bg-[#0a0a0f]/30 pointer-events-none z-10">
        {/* Static Nebula Background Gradients */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255, 140, 0, 0.3) 0%, transparent 70%)',
            left: '20%',
            top: '10%',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255, 69, 0, 0.4) 0%, transparent 70%)',
            right: '15%',
            bottom: '20%',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute w-[1000px] h-[1000px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 165, 0, 0.2) 0%, transparent 60%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(100px)',
          }}
        />
      </div>


      {/* Scrollable Content Container */}
      <div className="relative w-full min-h-screen overflow-hidden z-20" ref={containerRef}>

      {/* Cosmic Scene Container - This moves diagonally */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${-diagonalOffset.x}px, ${-diagonalOffset.y}px)`,
          width: '300%',
          height: '300%',
        }}
      >
        {/* Enhanced Energy Streams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 140, 0, 0)" />
              <stop offset="30%" stopColor="rgba(255, 140, 0, 0.8)" />
              <stop offset="70%" stopColor="rgba(255, 165, 0, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 140, 0, 0)" />
            </linearGradient>
            <linearGradient id="energyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 69, 0, 0)" />
              <stop offset="40%" stopColor="rgba(255, 69, 0, 0.7)" />
              <stop offset="60%" stopColor="rgba(255, 100, 50, 0.5)" />
              <stop offset="100%" stopColor="rgba(255, 69, 0, 0)" />
            </linearGradient>
          </defs>
          
          {/* Flowing energy paths */}
          <path
            d="M 50vw 50vh Q 60vw 45vh 70vw 60vh T 120vw 110vh"
            stroke="url(#energyGradient)"
            strokeWidth="3"
            fill="none"
            opacity="0.7"
            style={{
              animation: 'energyFlow 8s infinite ease-in-out',
            }}
          />
          <path
            d="M 45vw 55vh Q 55vw 35vh 75vw 45vh T 125vw 115vh"
            stroke="url(#energyGradient2)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            style={{
              animation: 'energyFlow 10s infinite ease-in-out 2s',
            }}
          />
          <path
            d="M 55vw 45vh Q 65vw 65vh 85vw 40vh T 130vw 105vh"
            stroke="url(#energyGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
            style={{
              animation: 'energyFlow 12s infinite ease-in-out 4s',
            }}
          />
        </svg>

        {/* First Floating Island - Starts centered in viewport */}
        <div
          className="absolute"
          style={{
            left: '50vw',
            top: '50vh',
            transform: 'translate(-50%, -50%)',
            opacity: islandOpacity.island1,
            transition: 'opacity 0.5s ease-out',
          }}
        >
          <div 
            className="relative"
            style={{
              animation: 'floatIsland 6s infinite ease-in-out',
            }}
          >
            {/* Multi-layered Island Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 140, 0, 0.5) 0%, rgba(255, 165, 0, 0.3) 30%, transparent 60%)',
                filter: 'blur(60px)',
                transform: 'scale(1.4)',
                animation: 'pulseGlow 6s infinite ease-in-out',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 200, 0, 0.3) 0%, transparent 40%)',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
                animation: 'pulseGlow 8s infinite ease-in-out 1s',
              }}
            />
            

            {/* Orbiting Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400"
                style={{
                  left: '10%',
                  top: '30%',
                  boxShadow: '0 0 15px rgba(251, 146, 60, 0.8)',
                  animation: 'orbit1 12s infinite linear',
                  transformOrigin: '250px 100px',
                }}
              />
              <div 
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-400"
                style={{
                  right: '15%',
                  top: '60%',
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                  animation: 'orbit2 15s infinite linear reverse',
                  transformOrigin: '-200px -80px',
                }}
              />
            </div>

            {/* Island Image */}
            <div className="relative">
              <Image
                src="/island-website.png"
                alt="Floating Island 1"
                width={500}
                height={285}
                className="drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 40px 60px rgba(255, 140, 0, 0.3)) drop-shadow(0 0 20px rgba(255, 140, 0, 0.2))',
                }}
              />
            </div>

            {/* Floating Explore Button */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ animation: 'floatButton 4s infinite ease-in-out' }}
            >
              <button className="group relative px-4 py-2 bg-orange-500/80 text-white text-sm font-medium rounded-lg border border-orange-400/50 backdrop-blur-sm hover:bg-orange-500/90 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Explore Portfolio</span>
              </button>
            </div>

            {/* Island Label */}
            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 text-white text-xl font-light tracking-widest opacity-80">
              PORTFOLIO
            </div>
          </div>
        </div>

        {/* Second Floating Island - Positioned at end of stage 1 (horizontal right) */}
        <div
          className="absolute"
          style={{
            left: 'calc(50vw + 600px)', // Matches MAX_SCROLL_STAGE_1
            top: '50vh', // Same vertical level as first island
            transform: 'translate(-50%, -50%)',
            opacity: islandOpacity.island2,
            transition: 'opacity 1s ease-out',
          }}
        >
          <div 
            className="relative"
            style={{
              animation: 'floatIsland 7s infinite ease-in-out reverse',
            }}
          >
            {/* Multi-layered Island Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 69, 0, 0.6) 0%, rgba(255, 100, 50, 0.4) 30%, transparent 60%)',
                filter: 'blur(70px)',
                transform: 'scale(1.5)',
                animation: 'pulseGlow 7s infinite ease-in-out 2s',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 150, 100, 0.4) 0%, transparent 35%)',
                filter: 'blur(25px)',
                transform: 'scale(1.2)',
                animation: 'pulseGlow 9s infinite ease-in-out 3s',
              }}
            />
            

            {/* Orbiting Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-red-400 to-orange-400"
                style={{
                  left: '8%',
                  top: '25%',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.9)',
                  animation: 'orbit3 14s infinite linear',
                  transformOrigin: '260px 120px',
                }}
              />
              <div 
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-red-500"
                style={{
                  right: '12%',
                  top: '55%',
                  boxShadow: '0 0 12px rgba(234, 179, 8, 0.8)',
                  animation: 'orbit4 18s infinite linear reverse',
                  transformOrigin: '-220px -100px',
                }}
              />
              <div 
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-orange-300 to-pink-400"
                style={{
                  left: '75%',
                  top: '20%',
                  boxShadow: '0 0 8px rgba(251, 146, 60, 0.6)',
                  animation: 'orbit5 10s infinite linear',
                  transformOrigin: '-150px 150px',
                }}
              />
            </div>

            {/* Island Image */}
            <div className="relative">
              <Image
                src="/island-website.png"
                alt="Floating Island 2"
                width={500}
                height={285}
                className="drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 50px 80px rgba(255, 69, 0, 0.4)) hue-rotate(15deg) drop-shadow(0 0 25px rgba(255, 69, 0, 0.3))',
                }}
              />
            </div>

            {/* Floating Explore Button */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ animation: 'floatButton 5s infinite ease-in-out 2s' }}
            >
              <button className="group relative px-4 py-2 bg-red-500/80 text-white text-sm font-medium rounded-lg border border-red-400/50 backdrop-blur-sm hover:bg-red-500/90 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Explore Projects</span>
              </button>
            </div>

            {/* Island Label */}
            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 text-white text-xl font-light tracking-widest opacity-80">
              PROJECTS
            </div>
          </div>
        </div>

        {/* Third Floating Island - Positioned at end of stage 2 (down-right from stage 1) */}
        <div
          className="absolute"
          style={{
            left: 'calc(50vw + 1000px)', // 600px (stage 1) + 400px (stage 2)
            top: 'calc(50vh + 500px)', // 500px down from center
            transform: 'translate(-50%, -50%)',
            opacity: islandOpacity.island3,
            transition: 'opacity 1s ease-out',
          }}
        >
          <div 
            className="relative"
            style={{
              animation: 'floatIsland 8s infinite ease-in-out',
            }}
          >
            {/* Multi-layered Island Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(100, 200, 255, 0.5) 0%, rgba(50, 150, 255, 0.3) 30%, transparent 60%)',
                filter: 'blur(60px)',
                transform: 'scale(1.4)',
                animation: 'pulseGlow 8s infinite ease-in-out 1s',
              }}
            />
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(150, 220, 255, 0.3) 0%, transparent 40%)',
                filter: 'blur(20px)',
                transform: 'scale(1.1)',
                animation: 'pulseGlow 10s infinite ease-in-out 2s',
              }}
            />

            {/* Orbiting Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                style={{
                  left: '12%',
                  top: '35%',
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)',
                  animation: 'orbit1 16s infinite linear',
                  transformOrigin: '240px 90px',
                }}
              />
              <div 
                className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                style={{
                  right: '18%',
                  top: '65%',
                  boxShadow: '0 0 12px rgba(34, 211, 238, 0.7)',
                  animation: 'orbit2 20s infinite linear reverse',
                  transformOrigin: '-180px -70px',
                }}
              />
            </div>

            {/* Island Image */}
            <div className="relative">
              <Image
                src="/island-website.png"
                alt="Floating Island 3"
                width={500}
                height={285}
                className="drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 40px 60px rgba(59, 130, 246, 0.3)) hue-rotate(180deg) drop-shadow(0 0 20px rgba(59, 130, 246, 0.2))',
                }}
              />
            </div>

            {/* Floating Explore Button */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ animation: 'floatButton 6s infinite ease-in-out 3s' }}
            >
              <button className="group relative px-4 py-2 bg-blue-500/80 text-white text-sm font-medium rounded-lg border border-blue-400/50 backdrop-blur-sm hover:bg-blue-500/90 transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Explore Services</span>
              </button>
            </div>

            {/* Island Label */}
            <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 text-white text-xl font-light tracking-widest opacity-80">
              SERVICES
            </div>
          </div>
        </div>
      </div>




      <style jsx>{`
        @keyframes floatIsland {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(1deg);
          }
          50% {
            transform: translateY(0px) rotate(0deg);
          }
          75% {
            transform: translateY(-10px) rotate(-1deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes floatButton {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        @keyframes energyFlow {
          0%, 100% {
            stroke-dasharray: 0 100;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 50 50;
            stroke-dashoffset: -25;
          }
        }

        @keyframes orbit1 {
          0% {
            transform: rotate(0deg) translateX(250px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(250px) rotate(-360deg);
          }
        }

        @keyframes orbit2 {
          0% {
            transform: rotate(0deg) translateX(200px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(200px) rotate(-360deg);
          }
        }

        @keyframes orbit3 {
          0% {
            transform: rotate(0deg) translateX(260px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(260px) rotate(-360deg);
          }
        }

        @keyframes orbit4 {
          0% {
            transform: rotate(0deg) translateX(220px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(220px) rotate(-360deg);
          }
        }

        @keyframes orbit5 {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default FloatingIslands;
