'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { AuroraText } from '@/components/magicui/aurora-text';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { ShimmerButton } from '@/components/magicui/ShimmerButton';
import ShineBorder from '@/components/magicui/ShineBorder';
import { BorderBeam } from '@/components/magicui/border-beam';
import { 
  GradientMesh,
  FloatingDots,
  CleanTexture,
  SimpleGlow,
  EnhancedGrid
} from '@/components/magicui/MinimalBackgrounds';
import { WordRotate } from '@/components/magicui/WordRotate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/lib/theme-context';
import {
  Code,
  Palette,
  Database,
  Globe,
  Smartphone,
  Cloud,
  Shield,
  Cpu,
  Layers,
  GitBranch,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  ArrowRight,
  Zap,
  Lightbulb,
  Target,
  Rocket,
  Users,
  Award,
  TrendingUp,
  Eye,
  Heart,
  Star,
  CheckCircle,
  Play,
  Download,
  Mail,
  Phone,
  Calendar,
  Coffee
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Types
interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools';
  description: string;
  yearStarted: number;
}

interface Project {
  title: string;
  year: number;
  skills: string[];
  impact: string;
  description: string;
}

interface Philosophy {
  title: string;
  icon: React.ElementType;
  description: string;
  example: string;
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [visibleSection, setVisibleSection] = useState('hero');
  const { theme } = useTheme();

  // Skills data with progression
  const skills: Skill[] = [
    {
      name: "React & Next.js",
      icon: Code,
      level: 95,
      category: "frontend",
      description: "Building scalable, performant web applications with modern React patterns",
      yearStarted: 2019
    },
    {
      name: "TypeScript",
      icon: Code,
      level: 90,
      category: "frontend", 
      description: "Type-safe development for maintainable, robust codebases",
      yearStarted: 2020
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      level: 88,
      category: "design",
      description: "Creating intuitive, beautiful interfaces that users love",
      yearStarted: 2018
    },
    {
      name: "Node.js",
      icon: Cpu,
      level: 85,
      category: "backend",
      description: "Server-side JavaScript for full-stack applications",
      yearStarted: 2020
    },
    {
      name: "Tailwind CSS",
      icon: Layers,
      level: 92,
      category: "frontend",
      description: "Rapid, responsive design with utility-first CSS",
      yearStarted: 2021
    },
    {
      name: "Database Design",
      icon: Database,
      level: 80,
      category: "backend",
      description: "Efficient data modeling and optimization",
      yearStarted: 2020
    },
    {
      name: "Cloud Services",
      icon: Cloud,
      level: 82,
      category: "backend",
      description: "AWS, Vercel, and modern deployment strategies",
      yearStarted: 2021
    },
    {
      name: "Git & DevOps",
      icon: GitBranch,
      level: 90,
      category: "tools",
      description: "Version control and CI/CD workflows",
      yearStarted: 2019
    }
  ];

  // Project evolution timeline
  const timeline: Project[] = [
    {
      title: "First Web Projects",
      year: 2019,
      skills: ["HTML", "CSS", "JavaScript"],
      impact: "Foundation Building",
      description: "Started with basic web development, learning core technologies"
    },
    {
      title: "React Mastery",
      year: 2020,
      skills: ["React", "Redux", "Node.js"],
      impact: "Component-Based Thinking",
      description: "Transitioned to modern React development and state management"
    },
    {
      title: "Full-Stack Evolution",
      year: 2021,
      skills: ["Next.js", "TypeScript", "Tailwind"],
      impact: "End-to-End Solutions",
      description: "Became proficient in full-stack development with modern tools"
    },
    {
      title: "Design Integration",
      year: 2022,
      skills: ["Figma", "UI/UX", "Animation"],
      impact: "Design-Dev Hybrid",
      description: "Integrated design skills to become a true full-stack designer-developer"
    },
    {
      title: "Zero Point Labs",
      year: 2023,
      skills: ["Agency Work", "Client Solutions", "Team Leadership"],
      impact: "Professional Excellence",
      description: "Established agency focusing on premium web solutions"
    }
  ];

  // Code philosophy
  const philosophies: Philosophy[] = [
    {
      title: "Clean & Maintainable",
      icon: Lightbulb,
      description: "Writing code that's easy to read, understand, and modify",
      example: "Consistent naming, clear structure, comprehensive documentation"
    },
    {
      title: "Performance First",
      icon: Zap,
      description: "Optimizing for speed and efficiency from the ground up",
      example: "Code splitting, lazy loading, optimized assets"
    },
    {
      title: "User-Centered",
      icon: Heart,
      description: "Every decision is made with the end user in mind",
      example: "Intuitive interfaces, accessibility, responsive design"
    },
    {
      title: "Future-Proof",
      icon: Rocket,
      description: "Building scalable solutions that grow with your needs",
      example: "Modular architecture, modern frameworks, best practices"
    }
  ];

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
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

    // GSAP Animations Context
    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline();
      
      heroTl.fromTo('.hero-image', 
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
      )
      .fromTo('.hero-text', 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      // Skills section animation
      gsap.fromTo('.skill-card',
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline animation
      gsap.fromTo('.timeline-item',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Philosophy cards
      gsap.fromTo('.philosophy-card',
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effects
      gsap.to('.parallax-bg', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Section visibility tracking
      const sections = [
        { ref: heroRef, name: 'hero' },
        { ref: skillsRef, name: 'skills' },
        { ref: timelineRef, name: 'timeline' },
        { ref: philosophyRef, name: 'philosophy' },
        { ref: showcaseRef, name: 'showcase' },
        { ref: contactRef, name: 'contact' }
      ];

      sections.forEach(section => {
        ScrollTrigger.create({
          trigger: section.ref.current,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setVisibleSection(section.name),
          onEnterBack: () => setVisibleSection(section.name),
        });
      });

    }, containerRef);

    // Cleanup
    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative text-white overflow-hidden">
      {/* Background Elements - Shared across entire page */}
      <div className="fixed inset-0 parallax-bg">
        {/* Main texture background */}
        <div className="absolute inset-0">
          <CleanTexture />
        </div>
        
        {/* Enhanced grid pattern overlay */}
        <div className="absolute inset-0 opacity-90">
          <EnhancedGrid />
        </div>
        
        {/* Gradient mesh for depth */}
        <div className="absolute inset-0 opacity-100">
          <GradientMesh />
        </div>
        
        {/* Floating dots for additional texture */}
        <div className="absolute inset-0 opacity-90">
          <FloatingDots />
        </div>
        
        {/* Dark overlay - further reduced to show more background */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-300"
          style={{ 
            width: `${
              visibleSection === 'hero' ? '16%' :
              visibleSection === 'skills' ? '33%' :
              visibleSection === 'timeline' ? '50%' :
              visibleSection === 'philosophy' ? '66%' :
              visibleSection === 'showcase' ? '83%' :
              visibleSection === 'contact' ? '100%' : '0%'
            }` 
          }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 space-y-3">
        {['hero', 'skills', 'timeline', 'philosophy', 'showcase', 'contact'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const element = document.getElementById(section);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              visibleSection === section 
                ? 'bg-orange-500 scale-125' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 md:pt-32"
      >
        <div className="container mx-auto max-w-7xl relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Enhanced Left Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="hero-text">
                <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
                  <SparklesText 
                    className="block"
                    colors={{ first: "#F97316", second: "#EA580C" }}
                  >
                    Meet Our
                  </SparklesText>
                  <AuroraText 
                    className="block"
                    colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}
                  >
                    Developer
                  </AuroraText>
                </h1>
              </div>
              
              <div className="hero-subtitle space-y-8">
                {/* Dynamic Role */}
                <div className="flex items-center gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full" />
                  <div className="text-2xl md:text-3xl font-light">
                    <WordRotate
                      words={[
                        <span key="dev" className="text-orange-500 font-semibold">Creative Developer</span>,
                        <span key="designer" className="text-orange-500 font-semibold">Design Engineer</span>,
                        <span key="architect" className="text-orange-500 font-semibold">Solution Architect</span>,
                        <span key="craftsman" className="text-orange-500 font-semibold">Digital Craftsman</span>
                      ]}
                      duration={3500}
                    />
                  </div>
                </div>
                
                {/* Enhanced Description */}
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                    A rare combination of <span className="text-orange-500 font-medium">design intuition</span> and <span className="text-orange-500 font-medium">technical expertise</span>.
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                    I create digital experiences that don't just work—they inspire, engage, and deliver exceptional results for businesses and users alike.
                  </p>
                </div>
                
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">Projects Delivered</div>
                  </div>
                  <div className="text-center md:col-span-1 col-span-2">
                    <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">Client Satisfaction</div>
                  </div>
                </div>
                
                {/* Location & Availability */}
                <div className="flex flex-wrap items-center gap-6 text-sm py-4">
                  <div className="flex items-center gap-2 bg-neutral-800/50 px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300">Nicosia, Cyprus</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-400">Available for Remote Work</span>
                  </div>
                </div>
                
                {/* Enhanced CTA Button */}
                <div className="pt-6">
                  <Button 
                    variant="outline" 
                    className="border-2 border-orange-500/50 text-orange-500 hover:bg-orange-500/10 px-8 py-4 text-lg font-medium"
                  >
                    <Download className="w-5 h-5 mr-3" />
                    View Portfolio
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Profile Card */}
            <div className="lg:col-span-5">
              <div className="relative profile-card-container">
                {/* Multi-layered Glow Effects */}
                <div 
                  className="absolute inset-0 rounded-[40px] profile-glow-1"
                  style={{
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(251, 146, 60, 0.2) 30%, transparent 60%)',
                    filter: 'blur(60px)',
                    transform: 'scale(1.3)',
                    animation: 'pulseGlow 6s infinite ease-in-out',
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-[40px] profile-glow-2"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 200, 0, 0.3) 0%, transparent 40%)',
                    filter: 'blur(30px)',
                    transform: 'scale(1.1)',
                    animation: 'pulseGlow 8s infinite ease-in-out 1s',
                  }}
                />

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Orbiting particles */}
                  <div 
                    className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 orbit-particle-1"
                    style={{
                      left: '10%',
                      top: '20%',
                      boxShadow: '0 0 15px rgba(251, 146, 60, 0.8)',
                      animation: 'orbitCard1 15s infinite linear',
                      transformOrigin: '200px 150px',
                    }}
                  />
                  <div 
                    className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-red-400 orbit-particle-2"
                    style={{
                      right: '15%',
                      top: '70%',
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)',
                      animation: 'orbitCard2 18s infinite linear reverse',
                      transformOrigin: '-150px -100px',
                    }}
                  />
                  <div 
                    className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-300 orbit-particle-3"
                    style={{
                      left: '80%',
                      top: '30%',
                      boxShadow: '0 0 8px rgba(251, 191, 36, 0.7)',
                      animation: 'orbitCard3 12s infinite linear',
                      transformOrigin: '-120px 80px',
                    }}
                  />
                  
                  {/* Floating micro particles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-60"
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${10 + i * 8}%`,
                        animation: `floatParticle${(i % 3) + 1} ${4 + i * 0.5}s infinite ease-in-out ${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Main Profile Card with 3D Transform */}
                <div 
                  className="relative profile-card-main"
                  style={{
                    animation: 'floatCard 8s infinite ease-in-out',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="relative rounded-[32px] overflow-hidden hero-image shadow-2xl">
                      {/* Profile Image Container with Parallax */}
                      <div 
                        className="relative h-[500px] md:h-[600px] overflow-hidden profile-image-container rounded-[32px]"
                        style={{
                          animation: 'subtleFloat 6s infinite ease-in-out 0.5s',
                        }}
                      >
                        <img 
                          src="/about-us-profile.jpeg" 
                          alt="Andreas Kyriakou - Full-Stack Developer & Designer"
                          className="w-full h-full object-cover rounded-[32px]"
                          style={{
                            animation: 'imageFloat 10s infinite ease-in-out',
                            minWidth: '102%',
                            minHeight: '102%',
                            transform: 'translate(-1%, -1%)',
                          }}
                        />
                        
                        {/* Enhanced gradient overlays with proper border radius */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-[32px]" />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-600/10 rounded-[32px]" />
                        
                        {/* Animated light rays with border radius */}
                        <div 
                          className="absolute top-0 right-0 w-32 h-32 opacity-30 rounded-tr-[32px] overflow-hidden"
                          style={{
                            background: 'conic-gradient(from 45deg, transparent, rgba(249, 115, 22, 0.3), transparent)',
                            animation: 'rotateRays 20s infinite linear',
                          }}
                        />
                      </div>
                      
                      {/* Card Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        {/* Status Badges */}
                        <div className="flex gap-3 mb-6">
                          <Badge className="bg-green-500 text-white border-0 px-3 py-1.5">
                            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                            Available
                          </Badge>
                          <Badge className="bg-blue-500 text-white border-0 px-3 py-1.5">
                            <Globe className="w-3 h-3 mr-2" />
                            Remote
                          </Badge>
                        </div>
                        
                        {/* Name and Title */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-white mb-2">Andreas Kyriakou</h3>
                          <p className="text-orange-400 font-medium">Full-Stack Developer & UI/UX Designer</p>
                        </div>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {['React', 'Next.js', 'TypeScript', 'Figma'].map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary" 
                              className="bg-white/10 text-white border-orange-500/30 backdrop-blur-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Quick Contact */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {[Github, Linkedin, Twitter].map((Icon, index) => (
                              <Button 
                                key={index}
                                variant="ghost" 
                                size="icon"
                                className="text-white/70 hover:text-orange-500 hover:bg-white/10"
                              >
                                <Icon className="w-4 h-4" />
                              </Button>
                            ))}
                          </div>
                          <Button 
                            variant="ghost" 
                            className="text-orange-500 hover:bg-orange-500/10 font-medium"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                </div>

                {/* Enhanced 3D Shadow */}
                <div 
                  className="absolute inset-0 bg-black/20 rounded-[32px] blur-xl"
                  style={{
                    transform: 'translateY(20px) translateZ(-10px) scale(0.95)',
                    animation: 'shadowFloat 8s infinite ease-in-out',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Interactive Map */}
      <section 
        id="skills" 
        ref={skillsRef}
        className="relative min-h-screen py-20 px-4 md:px-8"
      >
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <SparklesText colors={{ first: "#F97316", second: "#EA580C" }}>
                Skills & Expertise
              </SparklesText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit built through years of passionate learning and real-world application
            </p>
          </div>

          {/* Interactive Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skills.map((skill, index) => (
              <Card 
                key={skill.name}
                className={`skill-card group cursor-pointer transition-all duration-500 bg-neutral-900/50 border-neutral-800 hover:border-orange-500/50 ${
                  activeSkill === index ? 'border-orange-500 bg-orange-500/10' : ''
                }`}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      activeSkill === index 
                        ? 'bg-orange-500 text-white scale-110' 
                        : 'bg-neutral-800 text-orange-500'
                    }`}>
                      <skill.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{skill.name}</h3>
                      <p className="text-sm text-gray-400">Since {skill.yearStarted}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000 ease-out"
                        style={{ width: activeSkill === index ? `${skill.level}%` : '0%' }}
                      />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                  
                  <Badge 
                    className={`mt-4 transition-colors duration-300 ${
                      skill.category === 'frontend' ? 'bg-blue-500/20 text-blue-300' :
                      skill.category === 'backend' ? 'bg-green-500/20 text-green-300' :
                      skill.category === 'design' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}
                  >
                    {skill.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Summary */}
          <div className="text-center">
            <AnimatedShinyText className="text-lg text-gray-300">
              Constantly evolving, always learning, forever growing
            </AnimatedShinyText>
          </div>
        </div>
      </section>

      {/* Project Evolution Timeline */}
      <section 
        id="timeline" 
        ref={timelineRef}
        className="relative min-h-screen py-20 px-4 md:px-8"
      >
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <AuroraText colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}>
                Evolution Journey
              </AuroraText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From first lines of code to full-stack mastery—a story of continuous growth and passion
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 via-orange-600 to-orange-500" />
            
            {timeline.map((project, index) => (
              <div 
                key={project.year}
                className={`timeline-item relative mb-16 ${
                  index % 2 === 0 ? 'pr-1/2' : 'pl-1/2 flex justify-end'
                }`}
              >
                <Card className="bg-neutral-900/80 border-neutral-700 backdrop-blur-sm max-w-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-orange-500 text-white">
                        {project.year}
                      </Badge>
                      <Badge variant="outline" className="border-orange-500/50 text-orange-300">
                        {project.impact}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge 
                          key={skill}
                          variant="secondary" 
                          className="bg-neutral-800 text-gray-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Timeline dot */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-black z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Philosophy */}
      <section 
        id="philosophy" 
        ref={philosophyRef}
        className="relative min-h-screen py-20 px-4 md:px-8"
      >
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <SparklesText colors={{ first: "#F97316", second: "#EA580C" }}>
                Code Philosophy
              </SparklesText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide every line of code I write and every design decision I make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophies.map((philosophy, index) => (
              <Card 
                key={philosophy.title}
                className="philosophy-card group bg-neutral-900/50 border-neutral-700 hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-orange-500/20 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <philosophy.icon className="w-8 h-8 text-orange-500 group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {philosophy.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                    {philosophy.description}
                  </p>
                  
                  <div className="p-4 bg-neutral-800/50 rounded-lg border-l-4 border-orange-500">
                    <p className="text-orange-300 font-medium">
                      {philosophy.example}
                    </p>
                  </div>
                </CardContent>
                <BorderBeam 
                  size={300}
                  duration={20}
                  delay={index * 3}
                  colorFrom="#F97316"
                  colorTo="#EA580C"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design + Development Showcase */}
      <section 
        id="showcase" 
        ref={showcaseRef}
        className="relative min-h-screen py-20 px-4 md:px-8"
      >
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <AuroraText colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}>
                Design + Development
              </AuroraText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The rare combination that sets me apart—where creative vision meets technical excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Design Side */}
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Palette className="w-8 h-8 text-purple-400" />
                  <h3 className="text-3xl font-bold text-white">Design Thinking</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Eye className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Visual Hierarchy</h4>
                      <p className="text-gray-300">Guiding users through intuitive, purposeful design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Heart className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">User Empathy</h4>
                      <p className="text-gray-300">Understanding needs before crafting solutions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-purple-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Aesthetic Excellence</h4>
                      <p className="text-gray-300">Beauty and function in perfect harmony</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Development Side */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Code className="w-8 h-8 text-blue-400" />
                  <h3 className="text-3xl font-bold text-white">Technical Mastery</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Performance</h4>
                      <p className="text-gray-300">Lightning-fast, optimized experiences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Reliability</h4>
                      <p className="text-gray-300">Rock-solid code that stands the test of time</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Rocket className="w-6 h-6 text-blue-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-2">Scalability</h4>
                      <p className="text-gray-300">Solutions that grow with your ambitions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* The Magic Happens */}
          <div className="mt-16 text-center">
            <ShineBorder 
              className="inline-block"
              color={["#F97316", "#EA580C", "#FED7AA"]}
              borderRadius={16}
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Where the Magic Happens
                </h3>
                <p className="text-orange-100 text-lg max-w-2xl">
                  When design intuition meets technical expertise, extraordinary things happen. 
                  I don't just build what you ask for—I craft what you never knew you needed.
                </p>
              </div>
            </ShineBorder>
          </div>
        </div>
      </section>

      {/* Contact & Collaboration */}
      <section 
        id="contact" 
        ref={contactRef}
        className="relative min-h-screen py-20 px-4 md:px-8"
      >
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <SparklesText colors={{ first: "#F97316", second: "#EA580C" }}>
                Let's Create Together
              </SparklesText>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your vision into reality? Let's discuss your next project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-neutral-900/50 border-neutral-700">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Mail className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="text-gray-400">Email</p>
                        <p className="text-white font-medium">andreas@zeropoint-labs.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <MapPin className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="text-gray-400">Location</p>
                        <p className="text-white font-medium">Nicosia, Cyprus (Remote Available)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Calendar className="w-6 h-6 text-orange-500" />
                      <div>
                        <p className="text-gray-400">Availability</p>
                        <p className="text-white font-medium">Open for new projects</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-8 pt-6 border-t border-neutral-700">
                    <p className="text-gray-400 mb-4">Connect with me</p>
                    <div className="flex gap-4">
                      {[
                        { icon: Github, href: "#", label: "GitHub" },
                        { icon: Linkedin, href: "#", label: "LinkedIn" },
                        { icon: Twitter, href: "#", label: "Twitter" }
                      ].map((social) => (
                        <Button 
                          key={social.label}
                          variant="outline" 
                          size="icon"
                          className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10"
                        >
                          <social.icon className="w-5 h-5" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Why Work With Me?</h3>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
                      <p className="text-gray-300 text-sm">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                      <p className="text-gray-300 text-sm">Projects Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                      <p className="text-gray-300 text-sm">Client Satisfaction</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-500 mb-2">24h</div>
                      <p className="text-gray-300 text-sm">Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div className="space-y-8">
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 border-0 text-white">
                <CardContent className="p-8 text-center">
                  <Coffee className="w-16 h-16 mx-auto mb-6 text-orange-100" />
                  <h3 className="text-2xl font-bold mb-4">Let's Grab a Virtual Coffee</h3>
                  <p className="text-orange-100 mb-6 leading-relaxed">
                    I'd love to hear about your project, understand your goals, 
                    and explore how we can create something amazing together.
                  </p>
                  
                  <div className="space-y-4">
                    <ShimmerButton className="w-full bg-white text-orange-600 hover:bg-orange-50">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Call
                    </ShimmerButton>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-white text-white hover:bg-white/10"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send a Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card className="bg-neutral-900/50 border-neutral-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-6">What I Can Help With</h3>
                  
                  <div className="space-y-4">
                    {[
                      { icon: Globe, text: "Custom Web Applications" },
                      { icon: Palette, text: "UI/UX Design & Prototyping" },
                      { icon: Smartphone, text: "Responsive & Mobile-First Design" },
                      { icon: TrendingUp, text: "Performance Optimization" },
                      { icon: Users, text: "Team Collaboration & Mentoring" },
                      { icon: Rocket, text: "MVP Development & Launch" }
                    ].map((service, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <service.icon className="w-4 h-4 text-orange-500" />
                        <span className="text-gray-300">{service.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <AnimatedShinyText className="text-lg text-gray-300">
              Every great project starts with a simple conversation
            </AnimatedShinyText>
          </div>
        </div>
      </section>
    </div>
  );
}
