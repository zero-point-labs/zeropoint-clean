'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Lenis from 'lenis';
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
  MapPin,
  Github,
  Linkedin,
  Twitter,
  MessageCircle
} from "lucide-react";
import { WordRotate } from "@/components/magicui/WordRotate";
import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { MinimalGrid } from '@/components/magicui/MinimalGrid';
import ChatbotSection from "@/components/sections/ChatbotSection";
import { useTheme } from "@/lib/theme-context";
import { Download, Globe } from "lucide-react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Image from 'next/image';
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle, 
  NavbarLogo, 
  NavbarButton 
} from "@/components/ui/resizable-navbar";
import { useState } from 'react';

// GSAP plugins will be registered in useEffect to avoid hydration issues

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

export default function Home() {
  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Mobile nav state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { theme, toggleTheme } = useTheme();

  // Navigation items
  const navItems = [
    { name: "Services", link: "/services" },
    { name: "Portfolio", link: "/portfolio" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    // Register GSAP plugins on client side only
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const container = containerRef.current;
    const hero = heroRef.current;
    const background = backgroundRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const badge = badgeRef.current;
    const buttons = buttonsRef.current;
    const features = featuresRef.current;
    const portfolio = portfolioRef.current;
    const cta = ctaRef.current;
    
    if (!container || !hero || !background) {
      // Cleanup Lenis if initialization fails
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      return;
    }

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      
      // Background parallax animation - subtle movement for better effect
      gsap.to(background, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Hero section advanced animations
      if (hero) {
        // Set initial states - only if elements exist
        const heroElements = [badge, title, subtitle, features, buttons].filter(Boolean);
        if (heroElements.length > 0) {
          gsap.set(heroElements, { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        });
        }

        // Hero entrance timeline
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Start continuous animations after entrance
              
              // Floating orbs animation
              const orbs = container.querySelectorAll('.floating-orb');
              orbs.forEach((orb, index) => {
                gsap.to(orb, {
                  y: "+=40",
                  x: "+=25",
                  rotation: 360,
                  duration: 10 + index * 3,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              });

              // Theme toggle entrance animation
              const themeButton = container.querySelector('.theme-toggle');
              if (themeButton) {
                gsap.set(themeButton, { opacity: 0, scale: 0.8 });
                gsap.to(themeButton, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: "back.out(1.7)",
                  delay: 2.5
                });
              }
            }
          }
        });

        // Staggered entrance animations with better timing
        if (badge) {
          heroTl.to(badge, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
        if (title) {
          heroTl.to(title, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out"
          }, "-=0.8");
        }
        if (subtitle) {
          heroTl.to(subtitle, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out"
          }, "-=0.9");
        }
        if (features) {
          heroTl.to(features, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.7");
        }
        if (buttons) {
          heroTl.to(buttons, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.6");
        }

        // Individual element parallax effects
        if (title) {
          gsap.to(title, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: title,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }

        if (subtitle) {
          gsap.to(subtitle, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: subtitle,
              start: "top bottom", 
              end: "bottom top",
              scrub: true
            }
          });
        }
      }


      // Portfolio section advanced animations
      if (portfolio) {
        const portfolioTitle = portfolio.querySelector('.portfolio-title');
        const portfolioCards = portfolio.querySelectorAll('.portfolio-island');
        
        // Set initial states - only if elements exist
        if (portfolioTitle) {
        gsap.set(portfolioTitle, { opacity: 0, y: 100, scale: 0.8 });
        }
        if (portfolioCards.length > 0) {
        gsap.set(portfolioCards, { opacity: 0, y: 100, scale: 0.8 });
        }

        // Portfolio title animation
        if (portfolioTitle) {
          const titleTl = gsap.timeline({
            scrollTrigger: {
              trigger: portfolioTitle,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse"
            }
          });

          titleTl.to(portfolioTitle, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          });

          // Title parallax
          gsap.to(portfolioTitle, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: portfolioTitle,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }

        // Individual island animations (like FloatingIslandsLenis) - Enhanced with Repeatable Animations
        portfolioCards.forEach((card, index) => {
          const islandImage = card.querySelector('.island-image');
          const islandContent = card.querySelector('.island-content');
          const islandGlow = card.querySelector('.island-glow');
          const orbitElements = card.querySelectorAll('.orbit-element');

          // Set initial states for content
          if (islandContent) {
            gsap.set(islandContent, { opacity: 0, y: 50 });
          }

          // Main island entrance animation with repeatable triggers
          const islandTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                // Start continuous animations after entrance
                
                // Floating animation
                if (islandImage) {
                  gsap.to(islandImage, {
                    y: "+=20",
                    rotation: index % 2 === 0 ? 2 : -2,
                    duration: 4 + index,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                  });
                }

                // Glow pulse
                if (islandGlow) {
                  gsap.to(islandGlow, {
                    scale: 1.1,
                    opacity: 0.8,
                    duration: 3 + index * 0.5,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                  });
                }

                // Orbit animations
                orbitElements.forEach((orbit, orbitIndex) => {
                  gsap.to(orbit, {
                    rotation: 360,
                    duration: 10 + orbitIndex * 3,
                    ease: "none",
                    repeat: -1,
                  });
                });
              },
              onLeave: () => {
                // Kill animations when leaving viewport
                gsap.killTweensOf([islandImage, islandGlow, ...orbitElements].filter(Boolean));
              },
              onEnterBack: () => {
                // Restart animations when scrolling back up
                if (islandImage) {
                  gsap.to(islandImage, {
                    y: "+=20",
                    rotation: index % 2 === 0 ? 2 : -2,
                    duration: 4 + index,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                  });
                }

                if (islandGlow) {
                  gsap.to(islandGlow, {
                    scale: 1.1,
                    opacity: 0.8,
                    duration: 3 + index * 0.5,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                  });
                }

                orbitElements.forEach((orbit, orbitIndex) => {
                  gsap.to(orbit, {
                    rotation: 360,
                    duration: 10 + orbitIndex * 3,
                    ease: "none",
                    repeat: -1,
                  });
                });
              },
              onLeaveBack: () => {
                // Kill animations when scrolling up past section
                gsap.killTweensOf([islandImage, islandGlow, ...orbitElements].filter(Boolean));
              }
            }
          });

          // Staggered entrance
          islandTl
            .to(card, {
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

          // Individual island parallax
          gsap.to(card, {
            yPercent: -20 * (index + 1),
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });

          // Content reveal on scroll - Enhanced with repeatable behavior
          if (islandContent) {
            const revealElements = islandContent.querySelectorAll('.reveal-text');
            if (revealElements.length > 0) {
              gsap.fromTo(revealElements, 
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: islandContent,
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play reverse play reverse" // This makes it repeat on scroll
                  }
                }
              );
            }
          }
        });
      }

      // CTA Section advanced animations
      if (cta) {
        const ctaTitle = cta.querySelector('.cta-title');
        const ctaHub = cta.querySelector('.cta-hub');
        const ctaOrbs = cta.querySelectorAll('.cta-orb');
        const ctaServices = cta.querySelectorAll('.cta-service');
        
        // Set initial states - only if elements exist
        const ctaElements = [ctaTitle, ctaHub].filter(Boolean);
        if (ctaElements.length > 0) {
          gsap.set(ctaElements, { opacity: 0, y: 100, scale: 0.8 });
        }
        if (ctaOrbs.length > 0) {
        gsap.set(ctaOrbs, { opacity: 0, scale: 0 });
        }
        if (ctaServices.length > 0) {
        gsap.set(ctaServices, { opacity: 0, scale: 0.5, rotation: 180 });
        }

        // CTA section timeline
        const ctaTl = gsap.timeline({
          scrollTrigger: {
            trigger: cta,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Start continuous animations after entrance
              
              // Hub floating animation - reduced rotation on mobile
              if (ctaHub) {
                const isMobile = window.innerWidth < 768;
                gsap.to(ctaHub, {
                  y: "+=25",
                  rotation: isMobile ? 1 : 3, // Much less rotation on mobile
                  duration: 8,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              }

              // Orbiting services
              ctaServices.forEach((service, index) => {
                gsap.to(service, {
                  rotation: 360,
                  duration: 20 + index * 5,
                  ease: "none",
                  repeat: -1,
                });
              });

              // Floating orbs
              ctaOrbs.forEach((orb, index) => {
                gsap.to(orb, {
                  y: "+=30",
                  x: "+=20",
                  duration: 6 + index * 2,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              });
            }
          }
        });

        // Staggered entrance
        if (ctaTitle) {
          ctaTl.to(ctaTitle, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
        if (ctaHub) {
          ctaTl.to(ctaHub, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out"
          }, "-=0.6");
        }
        if (ctaOrbs.length > 0) {
          ctaTl.to(ctaOrbs, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)"
          }, "-=0.8");
        }
        if (ctaServices.length > 0) {
          ctaTl.to(ctaServices, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)"
          }, "-=0.6");
        }

        // Individual parallax for CTA elements
        if (ctaTitle) {
          gsap.to(ctaTitle, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: ctaTitle,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }

        if (ctaHub) {
          gsap.to(ctaHub, {
            yPercent: -25,
            ease: "none",
            scrollTrigger: {
              trigger: ctaHub,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }

        // Content reveal on scroll
        const revealElements = cta.querySelectorAll('.reveal-on-scroll');
        if (revealElements.length > 0) {
          gsap.fromTo(revealElements, 
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cta,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }

    }, container);

    // Cleanup function
    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative" style={{ minHeight: '800vh' }}>
      
      {/* Enhanced Resizable Navbar with Zero Point Aesthetics */}
      <Navbar className="fixed top-0 z-50">
        {/* Desktop Navbar */}
        <NavBody>
          {/* Logo with Glow Effect */}
          <div className="relative z-20 flex items-center space-x-2 group">
            <div className="absolute inset-0 bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
            <Image
              src="/new-zeropoint-labs-logo.png"
              alt="Zero Point Labs"
              width={140}
              height={45}
              className="h-8 w-auto relative z-10 transition-all duration-300 group-hover:brightness-110"
            />
          </div>
          
          {/* Enhanced Navigation Items */}
          <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex">
            {navItems.map((item, idx) => (
              <Link
                key={`nav-${idx}`}
                href={item.link}
                className={`relative px-6 py-3 rounded-full transition-all duration-300 group ${
                  theme === 'light'
                    ? 'text-slate-700 hover:text-orange-600 hover:bg-orange-50/80'
                    : 'text-slate-300 hover:text-orange-400 hover:bg-orange-950/30'
                } backdrop-blur-sm`}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-orange-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                {/* Border beam on hover */}
                <div className="absolute inset-0 rounded-full border border-orange-500/0 group-hover:border-orange-500/30 transition-all duration-300" />
              </Link>
            ))}
          </div>
          
          {/* Enhanced Right Side */}
          <div className="flex items-center">
            {/* Enhanced Contact Button */}
            <Link href="/contact">
              <button className="relative px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 group overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Contact Us
                </span>
              </button>
            </Link>
          </div>
        </NavBody>
        
        {/* Enhanced Mobile Navbar */}
        <MobileNav>
          <MobileNavHeader>
            {/* Mobile Logo with Glow */}
            <div className="flex items-center space-x-2 group">
              <div className="absolute inset-0 bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              <Image
                src="/new-zeropoint-labs-logo.png"
                alt="Zero Point Labs"
                width={120}
                height={38}
                className="h-7 w-auto relative z-10"
              />
            </div>
            
            {/* Enhanced Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-2 rounded-lg transition-all duration-300 group ${
                theme === 'light'
                  ? 'text-slate-600 hover:text-orange-500 hover:bg-orange-50'
                  : 'text-slate-300 hover:text-orange-400 hover:bg-orange-950/30'
              }`}
            >
              <div className="absolute inset-0 bg-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isMobileMenuOpen ? (
                <IconX className="w-5 h-5 relative z-10" />
              ) : (
                <IconMenu2 className="w-5 h-5 relative z-10" />
              )}
            </button>
          </MobileNavHeader>
          
          {/* Enhanced Mobile Menu */}
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <div className="space-y-6 p-6">
              {navItems.map((item, index) => (
                <Link 
                  key={item.name}
                  href={item.link} 
                  className={`block py-3 px-4 text-lg font-medium transition-all duration-300 rounded-lg group relative ${
                    theme === 'light' 
                      ? 'text-slate-700 hover:text-orange-600 hover:bg-orange-50' 
                      : 'text-slate-300 hover:text-orange-400 hover:bg-orange-950/30'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {item.name}
                  </span>
                </Link>
              ))}
              
              {/* Mobile Contact Button */}
              <div className="pt-4 border-t border-orange-500/20">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full relative px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 group overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Contact Us
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Background Section with Space Theme - Parallax */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0"
        style={{
          width: '100%',
          height: '150%', // Much more extra height to prevent cutoff
          minHeight: 'calc(800vh + 150vh)', // Very generous extra coverage for parallax + future sections
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
                width: `${30 + (i * 8)}px`,
                height: `${30 + (i * 8)}px`,
                background: `radial-gradient(circle, ${theme === 'light' ? '#ff8c00' : '#ff8c00'} 0%, transparent 70%)`,
                filter: 'blur(15px)',
              }}
            />
          ))}
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => {
            const size = i % 5 === 0 ? 'w-1 h-1' : 'w-0.5 h-0.5';
            const opacity = i % 2 === 0 ? 'opacity-60' : 'opacity-30';
            return (
              <div
                key={i}
                className={`absolute ${size} ${theme === 'light' ? 'bg-orange-300' : 'bg-white'} rounded-full ${opacity}`}
                style={{
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 17) % 100}%`,
                  animation: `twinkle ${2 + (i % 4)}s infinite ${(i % 3)}s`,
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
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden ${
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

        {/* Portfolio Section */}
        <section 
          ref={portfolioRef}
          className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-20 lg:py-32 overflow-hidden ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Portfolio Title */}
            <div className="portfolio-title text-center mb-12 md:mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
                <SparklesText 
                  colors={{ first: "#F97316", second: "#EA580C" }}
                  sparklesCount={8}
                >
                  Our Portfolio
                </SparklesText>
              </h2>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed ${
                theme === 'light' ? 'text-slate-600' : 'text-gray-300'
              }`}>
                Explore our diverse range of digital solutions, from stunning websites to powerful web applications
              </p>
            </div>

            {/* Islands Grid */}
            <div className="space-y-32">
              {islandsData.map((island, index) => (
                <div 
                  key={island.id}
                  className="portfolio-island relative"
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
                          <div className={`px-4 py-2 rounded-full border shadow-lg ${
                            theme === 'light' 
                              ? 'bg-orange-50/80 border-orange-500/30 shadow-orange-200/60' 
                              : 'bg-black/30 border-orange-500/30 shadow-orange-900/60'
                          } backdrop-blur-sm`}>
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
                        <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-lg ${
                          theme === 'light' ? 'text-slate-600' : 'text-gray-300'
                        }`}>
                          {island.description}
                        </p>
                      </div>

                      {/* Key Benefits */}
                      <div className="reveal-text">
                        <div className="space-y-2 mb-8">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: island.color.primary }}
                            />
                            <span className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                              {island.id === 'websites' ? 'Pixel-perfect design & code' : island.id === 'webapps' ? 'Advanced functionality & UX' : 'Virtual tours & galleries'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: island.color.primary }}
                            />
                            <span className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                              {island.id === 'websites' ? 'Lightning-fast performance' : island.id === 'webapps' ? 'Scalable architecture' : 'Advanced search & filters'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: island.color.primary }}
                            />
                            <span className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                              {island.id === 'websites' ? 'Mobile-first & SEO-ready' : island.id === 'webapps' ? 'Custom integrations' : 'Lead generation systems'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Success Metrics */}
                      <div className="reveal-text">
                        <div className="flex flex-wrap gap-6 mb-8">
                          <div className="text-center">
                            <SparklesText
                              colors={{ first: island.color.primary, second: island.color.secondary }}
                              sparklesCount={3}
                              className="text-2xl md:text-3xl font-bold mb-1"
                            >
                              100%
                            </SparklesText>
                            <div className={`text-xs uppercase tracking-wide ${
                              theme === 'light' ? 'text-slate-500' : 'text-gray-400'
                            }`}>
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
                            <div className={`text-xs uppercase tracking-wide ${
                              theme === 'light' ? 'text-slate-500' : 'text-gray-400'
                            }`}>
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
                            <div className={`text-xs uppercase tracking-wide ${
                              theme === 'light' ? 'text-slate-500' : 'text-gray-400'
                            }`}>
                              {island.id === 'websites' ? 'Weeks Delivery' : island.id === 'webapps' ? 'Weeks Build' : 'Weeks Launch'}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="reveal-text">
                        <Link
                          href={`/${island.id}`}
                          className={`group relative inline-block px-8 py-4 font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            theme === 'light'
                              ? 'text-slate-700 border-slate-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700'
                              : 'text-white border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400'
                          }`}
                          style={{
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
                      <div className="flex items-center space-x-4 pt-6">
                        <span className={`text-sm font-mono ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className={`flex-1 h-0.5 rounded-full overflow-hidden ${
                          theme === 'light' ? 'bg-slate-200' : 'bg-gray-800'
                        }`}>
                          <div 
                            className="h-full transition-all duration-1000 rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${island.color.primary}, ${island.color.secondary})`,
                              width: `${((index + 1) / islandsData.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className={`text-sm font-mono ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                          {String(islandsData.length).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Chatbot Section */}
        <ChatbotSection />

        {/* Additional Spacing Between Sections */}
        <div className="py-16 md:py-24"></div>

        {/* CTA Section - "Ready to Transform" */}
        <section 
          ref={ctaRef}
          className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-20 md:py-32 overflow-x-hidden ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            
            {/* CTA Title */}
            <div className="cta-title text-center mb-24">
              <div className="reveal-on-scroll mb-12">
                <Badge
                  variant="outline"
                  className={`border-orange-500/70 text-orange-400 px-8 py-4 text-base font-semibold rounded-full shadow-lg ${
                    theme === 'light' 
                      ? 'bg-orange-50/80 shadow-orange-200/60' 
                      : 'bg-orange-950/60 shadow-orange-900/60'
                  }`}
                >
                  <AnimatedShinyText className="text-orange-400">
                    Ready to Transform Your Business? ✨
                  </AnimatedShinyText>
                </Badge>
              </div>
              
              <h2 className="reveal-on-scroll text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 md:mb-12 leading-tight px-2 md:px-0">
                <SparklesText 
                  colors={{ first: "#F97316", second: "#EA580C" }}
                  sparklesCount={15}
                  className="block mb-4 md:mb-6"
                >
                  Let's Build Something
                </SparklesText>
                <AuroraText 
                  className="block"
                  colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}
                >
                  Extraordinary
                </AuroraText>
              </h2>
              
              <p className={`reveal-on-scroll text-base md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed px-4 md:px-0 ${
                theme === 'light' ? 'text-slate-600' : 'text-gray-300'
              }`}>
                Join 50+ successful businesses who trusted Zero Point Labs to bring their vision to life. 
                Your digital transformation starts with a single conversation.
              </p>
            </div>

            {/* Contact Form Card - Mobile Optimized */}
            <div className="flex justify-center mb-12 md:mb-20">
              <div className="w-full max-w-2xl md:max-w-3xl px-4 md:px-0">
                <div className="cta-hub relative group">
                  
                  {/* Enhanced Background Glow Effects */}
                  <div 
                    className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-30 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: theme === 'light' 
                        ? 'radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.08) 0%, rgba(251, 146, 60, 0.04) 40%, transparent 70%)'
                        : 'radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.15) 0%, rgba(251, 146, 60, 0.08) 40%, transparent 70%)',
                      filter: 'blur(60px)',
                      transform: 'scale(1.1)',
                    }}
                  />

                  {/* Main Card */}
                  <div className={`relative p-6 md:p-10 lg:p-14 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl backdrop-blur-sm border transition-all duration-500 group-hover:shadow-3xl ${
                    theme === 'light' 
                      ? 'bg-neutral-50/95 border-neutral-200/60 shadow-neutral-900/15' 
                      : 'bg-neutral-900/95 border-neutral-700/60 shadow-black/60'
                  }`}>
                    
                    {/* Subtle Border Gradient */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
                      style={{
                        background: theme === 'light' 
                          ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, transparent 50%, rgba(251, 146, 60, 0.05) 100%)'
                          : 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, transparent 50%, rgba(251, 146, 60, 0.1) 100%)',
                        borderRadius: '1.5rem',
                        padding: '1px',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                      }}
                    />
                    
                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={`particle-${i}`}
                          className="absolute w-2 h-2 rounded-full opacity-30"
                          style={{
                            left: `${20 + (i * 20)}%`,
                            top: `${15 + (i * 15)}%`,
                            background: 'radial-gradient(circle, #ff8c00 0%, transparent 70%)',
                            animation: `float ${4 + i}s infinite ease-in-out ${i * 0.5}s`,
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative z-10">
              {/* Enhanced Header - Mobile Optimized */}
              <div className="text-center mb-8 md:mb-12">
                <div className="relative w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 md:mb-8">
                  {/* Icon Background with Pulse */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl md:shadow-2xl shadow-orange-500/30 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 opacity-75 blur-sm" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-white animate-pulse" />
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-6 leading-tight px-2 md:px-0">
                  <SparklesText 
                    colors={{ first: "#F97316", second: "#EA580C" }}
                    sparklesCount={6}
                  >
                    Start Your Project
                  </SparklesText>
                </h3>
                
                <p className={`text-base md:text-xl lg:text-2xl font-light leading-relaxed max-w-lg mx-auto px-4 ${
                  theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                }`}>
                  Get a detailed proposal within 24 hours
                </p>
              </div>

                      {/* Enhanced Contact Form - Mobile Optimized */}
                      <form className="space-y-4 md:space-y-6">
                        <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                          <div className="group">
                            <label className={`block text-xs md:text-sm font-medium mb-2 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-500 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white placeholder-neutral-400 hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                                placeholder="Your name"
                              />
                            </div>
                          </div>
                          <div className="group">
                            <label className={`block text-xs md:text-sm font-medium mb-2 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Email
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-500 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white placeholder-neutral-400 hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                                placeholder="your@email.com"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 md:space-y-4">
                          <div className="group">
                            <label className={`block text-xs md:text-sm font-medium mb-2 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Project Type
                            </label>
                            <div className="relative">
                              <select
                                className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none cursor-pointer text-sm ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                              >
                                <option value="">Select project type</option>
                                <option value="website">Website</option>
                                <option value="webapp">Web App</option>
                                <option value="ecommerce">E-commerce</option>
                                <option value="other">Other</option>
                              </select>
                              <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none transition-colors ${
                                theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                              }`} />
                            </div>
                          </div>
                        </div>

                        <div className="group">
                          <label className={`block text-xs md:text-sm font-medium mb-2 transition-colors duration-200 group-focus-within:text-orange-500 ${
                            theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                          }`}>
                            Project Details
                          </label>
                          <div className="relative">
                            <textarea
                              rows={3}
                              className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none text-sm ${
                                theme === 'light'
                                  ? 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-500 hover:bg-white focus:bg-white'
                                  : 'bg-neutral-800/60 border-neutral-600 text-white placeholder-neutral-400 hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                              }`}
                              placeholder="Tell us about your project goals and requirements..."
                            />
                          </div>
                        </div>

                        {/* Enhanced Submit Button - Mobile Optimized */}
                        <div className="pt-3 md:pt-4">
                          <Button 
                            type="submit"
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 md:py-4 px-4 md:px-6 text-sm md:text-base shadow-xl md:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-[1.02] border-0 rounded-lg md:rounded-xl"
                          >
                            <span className="flex items-center justify-center relative z-10 gap-2 md:gap-3">
                              <Sparkles className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
                              Send Details
                              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                          </Button>

                          <div className="text-center mt-3 md:mt-4 space-y-1 md:space-y-2">
                            <p className={`text-sm md:text-base font-medium ${
                              theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                            }`}>
                              🚀 24-hour response guarantee
                            </p>
                            <p className={`text-xs md:text-sm ${
                              theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                            }`}>
                              No spam, just honest advice
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Row - Mobile Compact */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 mb-1 md:mb-2">50+</div>
                <div className={`text-xs md:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Projects
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 mb-1 md:mb-2">100%</div>
                <div className={`text-xs md:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-500 mb-1 md:mb-2">24hrs</div>
                <div className={`text-xs md:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Response
                </div>
              </div>
            </div>

            {/* Bottom Trust Elements - Mobile Compact */}
            <div className="reveal-on-scroll text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  <span className={`text-xs md:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                    Free Consultation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  <span className={`text-xs md:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                    No Hidden Costs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                  <span className={`text-xs md:text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                    Satisfaction Guarantee
                  </span>
                </div>
              </div>
              
              <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'} px-4`}>
                Trusted across Cyprus • Remote work worldwide
              </p>
            </div>

            {/* Floating Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Subtle floating orbs */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`cta-orb-${i}`}
                  className="cta-orb absolute rounded-full opacity-20"
                  style={{
                    left: `${10 + (i * 15)}%`,
                    top: `${20 + (i * 12)}%`,
                    width: `${40 + (i * 10)}px`,
                    height: `${40 + (i * 10)}px`,
                    background: `radial-gradient(circle, ${theme === 'light' ? '#ff8c00' : '#ff8c00'} 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                />
              ))}
            </div>
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

        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1.3);
            opacity: 0.4;
          }
          50% { 
            transform: scale(1.4);
            opacity: 0.6;
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.7;
          }
        }

        @keyframes floatParticle1 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-15px) translateX(8px);
            opacity: 1;
          }
        }

        @keyframes floatParticle2 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-20px) translateX(-5px);
            opacity: 0.8;
          }
        }

        @keyframes floatParticle3 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.5;
          }
          50% { 
            transform: translateY(-12px) translateX(10px);
            opacity: 0.9;
          }
        }

        @keyframes dataFlow {
          0% { 
            transform: translateY(0px) translateX(0px) scale(0.8);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(15px) scale(1.2);
            opacity: 1;
          }
          100% { 
            transform: translateY(-60px) translateX(30px) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes buildingPulse {
          0%, 100% { 
            opacity: 0.7;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }

        @keyframes windowBlink {
          0%, 90% { 
            opacity: 0.6;
          }
          95% { 
            opacity: 1;
          }
          100% { 
            opacity: 0.6;
          }
        }

        @keyframes scanLine {
          0% { 
            top: 0;
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes borderGlow {
          0%, 100% { 
            opacity: 0.3;
          }
          50% { 
            opacity: 0.8;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes twinkle {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          .animate-bounce {
            animation: none;
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.4; }
          }
          @keyframes floatParticle1,
          @keyframes floatParticle2,
          @keyframes floatParticle3,
          @keyframes dataFlow,
          @keyframes buildingPulse,
          @keyframes windowBlink,
          @keyframes scanLine,
          @keyframes borderGlow {
            0%, 100% { opacity: 0.5; }
          }
        }
      `}</style>
    </div>
  );
}
