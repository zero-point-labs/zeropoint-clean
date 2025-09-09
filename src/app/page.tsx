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
  const aboutRef = useRef<HTMLDivElement>(null);
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
    const about = aboutRef.current;
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

      // About section advanced animations
      if (about) {
        const aboutText = about.querySelector('.about-text');
        const aboutImage = about.querySelector('.about-image');
        
        // Set initial states - only if elements exist
        const aboutElements = [aboutText, aboutImage].filter(Boolean);
        if (aboutElements.length > 0) {
          gsap.set(aboutElements, { opacity: 0, y: 100, scale: 0.8 });
        }

        // About section timeline
        const aboutTl = gsap.timeline({
          scrollTrigger: {
            trigger: about,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // Profile card floating animation
              const profileCard = about.querySelector('.profile-card-main');
              if (profileCard) {
                gsap.to(profileCard, {
                  y: "+=20",
                  rotation: 2,
                  duration: 6,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              }

              // Orbiting particles
              const particles = about.querySelectorAll('.orbit-particle');
              particles.forEach((particle, index) => {
                gsap.to(particle, {
                  rotation: 360,
                  duration: 15 + index * 3,
                  ease: "none",
                  repeat: -1,
                });
              });

              // Profile glow pulse
              const profileGlow = about.querySelector('.profile-glow-1');
              if (profileGlow) {
                gsap.to(profileGlow, {
                  scale: 1.4,
                  opacity: 0.6,
                  duration: 4,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              }
            }
          }
        });

        // Staggered entrance
        if (aboutText) {
          aboutTl.to(aboutText, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
        if (aboutImage) {
          aboutTl.to(aboutImage, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out"
          }, "-=0.6");
        }

        // Individual parallax for about elements
        if (aboutText) {
        gsap.to(aboutText, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: aboutText,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        }

        if (aboutImage) {
        gsap.to(aboutImage, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: aboutImage,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        }

        // Content reveal on scroll with stagger
        const revealElements = about.querySelectorAll('.reveal-on-scroll');
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
                trigger: about,
                start: "top 70%",
                toggleActions: "play none none reverse"
              }
            }
          );
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

        // Individual island animations (like FloatingIslandsLenis)
        portfolioCards.forEach((card, index) => {
          const islandImage = card.querySelector('.island-image');
          const islandContent = card.querySelector('.island-content');
          const islandGlow = card.querySelector('.island-glow');
          const orbitElements = card.querySelectorAll('.orbit-element');

          // Set initial states for content
          if (islandContent) {
            gsap.set(islandContent, { opacity: 0, y: 50 });
          }

          // Main island entrance animation
          const islandTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
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

          // Content reveal on scroll
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
                    start: "top 70%",
                    toggleActions: "play none none reverse"
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
    <div className="relative" style={{ minHeight: '700vh' }}>
      
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
          minHeight: 'calc(700vh + 150vh)', // Very generous extra coverage for parallax + future sections
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
        className="relative z-20 min-h-[700vh]"
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

        
        {/* About Section - Zero Point Labs Digital Headquarters */}
        <section 
          ref={aboutRef}
          className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-20 lg:py-32 overflow-hidden ${
            theme === 'light' ? 'text-slate-900' : 'text-slate-100'
          }`}
        >
          <div className="container mx-auto max-w-7xl relative z-10">
            
            {/* About Section Title */}
            <div className="text-center mb-8 md:mb-16 lg:mb-20 reveal-on-scroll">
              <div className="space-y-4 md:space-y-6">
                {/* About Badge */}
                <div className="mb-4 md:mb-6">
                  <div className="inline-block relative">
                    <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full border shadow-lg ${
                      theme === 'light' 
                        ? 'bg-orange-50/80 border-orange-500/30 shadow-orange-200/60' 
                        : 'bg-black/30 border-orange-500/30 shadow-orange-900/60'
                    } backdrop-blur-sm`}>
                      <span className="text-orange-400 font-semibold text-xs md:text-sm tracking-wider">
                        ABOUT ZEROPOINT
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-sm -z-10" />
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <SparklesText 
                    className="block"
                    colors={{ first: "#F97316", second: "#EA580C" }}
                    sparklesCount={8}
                  >
                    Meet Our
                  </SparklesText>
                  <AuroraText 
                    className="block"
                    colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}
                  >
                    Digital Universe
                  </AuroraText>
                </h2>
                <p className={`text-sm sm:text-base md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-6 mt-6 ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Where cutting-edge technology meets creative excellence to build extraordinary digital experiences
                </p>
              </div>
            </div>

            {/* Mobile Company Info - Below main title on mobile */}
            <div className="block md:hidden text-center mb-12 px-4">
              <div className="mb-3">
                <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 px-3 py-1.5 text-sm font-medium">
                  Est. 2019
                </Badge>
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                theme === 'light' ? 'text-slate-800' : 'text-white'
              }`}>
                Zero Point Labs
              </h3>
              <p className={`text-base font-semibold mb-2 ${
                theme === 'light' ? 'text-orange-600' : 'text-orange-400'
              }`}>
                Premium Digital Solutions Hub
              </p>
              <p className={`text-sm ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Cyprus-based • Globally focused
              </p>
            </div>

            {/* Floating Motherboard Island */}
            <div className="relative mb-12 md:mb-16 lg:mb-20">
              
              {/* Island Glow Effect */}
              <div 
                className="island-glow absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 60%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)',
                }}
              />

              {/* Main Island Container */}
              <div className="relative flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:min-h-[65vh] xl:min-h-[70vh]">
                
                {/* Main Motherboard Island with Overlays */}
                <div className="relative island-image group">
                  
                  {/* Orbiting Elements - Hidden on mobile to reduce clutter */}
                  <div className="absolute inset-0 pointer-events-none hidden sm:block">
                    
                    {/* AI Assistant Orbs */}
                    <div 
                      className="orbit-element absolute w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                      style={{
                        left: '15%',
                        top: '20%',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.8)',
                        transformOrigin: '250px 200px',
                      }}
                    />
                    <div 
                      className="orbit-element absolute w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
                      style={{
                        right: '20%',
                        top: '15%',
                        boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)',
                        transformOrigin: '-200px 250px',
                      }}
                    />
                    <div 
                      className="orbit-element absolute w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      style={{
                        left: '70%',
                        top: '70%',
                        boxShadow: '0 0 18px rgba(147, 51, 234, 0.7)',
                        transformOrigin: '-150px -200px',
                      }}
                    />

                    {/* Tech Stack Tool Icons */}
                    <div 
                      className="orbit-element absolute w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group cursor-pointer"
                      style={{
                        left: '10%',
                        top: '60%',
                        boxShadow: '0 0 25px rgba(59, 130, 246, 0.6)',
                        transformOrigin: '300px -100px',
                      }}
                    >
                      <span className="text-white text-xs font-bold">TS</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        TypeScript
                      </div>
                    </div>
                    <div 
                      className="orbit-element absolute w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center group cursor-pointer"
                      style={{
                        right: '15%',
                        top: '50%',
                        boxShadow: '0 0 25px rgba(34, 211, 238, 0.6)',
                        transformOrigin: '-250px 50px',
                      }}
                    >
                      <span className="text-white text-xs font-bold">R</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        React
                      </div>
                    </div>
                    
                    {/* Additional Tech Orbs */}
                    <div 
                      className="orbit-element absolute w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center group cursor-pointer"
                      style={{
                        left: '80%',
                        top: '25%',
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.6)',
                        transformOrigin: '-180px 120px',
                      }}
                    >
                      <span className="text-white text-xs font-bold">N</span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                        Node.js
                      </div>
                    </div>
                  
                    {/* Data Stream Particles */}
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={`data-particle-${i}`}
                        className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-60"
                        style={{
                          left: `${20 + (i * 7) % 60}%`,
                          top: `${20 + (i * 11) % 60}%`,
                          animation: `dataFlow ${3 + i * 0.5}s infinite linear ${i * 0.2}s`,
                          boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)',
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Mobile Logo - Simple logo on top of buildings, visible only on mobile */}
                  <div className="block md:hidden absolute top-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
                    <div 
                      className="relative"
                      style={{
                        animation: 'buildingPulse 4s infinite ease-in-out',
                      }}
                    >
                      {/* Compact Holographic Display Panel for Mobile */}
                      <div className={`relative px-3 py-2 rounded-xl backdrop-blur-md border ${
                        theme === 'light' 
                          ? 'bg-white/90 border-orange-300/50' 
                          : 'bg-black/90 border-orange-500/50'
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%)',
                        boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      }}>
                        
                        {/* Corner Brackets */}
                        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-orange-400/80 rounded-tl-sm" />
                        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-orange-400/80 rounded-tr-sm" />
                        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-orange-400/80 rounded-bl-sm" />
                        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-orange-400/80 rounded-br-sm" />
                        
                        {/* Logo */}
                        <div className="relative z-10">
                          <Image
                            src="/new-zeropoint-labs-logo.png"
                            alt="Zero Point Labs"
                            width={120}
                            height={40}
                            className="h-6 w-auto mx-auto"
                            style={{
                              filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.5))',
                            }}
                          />
                        </div>
                        
                        {/* Scanning Line Animation */}
                        <div 
                          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"
                          style={{
                            animation: 'scanLine 3s infinite ease-in-out',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Island Image */}
                  <div className="relative flex justify-center">
                    <Image
                      src="/about-islandv2.png"
                      alt="Zero Point Labs Digital Headquarters"
                      width={2000}
                      height={1500}
                      className="w-[90vw] sm:w-[80vw] md:w-[65vw] lg:w-[55vw] xl:w-[50vw] max-w-4xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        filter: `
                          drop-shadow(0 20px 40px rgba(249, 115, 22, 0.2))
                          drop-shadow(0 0 30px rgba(59, 130, 246, 0.15))
                          brightness(0.85)
                          contrast(0.95)
                        `,
                      }}
                    />
                    
                    {/* Zero Point Labs Logo - Top Right on Desktop only */}
                    <div className="hidden md:block absolute top-0 right-0 p-8 pointer-events-none">
                      {/* Context Title for Logo */}
                      <div className="mb-6 text-center max-w-sm transform translate-x-12 lg:translate-x-16">
                        <div className="mb-2">
                          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 px-2.5 py-1 text-xs font-medium">
                            Est. 2019
                          </Badge>
                        </div>
                        <h3 className={`text-xl lg:text-2xl font-bold mb-3 ${
                          theme === 'light' ? 'text-slate-800' : 'text-white'
                        }`}>
                          Zero Point Labs
                        </h3>
                        <p className={`text-sm font-semibold mb-2 ${
                          theme === 'light' ? 'text-orange-600' : 'text-orange-400'
                        }`}>
                          Premium Digital Solutions Hub
                        </p>
                        <p className={`text-xs ${
                          theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          Cyprus-based • Globally focused
                        </p>
                      </div>
                
                      <div 
                        className="relative"
                        style={{
                          animation: 'buildingPulse 4s infinite ease-in-out',
                        }}
                      >
                        {/* Holographic Display Panel */}
                        <div className={`relative px-6 py-4 lg:px-8 lg:py-6 rounded-2xl backdrop-blur-md border ${
                      theme === 'light' 
                            ? 'bg-white/10 border-orange-300/30' 
                            : 'bg-black/20 border-orange-500/30'
                        }`}
                        style={{
                          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                          boxShadow: '0 8px 32px rgba(249, 115, 22, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        }}>
                          
                          {/* Holographic Grid Lines */}
                          <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
                    style={{
                              backgroundImage: `
                                linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                                linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px)
                              `,
                              backgroundSize: '20px 20px',
                            }}
                          />
                          
                          {/* Corner Brackets */}
                          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-orange-400/60 rounded-tl-sm" />
                          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-orange-400/60 rounded-tr-sm" />
                          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-orange-400/60 rounded-bl-sm" />
                          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-orange-400/60 rounded-br-sm" />
                          
                          {/* Logo */}
                          <div className="relative z-10">
                            <Image
                              src="/new-zeropoint-labs-logo.png"
                              alt="Zero Point Labs"
                              width={180}
                              height={60}
                              className="h-10 lg:h-14 w-auto mx-auto"
                      style={{
                                filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.4))',
                      }}
                    />
                          </div>
                          
                          {/* Scanning Line Animation */}
                    <div 
                            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"
                      style={{
                              animation: 'scanLine 3s infinite ease-in-out',
                      }}
                    />
                  </div>

                        {/* Support Beam */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-8 lg:h-12 bg-gradient-to-b from-orange-400/60 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>


                {/* Developer Profile Card - Below company info on mobile, positioned on desktop */}
                <div className="mt-8 md:absolute md:bottom-16 md:left-44 lg:bottom-20 lg:left-48 about-image">
                  {/* Context Title for Profile Card - Hidden on mobile, shown above card on desktop */}
                  <div className="hidden md:block mb-4 text-left max-w-sm transform -translate-x-12 lg:-translate-x-16">
                    <div className="mb-2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-2.5 py-1 text-xs font-medium">
                        Meet Your Developer
                      </Badge>
                    </div>
                    <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${
                      theme === 'light' ? 'text-slate-800' : 'text-white'
                    }`}>
                      Your Digital Partner
                    </h3>
                    <p className={`text-sm font-semibold mb-1 ${
                      theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                    }`}>
                      Expert Full-Stack Developer
                    </p>
                    <p className={`text-xs ${
                      theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                    }`}>
                      Crafting premium web experiences that drive results
                    </p>
                  </div>
                  
                  {/* Mobile Profile Title - Above card on mobile, positioned to the left */}
                  <div className="block md:hidden relative mb-4">
                    <div className="absolute -top-12 left-4 text-left z-10">
                      <div className="mb-1">
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-2 py-0.5 text-xs font-medium">
                          Meet Your Developer
                        </Badge>
                      </div>
                      <h3 className={`text-sm font-bold ${
                        theme === 'light' ? 'text-slate-800' : 'text-white'
                      }`}>
                        Your Digital Partner
                      </h3>
                    </div>
                  </div>
                  
                  <div className="relative profile-workstation-pod group flex justify-center md:block">
                    
                    {/* Enhanced Profile Card Glow */}
                    <div 
                      className="absolute inset-0 rounded-3xl transition-all duration-500 group-hover:scale-110"
                      style={{
                        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.25) 0%, rgba(59, 130, 246, 0.15) 40%, rgba(147, 51, 234, 0.1) 70%, transparent 80%)',
                        filter: 'blur(40px)',
                        transform: 'scale(1.2)',
                      }}
                    />

                    {/* Premium Profile Card */}
                    <div className="relative profile-card-main transition-transform duration-300 group-hover:scale-105">
                      <div className="relative">
                        
                        {/* Main Card Container */}
                        <div className="relative w-64 sm:w-72 md:w-56 lg:w-60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md border border-orange-500/30 bg-slate-800/80 transition-all duration-300 group-hover:border-orange-500/50">
                          
                          {/* Profile Image Section */}
                          <div className="relative h-56 sm:h-64 md:h-48 lg:h-52 overflow-hidden">
                            <img 
                              src="/about-us-profile.jpeg" 
                              alt="Andreas Kyriakou - Digital Architect"
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-800/90 via-slate-800/20 to-transparent" />
                            
                            {/* Status Indicators - Top */}
                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                              {/* Available Status */}
                              <div className="flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                <span className="text-white text-xs font-medium">Available</span>
                              </div>
                              
                              {/* Remote Badge */}
                              <div className="flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                                <Globe className="w-3 h-3" />
                                <span className="text-white text-xs font-medium">Remote</span>
                              </div>
                            </div>
                          </div>
                        
                          {/* Information Panel */}
                          <div className="p-4 bg-slate-800/80">
                            
                            {/* Enhanced Name & Title */}
                            <div className="text-center">
                              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Andreas Kyriakou</h3>
                              <div className="mb-4">
                                <p className="text-orange-400 text-sm font-semibold">Full-Stack Developer</p>
                              </div>
                              
                              {/* Location & Availability */}
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center justify-center gap-2 text-slate-400 bg-slate-700/30 rounded-full px-3 py-1.5">
                                  <MapPin className="w-3 h-3 text-orange-400" />
                                  <span className="text-xs font-medium">Nicosia, Cyprus</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 rounded-full px-3 py-1.5">
                                  <Globe className="w-3 h-3" />
                                  <span className="text-xs font-medium">Remote Work Available Worldwide</span>
                                </div>
                              </div>

                              {/* Social Links */}
                              <div className="flex items-center justify-center gap-3">
                                {[
                                  { icon: Github, href: "#", color: "hover:text-white" },
                                  { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                                  { icon: Twitter, href: "#", color: "hover:text-sky-400" }
                                ].map((social, index) => (
                                  <a
                                    key={index}
                                    href={social.href}
                                    className={`p-2 text-slate-400 ${social.color} transition-colors duration-200 hover:bg-slate-700/50 rounded-lg`}
                                  >
                                    <social.icon className="w-4 h-4" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                          </div>
                          
            {/* Zero Point Labs Console */}
            <div className="max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 reveal-on-scroll px-2 sm:px-0">
              <div className={`relative rounded-xl overflow-hidden shadow-2xl ${
                theme === 'light' 
                  ? 'bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/20' 
                  : 'bg-gradient-to-br from-slate-900 to-slate-800 border border-orange-500/20'
              }`}>
                {/* Console Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-b border-orange-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center">
                        <span className="text-orange-400 text-xs font-bold">Z</span>
                      </div>
                      <span className="text-orange-300 text-sm font-mono">Zero Point Console</span>
                    </div>
                  </div>
                  <div className="text-orange-400/60 text-xs font-mono">
                    v2.0.1
                  </div>
                </div>

                {/* Console Content */}
                <div className="p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm leading-relaxed">
                  <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="text-orange-400">
                      Welcome to Zero Point Labs Console
                    </div>
                    
                    {/* Command */}
                    <div className="flex items-center">
                      <span className="text-orange-400 mr-2">zp&gt;</span>
                      <span className="text-white">show company-profile</span>
                    </div>
                    
                    {/* Output */}
                    <div className="text-slate-300 space-y-3 mt-4">
                      <div className="text-orange-300 text-center">
                        ╔══════════════════════════════════════════════════════════╗
                      </div>
                      <div className="text-orange-300 text-center">
                        ║                    ZERO POINT LABS                      ║
                      </div>
                      <div className="text-orange-300 text-center">
                        ╚══════════════════════════════════════════════════════════╝
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <div>
                          <span className="text-orange-400">Company Name:</span>
                          <span className="text-white ml-2">Zero Point Labs</span>
                        </div>
                        <div>
                          <span className="text-orange-400">Since:</span>
                          <span className="text-white ml-2">2019 - Building digital dreams for 5+ years</span>
                        </div>
                        <div>
                          <span className="text-orange-400">Based in:</span>
                          <span className="text-white ml-2">Beautiful Cyprus 🇨🇾 (Working globally)</span>
                        </div>
                        <div>
                          <span className="text-orange-400">What we do:</span>
                          <span className="text-white ml-2">We create amazing websites & web apps</span>
                        </div>
                        <div>
                          <span className="text-orange-400">Our tools:</span>
                          <span className="text-cyan-300 ml-2">Modern web technologies that just work</span>
                        </div>
                        <div>
                          <span className="text-orange-400">Current status:</span>
                          <span className="text-green-400 ml-2 animate-pulse">🟢 Ready for your next project!</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-orange-500/20">
                        <div className="text-slate-400 text-sm">
                          <span className="text-orange-400">💡</span> We turn your ideas into digital reality
                        </div>
                        <div className="text-slate-400 text-sm mt-2">
                          <span className="text-cyan-400">🎯</span> Quality work that makes your business shine
                        </div>
                      </div>

                      {/* Blinking cursor */}
                      <div className="flex items-center mt-6">
                        <span className="text-orange-400 mr-2">zp&gt;</span>
                        <span className="text-orange-300 animate-pulse">█</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                          
            {/* Small CTA Section */}
            <div className="text-center max-w-2xl mx-auto space-y-4 md:space-y-6 reveal-on-scroll px-4">
              <div className="space-y-3 md:space-y-4">
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  Ready to Build Something Amazing?
                </h3>
                <p className={`text-base md:text-lg ${
                  theme === 'light' ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Let's transform your vision into a stunning digital experience that drives results
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Start Your Project
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className={`border-2 border-orange-500/50 text-orange-500 hover:bg-orange-500/10 px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105 ${
                    theme === 'light' 
                      ? 'hover:bg-orange-50' 
                      : 'hover:bg-orange-500/10'
                  }`}
                >
                  <Download className="w-5 h-5 mr-3" />
                  View Portfolio
                </Button>
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
              
              <h2 className="reveal-on-scroll text-5xl md:text-7xl lg:text-8xl font-bold mb-12">
                <SparklesText 
                  colors={{ first: "#F97316", second: "#EA580C" }}
                  sparklesCount={15}
                  className="block mb-6"
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
              
              <p className={`reveal-on-scroll text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'light' ? 'text-slate-600' : 'text-gray-300'
              }`}>
                Join 50+ successful businesses who trusted Zero Point Labs to bring their vision to life. 
                Your digital transformation starts with a single conversation.
              </p>
            </div>

            {/* Contact Form Card */}
            <div className="flex justify-center mb-20">
              <div className="w-full max-w-3xl px-4 md:px-0">
                <div className="cta-hub relative group">
                  
                  {/* Enhanced Background Glow Effects */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: theme === 'light' 
                        ? 'radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.08) 0%, rgba(251, 146, 60, 0.04) 40%, transparent 70%)'
                        : 'radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.15) 0%, rgba(251, 146, 60, 0.08) 40%, transparent 70%)',
                      filter: 'blur(80px)',
                      transform: 'scale(1.1)',
                    }}
                  />
                  
                  {/* Secondary Glow */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
                    style={{
                      background: theme === 'light' 
                        ? 'radial-gradient(circle at 70% 70%, rgba(251, 146, 60, 0.06) 0%, transparent 60%)'
                        : 'radial-gradient(circle at 70% 70%, rgba(251, 146, 60, 0.12) 0%, transparent 60%)',
                      filter: 'blur(60px)',
                    }}
                  />

                  {/* Main Card */}
                  <div className={`relative p-10 md:p-14 rounded-3xl shadow-2xl backdrop-blur-sm border transition-all duration-500 group-hover:shadow-3xl ${
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
                      {/* Enhanced Header */}
                      <div className="text-center mb-12">
                        <div className="relative w-20 h-20 mx-auto mb-8">
                          {/* Icon Background with Pulse */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-2xl shadow-orange-500/30 animate-pulse" />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 opacity-75 blur-sm" />
                          <div className="relative w-full h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                            <Sparkles className="w-10 h-10 text-white animate-pulse" />
                          </div>
                        </div>
                        
                        <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                          <SparklesText 
                            colors={{ first: "#F97316", second: "#EA580C" }}
                            sparklesCount={8}
                          >
                            Let's Start Your Project
                          </SparklesText>
                        </h3>
                        
                        <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-xl mx-auto ${
                          theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                        }`}>
                          Tell us about your vision and we'll get back to you within 24 hours with a detailed proposal
                        </p>
                      </div>

                      {/* Enhanced Contact Form */}
                      <form className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="group">
                            <label className={`block text-sm font-semibold mb-3 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Your Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:scale-[1.02] ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-500 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white placeholder-neutral-400 hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                                placeholder="John Doe"
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100" />
                            </div>
                          </div>
                          <div className="group">
                            <label className={`block text-sm font-semibold mb-3 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:scale-[1.02] ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-500 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white placeholder-neutral-400 hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                                placeholder="john@company.com"
                              />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100" />
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="group">
                            <label className={`block text-sm font-semibold mb-3 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Project Type
                            </label>
                            <div className="relative">
                              <select
                                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:scale-[1.02] appearance-none cursor-pointer ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                              >
                                <option value="">Select your project type</option>
                                <option value="website">Website Design & Development</option>
                                <option value="webapp">Web Application</option>
                                <option value="ecommerce">E-commerce Store</option>
                                <option value="redesign">Website Redesign</option>
                                <option value="other">Other</option>
                              </select>
                              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors ${
                                theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                              }`} />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100" />
                            </div>
                          </div>

                          <div className="group">
                            <label className={`block text-sm font-semibold mb-3 transition-colors duration-200 group-focus-within:text-orange-500 ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              Project Budget
                            </label>
                            <div className="relative">
                              <select
                                className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:scale-[1.02] appearance-none cursor-pointer ${
                                  theme === 'light'
                                    ? 'bg-white/80 border-neutral-300 text-neutral-900 hover:bg-white focus:bg-white'
                                    : 'bg-neutral-800/60 border-neutral-600 text-white hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                                }`}
                              >
                                <option value="">Select your budget range</option>
                                <option value="5k-10k">€5,000 - €10,000</option>
                                <option value="10k-20k">€10,000 - €20,000</option>
                                <option value="20k-50k">€20,000 - €50,000</option>
                                <option value="50k+">€50,000+</option>
                                <option value="discuss">Let's discuss</option>
                              </select>
                              <ChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none transition-colors ${
                                theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                              }`} />
                              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100" />
                            </div>
                          </div>
                        </div>

                        <div className="group">
                          <label className={`block text-sm font-semibold mb-3 transition-colors duration-200 group-focus-within:text-orange-500 ${
                            theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                          }`}>
                            Tell us about your project
                          </label>
                          <div className="relative">
                            <textarea
                              rows={5}
                              className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:scale-[1.01] resize-none ${
                                theme === 'light'
                                  ? 'bg-white/80 border-neutral-300 text-neutral-900 placeholder-neutral-500 hover:bg-white focus:bg-white'
                                  : 'bg-neutral-800/60 border-neutral-600 text-white placeholder-neutral-400 hover:bg-neutral-800/80 focus:bg-neutral-800/80'
                              }`}
                              placeholder="Describe your vision, goals, and any specific requirements. What problems are you trying to solve? What's your timeline?"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100" />
                          </div>
                        </div>

                        {/* Enhanced Submit Button */}
                        <div className="pt-4">
                          <Button 
                            type="submit"
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 px-8 text-xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 hover:scale-[1.03] border-0 rounded-2xl"
                          >
                            {/* Button Background Effects */}
                            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                            
                            <span className="flex items-center justify-center relative z-10 gap-4">
                              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
                              Send Project Details
                              <ArrowRight className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-2" />
                            </span>
                          </Button>

                          <div className="text-center mt-6 space-y-2">
                            <p className={`text-base font-medium ${
                              theme === 'light' ? 'text-neutral-600' : 'text-neutral-300'
                            }`}>
                              🚀 We'll respond within 24 hours with a detailed proposal
                            </p>
                            <p className={`text-sm ${
                              theme === 'light' ? 'text-neutral-500' : 'text-neutral-400'
                            }`}>
                              No spam, no sales pressure - just honest advice and transparent pricing
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                <div className={`text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Successful Projects
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                <div className={`text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Client Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">24hrs</div>
                <div className={`text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Response Time
                </div>
              </div>
            </div>

            {/* Bottom Trust Elements */}
            <div className="reveal-on-scroll text-center">
              <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className={`text-base font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                    Free Consultation
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className={`text-base font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                    No Hidden Costs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className={`text-base font-medium ${theme === 'light' ? 'text-slate-600' : 'text-gray-300'}`}>
                    100% Satisfaction Guarantee
                  </span>
                </div>
              </div>
              
              <p className={`text-base ${theme === 'light' ? 'text-slate-500' : 'text-gray-400'}`}>
                Trusted by businesses across Cyprus and beyond • Remote work available worldwide
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
