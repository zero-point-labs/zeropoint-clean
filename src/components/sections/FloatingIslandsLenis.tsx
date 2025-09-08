'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { AuroraText } from '@/components/magicui/aurora-text';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { ShimmerButton } from '@/components/magicui/ShimmerButton';
import ShineBorder from '@/components/magicui/ShineBorder';
import { MinimalGrid } from '@/components/magicui/MinimalGrid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface IslandData {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  description: string;
  color: {
    primary: string;
    secondary: string;
    glow: string;
  };
}

const islandsData: IslandData[] = [
  {
    id: 'websites',
    title: 'Premium Websites',
    subtitle: 'Crafted to Perfection',
    buttonText: 'View Our Work',
    description: 'Every website we build is a masterpiece. Meticulously crafted with cutting-edge technology, stunning design, and flawless performance that exceeds expectations.',
    color: {
      primary: '#ff8c00',
      secondary: '#ffa500',
      glow: 'rgba(255, 140, 0, 0.6)',
    },
  },
  {
    id: 'webapps',
    title: 'Web Applications',
    subtitle: 'Built for Excellence',
    buttonText: 'Explore Solutions',
    description: 'Custom web applications engineered with precision. Each solution is tailored to solve unique challenges with innovative features and seamless user experiences.',
    color: {
      primary: '#ff4500',
      secondary: '#ff6347',
      glow: 'rgba(255, 69, 0, 0.6)',
    },
  },
  {
    id: 'realestate',
    title: 'Real Estate Platforms',
    subtitle: 'Property Showcases',
    buttonText: 'Explore Properties',
    description: 'Stunning real estate platforms that showcase properties beautifully. Advanced search, virtual tours, and lead generation systems that help agents close more deals.',
    color: {
      primary: '#1e90ff',
      secondary: '#87ceeb',
      glow: 'rgba(30, 144, 255, 0.6)',
    },
  },
];

const FloatingIslandsLenis: React.FC = () => {
  // Refs for space view
  const containerRef = useRef<HTMLDivElement>(null);
  const islandsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    
    if (!container || !background) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      
      // Background parallax animation
      gsap.to(background, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Island animations for each section
      islandsData.forEach((island, index) => {
        const element = islandsRef.current[island.id];
        if (!element) return;

        const islandImage = element.querySelector('.island-image');
        const islandContent = element.querySelector('.island-content');
        const islandGlow = element.querySelector('.island-glow');
        const orbitElements = element.querySelectorAll('.orbit-element');

        // Set initial states
        gsap.set(element, { opacity: 0, y: 100, scale: 0.8 });
        gsap.set(islandContent, { opacity: 0, y: 50 });

        // Main island entrance animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Floating animation
              gsap.to(islandImage, {
                y: "+=20",
                rotation: index % 2 === 0 ? 2 : -2,
                duration: 4 + index,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
              });

              // Glow pulse
              gsap.to(islandGlow, {
                scale: 1.1,
                opacity: 0.8,
                duration: 3 + index * 0.5,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
              });

              // Orbit animations
              orbitElements.forEach((orbit, orbitIndex) => {
                gsap.to(orbit, {
                  rotation: 360,
                  duration: 10 + orbitIndex * 3,
                  ease: "none",
                  repeat: -1,
                });
              });
            }
          }
        });

        tl.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        .to(islandContent, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");

        // Parallax effect for individual islands
        gsap.to(element, {
          yPercent: -20 * (index + 1),
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });

        // Content reveal on scroll
        if (islandContent) {
          gsap.fromTo(islandContent.querySelectorAll('.reveal-text'), 
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: islandContent,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative" style={{ minHeight: '800vh' }}>
      {/* Background Section */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          width: '100%',
          height: '800vh',
          minHeight: '800vh',
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(30, 144, 255, 0.04) 0%, transparent 65%),
            radial-gradient(ellipse at 70% 50%, rgba(147, 51, 234, 0.03) 0%, transparent 65%),
            radial-gradient(ellipse at 40% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 65%),
            linear-gradient(180deg, #000000 0%, #0a0a0f 20%, #050510 50%, #0a0a0f 80%, #000000 100%)
          `
        }}
      >
        {/* Distant Galaxies */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`galaxy-${i}`}
              className="absolute rounded-full opacity-30"
              style={{
                left: `${15 + (i * 25)}%`,
                top: `${20 + (i * 20)}%`,
                width: `${150 + Math.random() * 100}px`,
                height: `${80 + Math.random() * 60}px`,
                background: `radial-gradient(ellipse, rgba(${i % 2 === 0 ? '147, 51, 234' : '59, 130, 246'}, 0.6) 0%, rgba(${i % 2 === 0 ? '139, 92, 246' : '30, 144, 255'}, 0.3) 30%, transparent 70%)`,
                filter: 'blur(30px)',
                animation: `galaxyRotate ${40 + i * 20}s infinite linear`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        {/* Nebula Clouds */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`nebula-${i}`}
              className="absolute rounded-full opacity-15"
              style={{
                left: `${10 + (i * 20)}%`,
                top: `${30 + (i * 15)}%`,
                width: `${200 + i * 50}px`,
                height: `${100 + i * 30}px`,
                background: `radial-gradient(ellipse, rgba(${i % 3 === 0 ? '30, 144, 255' : i % 3 === 1 ? '147, 51, 234' : '139, 92, 246'}, 0.7) 0%, rgba(${i % 2 === 0 ? '59, 130, 246' : '147, 51, 234'}, 0.4) 40%, transparent 80%)`,
                filter: 'blur(50px)',
                animation: `nebulaDrift ${30 + i * 15}s infinite ease-in-out`,
                transform: `rotate(${i * 72}deg)`,
              }}
            />
          ))}
        </div>

        {/* Asteroid Field */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`asteroid-${i}`}
              className="absolute opacity-5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`,
                background: '#4a5568',
                borderRadius: `${Math.random() * 50}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `asteroidFloat ${20 + Math.random() * 40}s infinite linear`,
              }}
            />
          ))}
        </div>

        {/* Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
          <defs>
            <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
          
          {/* Create constellation patterns */}
          <path
            d="M 15% 20% L 25% 15% L 35% 25% L 45% 18%"
            stroke="url(#constellationGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3,6"
            opacity="0.6"
          />
          <path
            d="M 60% 30% L 70% 25% L 80% 35% L 85% 28%"
            stroke="url(#constellationGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3,6"
            opacity="0.5"
          />
          <path
            d="M 20% 60% L 30% 55% L 25% 70% L 35% 65%"
            stroke="url(#constellationGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3,6"
            opacity="0.6"
          />
          <path
            d="M 65% 70% L 75% 65% L 85% 75% L 80% 80%"
            stroke="url(#constellationGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3,6"
            opacity="0.5"
          />
        </svg>

        {/* Shooting Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`shooting-star-${i}`}
              className="absolute opacity-80"
              style={{
                left: `${-10 + Math.random() * 20}%`,
                top: `${Math.random() * 100}%`,
                width: '2px',
                height: '2px',
                background: 'white',
                borderRadius: '50%',
                boxShadow: '0 0 6px white, 0 0 12px rgba(255,255,255,0.8)',
                animation: `shootingStar ${3 + Math.random() * 4}s infinite ${Math.random() * 10}s`,
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
                  width: '60px',
                  height: '1px',
                  transform: 'translateX(-50px)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Pulsing Distant Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`pulse-star-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${3 + Math.random() * 4}px`,
                height: `${3 + Math.random() * 4}px`,
                background: `${i % 3 === 0 ? '#87ceeb' : i % 3 === 1 ? '#dda0dd' : '#ffffff'}`,
                boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
                animation: `pulseStar ${4 + Math.random() * 6}s infinite ease-in-out ${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Space Dust Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`space-dust-${i}`}
              className="absolute rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${0.5 + Math.random() * 1.5}px`,
                height: `${0.5 + Math.random() * 1.5}px`,
                background: `${Math.random() > 0.7 ? '#87ceeb' : '#ffffff'}`,
                animation: `spaceDust ${15 + Math.random() * 25}s infinite ease-in-out ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Solar Flares/Energy Waves */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`solar-flare-${i}`}
              className="absolute opacity-5"
              style={{
                left: `${i * 50}%`,
                top: `${20 + i * 40}%`,
                width: '200px',
                height: '100px',
                background: `radial-gradient(ellipse, rgba(${i === 0 ? '255, 140, 0' : '30, 144, 255'}, 0.8) 0%, rgba(${i === 0 ? '255, 165, 0' : '59, 130, 246'}, 0.4) 30%, transparent 70%)`,
                filter: 'blur(20px)',
                borderRadius: '50%',
                animation: `solarFlare ${20 + i * 10}s infinite ease-in-out ${i * 5}s`,
                transform: `rotate(${i * 45}deg)`,
              }}
            />
          ))}
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 180 }).map((_, i) => {
            const size = Math.random() > 0.9 ? 'w-1.5 h-1.5' : Math.random() > 0.7 ? 'w-1 h-1' : 'w-0.5 h-0.5';
            const opacity = Math.random() > 0.6 ? 'opacity-90' : Math.random() > 0.3 ? 'opacity-70' : 'opacity-50';
            const color = Math.random() > 0.8 ? 'bg-blue-200' : Math.random() > 0.6 ? 'bg-purple-200' : 'bg-white';
            return (
              <div
                key={i}
                className={`absolute ${size} ${color} rounded-full ${opacity}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 3}s`,
                  boxShadow: Math.random() > 0.7 ? `0 0 4px currentColor` : 'none',
                }}
              />
            );
          })}
        </div>
        
      </div>


      {/* Main Content Container */}
      <div 
        ref={containerRef}
        className="relative z-20 min-h-[800vh]"
      >
        {/* Hero Section - Complete Zero Point Redesign */}
        <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Hero Background Effects */}
          <div className="absolute inset-0 z-0">
            <MinimalGrid
              className="absolute inset-0"
              gridSize={60}
              strokeWidth={0.5}
              color="rgb(255, 140, 0)"
              opacity={0.08}
            />
          </div>

          {/* Main Hero Content */}
          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            {/* Zero Point Badge */}
            <div className="mb-8">
              <div className="inline-block relative">
                <div className="px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-orange-500/30 shadow-lg">
                  <AnimatedShinyText className="text-orange-400 font-semibold text-sm tracking-wider">
                    ⚡ ZERO POINT LABS ⚡
                  </AnimatedShinyText>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-sm -z-10" />
              </div>
            </div>

            {/* Main Title with Multiple Effects */}
            <div className="relative mb-6">
              <SparklesText
                colors={{ first: "#ff8c00", second: "#ff4500" }}
                sparklesCount={15}
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-none"
              >
                <AuroraText
                  colors={["#ff8c00", "#ff6b35", "#ff4500", "#ffa500", "#ff7f00"]}
                  speed={1.5}
                  className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                >
                  DIGITAL
                </AuroraText>
              </SparklesText>
              
              <div className="mt-2">
                <SparklesText
                  colors={{ first: "#ff4500", second: "#ff8c00" }}
                  sparklesCount={12}
                  className="text-5xl md:text-7xl lg:text-8xl font-black leading-none"
                >
                  <AuroraText
                    colors={["#ff4500", "#ff6b35", "#ff8c00", "#ffa500"]}
                    speed={1.2}
                    className="bg-gradient-to-r from-red-500 via-orange-500 to-orange-400 bg-clip-text text-transparent"
                  >
                    SOLUTIONS
                  </AuroraText>
                </SparklesText>
              </div>
            </div>

            {/* Subtitle with Shine Effect */}
            <div className="mb-12">
              <AnimatedShinyText className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
                Transforming ideas into powerful digital experiences
              </AnimatedShinyText>
            </div>

            {/* Enhanced Scroll Indicator */}
            <div className="flex flex-col items-center mt-8">
              <div className="text-orange-400 text-sm font-medium mb-6 tracking-wider opacity-80">
                SCROLL TO EXPLORE
              </div>
              <div className="relative">
                <div className="w-8 h-14 border-2 border-orange-500/40 rounded-full bg-black/20 backdrop-blur-sm flex justify-center relative overflow-hidden shadow-lg">
                  <div 
                    className="w-1.5 h-4 bg-gradient-to-b from-orange-400 to-red-500 rounded-full mt-3 shadow-lg"
                    style={{
                      animation: 'scrollBounce 2.5s infinite ease-in-out',
                      filter: 'drop-shadow(0 0 8px rgba(255, 140, 0, 0.6))'
                    }}
                  />
                </div>
                {/* Subtle pulsing glow effect */}
                <div 
                  className="absolute inset-0 rounded-full bg-orange-500/15 blur-md -z-10"
                  style={{
                    animation: 'pulse 3s infinite ease-in-out'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Floating Orange Orbs */}
          <div className="absolute inset-0 pointer-events-none z-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`hero-orb-${i}`}
                className="absolute rounded-full opacity-20"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${20 + (i * 8)}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  background: `radial-gradient(circle, ${i % 2 === 0 ? '#ff8c00' : '#ff4500'} 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                  animation: `heroOrbFloat ${15 + i * 3}s infinite ease-in-out ${i * 2}s`,
                }}
              />
            ))}
          </div>
        </section>

        {/* Islands Sections */}
        {islandsData.map((island, index) => (
          <section 
            key={island.id}
            className="min-h-screen flex items-center justify-center py-32"
          >
            <div 
              ref={(el) => {
                if (el) islandsRef.current[island.id] = el;
              }}
              className="relative w-full max-w-7xl mx-auto px-6 lg:px-8"
              style={{ marginTop: '8vh' }}
            >
              {/* Island Glow Effect */}
              <div 
                className="island-glow absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${island.color.glow} 0%, transparent 70%)`,
                  filter: 'blur(60px)',
                  transform: 'scale(1.5)',
                }}
              />

              <div className={`grid lg:grid-cols-2 gap-20 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Island Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Link 
                    href={`/${island.id}`}
                    className="island-image relative block group"
                  >
                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div 
                        className="orbit-element absolute w-4 h-4 rounded-full"
                        style={{
                          left: '10%',
                          top: '20%',
                          background: `linear-gradient(45deg, ${island.color.primary}, ${island.color.secondary})`,
                          boxShadow: `0 0 20px ${island.color.glow}`,
                          transformOrigin: '300px 200px',
                        }}
                      />
                      <div 
                        className="orbit-element absolute w-3 h-3 rounded-full"
                        style={{
                          right: '15%',
                          top: '60%',
                          background: `linear-gradient(45deg, ${island.color.secondary}, white)`,
                          boxShadow: `0 0 15px ${island.color.glow}`,
                          transformOrigin: '-250px -150px',
                        }}
                      />
                      <div 
                        className="orbit-element absolute w-2 h-2 rounded-full"
                        style={{
                          left: '70%',
                          top: '10%',
                          background: `linear-gradient(45deg, white, ${island.color.primary})`,
                          boxShadow: `0 0 10px ${island.color.glow}`,
                          transformOrigin: '-200px 250px',
                        }}
                      />
                    </div>

                    {/* Main Island */}
                    <div className="relative flex justify-center">
                      <Image
                        src={`/${island.id === 'websites' ? 'website-island.png' : island.id === 'webapps' ? 'webbapp-island-v3.png' : 'realestate-island.png'}`}
                        alt={`${island.title} Island`}
                        width={600}
                        height={340}
                        className="w-full max-w-md lg:max-w-lg transition-transform duration-300 group-hover:scale-105"
                        style={{
                          filter: `
                            drop-shadow(0 20px 40px ${island.color.glow})
                            drop-shadow(0 0 20px ${island.color.primary}50)
                            hue-rotate(${island.id === 'websites' ? '0deg' : island.id === 'webapps' ? '340deg' : '200deg'})
                          `,
                        }}
                      />
                    </div>
                  </Link>
                </div>

                {/* Island Content */}
                <div className={`island-content space-y-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  {/* Portfolio Badge */}
                  <div className="reveal-text mb-6">
                    <div className="inline-block relative">
                      <div className="px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-orange-500/30 shadow-lg">
                        <span className="text-orange-400 font-semibold text-sm tracking-wider">
                          PORTFOLIO SHOWCASE
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-sm -z-10" />
                    </div>
                  </div>

                  <div className="reveal-text">
                    <SparklesText
                      colors={{ first: island.color.primary, second: island.color.secondary }}
                      sparklesCount={4}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                    >
                      {island.title}
                    </SparklesText>
                    <p 
                      className="text-lg md:text-xl opacity-80 mb-8"
                      style={{ color: island.color.secondary }}
                    >
                      {island.subtitle}
                    </p>
                  </div>
                  
                  <div className="reveal-text">
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
                      {island.description}
                    </p>
                  </div>

                  {/* Key Benefits - Quality Focused */}
                  <div className="reveal-text">
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: island.color.primary }}
                        />
                        <span className="text-gray-300 text-sm">
                          {island.id === 'websites' ? 'Pixel-perfect design & code' : island.id === 'webapps' ? 'Advanced functionality & UX' : 'Virtual tours & galleries'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: island.color.primary }}
                        />
                        <span className="text-gray-300 text-sm">
                          {island.id === 'websites' ? 'Lightning-fast performance' : island.id === 'webapps' ? 'Scalable architecture' : 'Advanced search & filters'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: island.color.primary }}
                        />
                        <span className="text-gray-300 text-sm">
                          {island.id === 'websites' ? 'Mobile-first & SEO-ready' : island.id === 'webapps' ? 'Custom integrations' : 'Lead generation systems'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Success Metrics - Balanced */}
                  <div className="reveal-text">
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="text-center">
                        <SparklesText
                          colors={{ first: island.color.primary, second: island.color.secondary }}
                          sparklesCount={3}
                          className="text-2xl md:text-3xl font-bold mb-1"
                        >
                          {island.id === 'websites' ? '100%' : island.id === 'webapps' ? '100%' : '100%'}
                        </SparklesText>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          {island.id === 'websites' ? 'Client Satisfaction' : island.id === 'webapps' ? 'Success Rate' : 'Agent Satisfaction'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div 
                          className="text-2xl md:text-3xl font-bold mb-1"
                          style={{ color: island.color.primary }}
                        >
                          {island.id === 'websites' ? 'Premium' : island.id === 'webapps' ? 'Custom' : 'Luxury'}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          {island.id === 'websites' ? 'Quality Focus' : island.id === 'webapps' ? 'Solutions' : 'Properties'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div 
                          className="text-2xl md:text-3xl font-bold mb-1"
                          style={{ color: island.color.primary }}
                        >
                          {island.id === 'websites' ? '2-3' : island.id === 'webapps' ? '4-6' : '4-7'}
                        </div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">
                          {island.id === 'websites' ? 'Weeks Delivery' : island.id === 'webapps' ? 'Weeks Build' : 'Weeks Launch'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reveal-text">
                    <Link
                      href={`/${island.id}`}
                      className="group relative inline-block px-8 py-4 text-white font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      style={{
                        borderColor: island.color.primary,
                        background: `linear-gradient(45deg, ${island.color.primary}30, ${island.color.secondary}30)`,
                        backdropFilter: 'blur(10px)',
                      }}
                    >
                      <span className="relative z-10">{island.buttonText}</span>
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${island.color.glow}, transparent 70%)`,
                          filter: 'blur(10px)',
                        }}
                      />
                    </Link>
                  </div>

                  {/* Progress Indicator */}
                  <div className="reveal-text flex items-center space-x-4 pt-6">
                    <span className="text-sm font-mono text-gray-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 h-0.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000 rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${island.color.primary}, ${island.color.secondary})`,
                          width: `${((index + 1) / islandsData.length) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-mono text-gray-400">
                      {String(islandsData.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Final Section */}
        <section className="h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Build?
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Let's bring your digital vision to life with our expertise in websites, 
              web applications, and e-commerce solutions.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300">
              Start Your Project
            </button>
          </div>
        </section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5); 
          }
        }

        @keyframes galaxyRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes nebulaDrift {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg); 
          }
          50% { 
            transform: translateY(-10px) translateX(20px) rotate(180deg); 
          }
          75% { 
            transform: translateY(10px) translateX(5px) rotate(270deg); 
          }
        }

        @keyframes asteroidFloat {
          0% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
          }
          100% { 
            transform: translateY(-100vh) translateX(20px) rotate(360deg); 
          }
        }

        @keyframes shootingStar {
          0% { 
            transform: translateX(-100px) translateY(0px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translateX(-50px) translateY(-10px) scale(1);
          }
          90% {
            opacity: 1;
            transform: translateX(100vw) translateY(-50px) scale(1);
          }
          100% { 
            transform: translateX(120vw) translateY(-60px) scale(0);
            opacity: 0;
          }
        }

        @keyframes pulseStar {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.5);
            opacity: 1;
          }
        }

        @keyframes spaceDust {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-10px) translateX(5px);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-5px) translateX(10px);
            opacity: 0.4;
          }
          75% { 
            transform: translateY(5px) translateX(5px);
            opacity: 0.5;
          }
        }

        @keyframes solarFlare {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            opacity: 0.05;
          }
          25% { 
            transform: scale(1.2) rotate(90deg);
            opacity: 0.08;
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            opacity: 0.06;
          }
          75% { 
            transform: scale(1.3) rotate(270deg);
            opacity: 0.07;
          }
        }

        @keyframes heroOrbFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.2;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-10px) translateX(20px) scale(1.05);
            opacity: 0.25;
          }
          75% { 
            transform: translateY(5px) translateX(5px) scale(1.15);
            opacity: 0.35;
          }
        }

        @keyframes scrollBounce {
          0%, 100% { 
            transform: translateY(0px);
            opacity: 1;
          }
          50% { 
            transform: translateY(8px);
            opacity: 0.6;
          }
        }

        @keyframes lavaFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) translateX(20px);
            opacity: 0.7;
          }
          75% { 
            transform: translateY(5px) translateX(5px);
            opacity: 0.9;
          }
        }

        @keyframes techFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.7;
          }
          25% { 
            transform: translateY(-15px) translateX(8px) scale(1.2);
            opacity: 0.9;
          }
          50% { 
            transform: translateY(-8px) translateX(15px) scale(1.1);
            opacity: 0.8;
          }
          75% { 
            transform: translateY(3px) translateX(3px) scale(1.3);
            opacity: 1;
          }
        }

        @keyframes waterFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.6;
          }
          25% { 
            transform: translateY(-12px) translateX(6px) scale(1.1);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-6px) translateX(12px) scale(1.05);
            opacity: 0.7;
          }
          75% { 
            transform: translateY(2px) translateX(2px) scale(1.15);
            opacity: 0.9;
          }
        }

        /* Line clamp utility */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          @keyframes galaxyRotate {
            0%, 100% { transform: rotate(0deg); }
          }
          @keyframes nebulaDrift {
            0%, 100% { transform: translateY(0px) translateX(0px); }
          }
          @keyframes asteroidFloat {
            0%, 100% { transform: translateY(0px) translateX(0px); }
          }
          @keyframes shootingStar {
            0%, 100% { opacity: 0; }
          }
          @keyframes pulseStar {
            0%, 100% { opacity: 0.6; }
          }
          @keyframes spaceDust {
            0%, 100% { opacity: 0.3; }
          }
          @keyframes solarFlare {
            0%, 100% { opacity: 0.05; }
          }
          @keyframes heroOrbFloat {
            0%, 100% { opacity: 0.2; }
          }
          @keyframes scrollBounce {
            0%, 100% { opacity: 1; }
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingIslandsLenis;
