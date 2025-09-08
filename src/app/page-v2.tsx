'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Briefcase, 
  Sparkles,
  CheckCircle,
  Sun,
  Moon,
  ChevronDown,
  Palette,
  Code,
  Rocket
} from "lucide-react";
import { WordRotate } from "@/components/magicui/WordRotate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { MinimalGrid } from '@/components/magicui/MinimalGrid';
import { useTheme } from "@/lib/theme-context";
import AboutSection from "@/components/sections/AboutSection";
import PricingSection from "@/components/sections/PricingSection";
import ChatSection from "@/components/sections/ChatSection";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
  {
    icon: Palette,
    title: "Design",
    description: "We create stunning, user-focused designs tailored to your brand and goals.",
    step: "01",
  },
  {
    icon: Code,
    title: "Develop", 
    description: "Our expert developers bring your design to life with clean, efficient code.",
    step: "02",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "We launch your website and ensure everything runs smoothly from day one.",
    step: "03",
  },
];

export default function HomeV2() {
  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;
    const background = backgroundRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
const badge = badgeRef.current;
    const buttons = buttonsRef.current;
    const features = featuresRef.current;
    const process = processRef.current;
    const sections = sectionsRef.current;
    
    if (!container || !hero || !background) return;

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      
      // Set initial states
      gsap.set([title, subtitle, badge, buttons, features], { opacity: 0, y: 50 });
      
      // Background parallax animation
      gsap.to(background, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Hero entrance animations with scroll trigger
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        }
      });

      // Staggered entrance animations
      heroTl
        .to(badge, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .to(title, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.4")
        .to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .to(features, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4")
        .to(buttons, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");

      // Title parallax effect
      if (title) {
        gsap.to(title, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Process section animations
      if (process) {
        const processCards = process.querySelectorAll('.process-card');
        
        gsap.fromTo(processCards, 
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: process,
              start: "top 70%",
              end: "bottom 30%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Individual card hover effects
        processCards.forEach((card, index) => {
          const icon = card.querySelector('.process-icon');
          const content = card.querySelector('.process-content');
          
          gsap.set(card, {
            transformOrigin: "center center"
          });

          // Floating animation
          gsap.to(card, {
            y: "+=10",
            duration: 3 + index * 0.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Icon rotation on scroll
          if (icon) {
            gsap.to(icon, {
              rotation: 360,
              duration: 8 + index * 2,
              ease: "none",
              repeat: -1,
            });
          }
        });
      }

      // Sections parallax
      if (sections) {
        gsap.to(sections, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sections,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Floating orbs animation
      const orbs = container.querySelectorAll('.floating-orb');
      orbs.forEach((orb, index) => {
        gsap.to(orb, {
          y: "+=30",
          x: "+=20",
          rotation: 360,
          duration: 8 + index * 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // Theme toggle animation
      const themeButton = container.querySelector('.theme-toggle');
      if (themeButton) {
        gsap.set(themeButton, { opacity: 0, scale: 0.8 });
        gsap.to(themeButton, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: 2
        });
      }

    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative" style={{ minHeight: '400vh' }}>
      {/* Background Section with Space Theme */}
      <div 
        ref={backgroundRef}
        className="fixed inset-0 z-0"
        style={{
          background: theme === 'light' 
            ? `
              radial-gradient(ellipse at 30% 20%, rgba(255, 165, 0, 0.06) 0%, transparent 65%),
              radial-gradient(ellipse at 70% 50%, rgba(255, 140, 0, 0.04) 0%, transparent 65%),
              radial-gradient(ellipse at 40% 80%, rgba(251, 146, 60, 0.05) 0%, transparent 65%),
              linear-gradient(180deg, #fafafa 0%, #f5f5f5 20%, #f0f0f0 50%, #f5f5f5 80%, #fafafa 100%)
            `
            : `
              radial-gradient(ellipse at 30% 20%, rgba(255, 140, 0, 0.04) 0%, transparent 65%),
              radial-gradient(ellipse at 70% 50%, rgba(147, 51, 234, 0.03) 0%, transparent 65%),
              radial-gradient(ellipse at 40% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 65%),
              linear-gradient(180deg, #000000 0%, #0a0a0f 20%, #050510 50%, #0a0a0f 80%, #000000 100%)
            `
        }}
      >
        {/* Animated Grid */}
        <MinimalGrid
          className="absolute inset-0"
          gridSize={60}
          strokeWidth={0.5}
          color={theme === 'light' ? 'rgb(255, 165, 0)' : 'rgb(255, 140, 0)'}
          opacity={theme === 'light' ? 0.06 : 0.08}
        />

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`floating-orb-${i}`}
              className="floating-orb absolute rounded-full opacity-20"
              style={{
                left: `${15 + (i * 15)}%`,
                top: `${20 + (i * 12)}%`,
                width: `${30 + Math.random() * 50}px`,
                height: `${30 + Math.random() * 50}px`,
                background: `radial-gradient(circle, ${theme === 'light' ? '#ff8c00' : '#ff8c00'} 0%, transparent 70%)`,
                filter: 'blur(15px)',
              }}
            />
          ))}
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => {
            const size = Math.random() > 0.8 ? 'w-1 h-1' : 'w-0.5 h-0.5';
            const opacity = Math.random() > 0.5 ? 'opacity-60' : 'opacity-30';
            return (
              <div
                key={i}
                className={`absolute ${size} ${theme === 'light' ? 'bg-orange-300' : 'bg-white'} rounded-full ${opacity}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 3}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content Container */}
      <div 
        ref={containerRef}
        className="relative z-20 min-h-[400vh]"
      >
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20 md:py-24 overflow-hidden ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}
        >
          <div className="container mx-auto max-w-4xl text-center space-y-8 md:space-y-12">
            
            {/* Badge */}
            <div ref={badgeRef} className="flex items-center justify-center gap-3">
              <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500/60 shadow-lg flex items-center justify-center ${
                theme === 'light' 
                  ? 'bg-orange-50/80 shadow-orange-200/60' 
                  : 'bg-orange-950/60 shadow-orange-900/60'
              }`}>
                <span 
                  className="text-2xl leading-none"
                  style={{
                    fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Android Emoji", "EmojiSymbols", "EmojiOne Mozilla", "Twemoji Mozilla", "Segoe UI Symbol", "Noto Emoji", emoji',
                    fontSize: '24px',
                    lineHeight: '1',
                    display: 'inline-block'
                  }}
                >
                  🇨🇾
                </span>
              </div>
              <Badge
                variant="outline"
                className={`border-orange-500/70 text-orange-400 px-5 py-2 text-sm font-semibold rounded-full shadow-md ${
                  theme === 'light' 
                    ? 'bg-orange-50/80 shadow-orange-200/60' 
                    : 'bg-orange-950/60 shadow-orange-900/60'
                }`}
              >
                <AnimatedShinyText className="text-orange-400">
                  Cyprus Web Agency ✨
                </AnimatedShinyText>
              </Badge>
            </div>

            {/* Main Title */}
            <div
              ref={titleRef}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight !leading-tight"
            >
              <div className={`mb-2 md:mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-slate-50'}`}>
                We Craft
              </div>
              <WordRotate
                words={[
                  <AuroraText key="word1" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Beautiful Websites</AuroraText>,
                  <AuroraText key="word2" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Digital Experiences</AuroraText>,
                  <AuroraText key="word3" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>E-commerce Stores</AuroraText>,
                  <AuroraText key="word4" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Landing Pages</AuroraText>,
                  <AuroraText key="word5" className="text-orange-500 block" colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]} speed={1.5}>Web Applications</AuroraText>,
                ]}
                duration={2500}
                motionProps={{
                  initial: { opacity: 0, y: 30, scale: 0.9 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: { opacity: 0, y: -30, scale: 0.9 },
                  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                }}
              />
              <div className={`mt-2 md:mt-4 flex items-baseline justify-center ${theme === 'light' ? 'text-slate-900' : 'text-slate-50'}`}>
                <span>That&nbsp;</span>
                <SparklesText 
                  as={<span />}
                  className={`text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}
                  colors={{ first: "#FDBA74", second: "#F97316" }}
                  sparklesCount={1}
                >
                  Convert
                </SparklesText>
              </div>
            </div>

            {/* Subtitle */}
            <div ref={subtitleRef} className="space-y-4">
              <p className={`max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed mx-auto ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300/90'
              }`}>
                Transform your ideas into <span className="font-semibold text-orange-500">high-converting websites</span> that drive real results.
              </p>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>Design to Deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>SEO Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className={theme === 'light' ? 'text-slate-700' : 'text-slate-300'}>AI-Powered Features</span>
              </div>
            </div>
            
            {/* Theme Toggle */}
            <div className="theme-toggle flex flex-col items-center gap-3 pt-2">
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Sun className="w-3 h-3" />
                  <span className="text-xs font-medium">Light</span>
                </div>
                <div className={`w-px h-3 ${theme === 'light' ? 'bg-slate-300' : 'bg-slate-600'}`} />
                <div className={`flex items-center gap-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                  <Moon className="w-3 h-3" />
                  <span className="text-xs font-medium">Dark</span>
                </div>
              </div>
              
              <button
                onClick={toggleTheme}
                className={`group relative flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  theme === 'light' 
                    ? 'bg-orange-50/80 border-orange-300/60 text-slate-700 hover:border-orange-400/80 hover:bg-orange-100/80' 
                    : 'bg-orange-950/60 border-orange-600/60 text-slate-300 hover:border-orange-500/80 hover:bg-orange-900/60'
                } shadow-md hover:shadow-lg backdrop-blur-sm hover:scale-105`}
              >
                <div className="flex items-center gap-2">
                  {theme === 'light' ? (
                    <>
                      <div className="relative">
                        <Sun className="w-4 h-4 text-orange-500" />
                      </div>
                      <span>Switch to Dark</span>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <Moon className="w-4 h-4 text-blue-400" />
                      </div>
                      <span>Switch to Light</span>
                    </>
                  )}
                </div>
              </button>
            </div>
            
            {/* Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-4 pt-8"
            >
              <Link href="/start-project">
                <Button
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-5 px-10 text-base shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:-translate-y-0.5 border-0 rounded-xl"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                  <span className="flex items-center relative z-10 gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Get Your Website Built
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  size="lg"
                  variant="outline"
                  className={`group relative font-semibold py-5 px-10 text-base shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:-translate-y-0.5 rounded-xl border-2 ${
                    theme === 'light'
                      ? 'text-slate-700 border-slate-300 hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-orange-700 shadow-slate-200/40 hover:shadow-orange-500/30'
                      : 'text-slate-300 border-slate-600 hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-950/30 hover:to-orange-900/30 hover:text-orange-400 shadow-black/20 hover:shadow-orange-500/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                    View Our Work
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="pt-8 md:pt-12">
              <div className={`flex flex-col items-center gap-2 ${
                theme === 'light' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <span className="text-xs font-medium uppercase tracking-wider">Explore More</span>
                <ChevronDown className="w-5 h-5 animate-bounce" />
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section 
          ref={processRef}
          className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20 ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}
        >
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8 md:mb-12">
              <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-slate-100'}`}>
                Our <span className="text-orange-500">Process</span>
              </h2>
              <p className={`text-lg md:text-xl max-w-2xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                From concept to launch in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`process-card relative flex flex-col items-center text-center p-6 md:p-8 rounded-xl border backdrop-blur-md transition-all duration-500 overflow-hidden h-[280px] md:h-[320px] ${
                    theme === 'light'
                      ? 'border-slate-300/50 bg-white/80 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20'
                      : 'border-neutral-700/50 bg-neutral-800/30 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20'
                  }`}
                >
                  <div className="flex-shrink-0 relative z-10 mb-4">
                    <div className={`process-icon w-16 h-16 md:w-20 md:h-20 rounded-xl border flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                      theme === 'light'
                        ? 'bg-slate-100/80 border-slate-300/50'
                        : 'bg-neutral-700/50 border-neutral-600/50'
                    }`}>
                      <step.icon className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${
                        theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      theme === 'light' ? 'bg-slate-200 text-slate-600' : 'bg-neutral-700 text-slate-400'
                    }`}>
                      {step.step}
                    </div>
                  </div>

                  <div className="process-content flex-1 flex flex-col justify-center relative z-10">
                    <h3 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${
                      theme === 'light' ? 'text-slate-900' : 'text-slate-100'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <div ref={sectionsRef}>
          <AboutSection />
          <PricingSection />
          <ChatSection />
        </div>
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

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
