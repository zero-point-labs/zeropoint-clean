'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// All project data - we'll use this for all categories for now
const allProjects = {
  websites: [
    {
      id: 'luxury-hotel',
      client: 'Grand Vista Resort',
      logo: '/zeropoint-logo.png',
      title: 'Luxury Hotel Website',
      preview: '/island-website.png',
      type: 'Hospitality Website',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS'],
      problem: 'Outdated booking system and poor mobile experience affecting reservations',
      solution: 'Modern responsive design with integrated booking system and virtual tours',
      results: ['40% increase in online bookings', '60% improvement in mobile conversion', '95% customer satisfaction'],
      liveUrl: 'https://example.com',
      category: 'websites',
      categoryName: 'Websites',
      color: {
        primary: '#ff8c00',
        secondary: '#ff6b35',
        glow: 'rgba(255, 140, 0, 0.6)'
      }
    },
    {
      id: 'tech-startup',
      client: 'InnovateTech',
      logo: '/zeropoint-logo.png',
      title: 'SaaS Landing Page',
      preview: '/island-website.png',
      type: 'SaaS Website',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe'],
      problem: 'Low conversion rates and unclear value proposition',
      solution: 'Data-driven design with A/B tested conversion funnels',
      results: ['200% increase in signups', '85% reduction in bounce rate', '$2M ARR achieved'],
      liveUrl: 'https://example.com',
      category: 'websites',
      categoryName: 'Websites',
      color: {
        primary: '#ff8c00',
        secondary: '#ff6b35',
        glow: 'rgba(255, 140, 0, 0.6)'
      }
    },
    {
      id: 'restaurant-chain',
      client: 'Bella Vista Restaurants',
      logo: '/zeropoint-logo.png',
      title: 'Restaurant Chain Portal',
      preview: '/island-website.png',
      type: 'Food & Beverage',
      technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
      problem: 'Multiple locations needed unified online presence and ordering system',
      solution: 'Multi-location platform with location-based menus and delivery integration',
      results: ['300% increase in online orders', '25 locations connected', '4.8/5 customer rating'],
      liveUrl: 'https://example.com',
      category: 'websites',
      categoryName: 'Websites',
      color: {
        primary: '#ff8c00',
        secondary: '#ff6b35',
        glow: 'rgba(255, 140, 0, 0.6)'
      }
    },
    {
      id: 'healthcare-clinic',
      client: 'MedCare Clinic',
      logo: '/zeropoint-logo.png',
      title: 'Healthcare Platform',
      preview: '/island-website.png',
      type: 'Healthcare Website',
      technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'HIPAA Compliant'],
      problem: 'Patient scheduling inefficiencies and poor information accessibility',
      solution: 'HIPAA-compliant patient portal with online scheduling and records',
      results: ['70% reduction in phone calls', '90% patient satisfaction', 'HIPAA compliance achieved'],
      liveUrl: 'https://example.com',
      category: 'websites',
      categoryName: 'Websites',
      color: {
        primary: '#ff8c00',
        secondary: '#ff6b35',
        glow: 'rgba(255, 140, 0, 0.6)'
      }
    },
    {
      id: 'fashion-brand',
      client: 'Luxe Fashion',
      logo: '/zeropoint-logo.png',
      title: 'Fashion Brand Showcase',
      preview: '/island-website.png',
      type: 'Fashion & Retail',
      technologies: ['Gatsby', 'Shopify', 'GSAP', 'WebGL'],
      problem: 'Brand needed to showcase collections with immersive visual experience',
      solution: '3D product visualization with interactive lookbooks and AR try-on',
      results: ['150% increase in engagement', '80% improvement in time on site', '45% boost in sales'],
      liveUrl: 'https://example.com',
      category: 'websites',
      categoryName: 'Websites',
      color: {
        primary: '#ff8c00',
        secondary: '#ff6b35',
        glow: 'rgba(255, 140, 0, 0.6)'
      }
    }
  ]
};

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Find the project - for now we'll just use the first one as a template
  const project = allProjects.websites[0]; // We'll make this dynamic later

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

    // GSAP Animations
    const ctx = gsap.context(() => {
      
      // Hero parallax effect
      if (heroRef.current) {
        gsap.to('.hero-image', {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Floating orbs parallax
      gsap.to('.floating-orb', {
        yPercent: -50,
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Content sections reveal
      gsap.fromTo('.content-section', 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.content-sections',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo('.stat-item', 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.stats-section',
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    // Cleanup
    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
  
  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/websites" className="text-orange-400 hover:text-orange-300">
            ← Back to Websites
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-black text-white relative overflow-hidden">
      
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 180deg at 50% 50%, 
                ${project.color.primary}15 0deg, 
                transparent 60deg, 
                ${project.color.secondary}10 120deg, 
                transparent 180deg, 
                ${project.color.primary}08 240deg, 
                transparent 300deg, 
                ${project.color.secondary}12 360deg),
              radial-gradient(ellipse 80% 50% at 50% 120%, ${project.color.glow}20, transparent),
              radial-gradient(ellipse 60% 40% at 50% -20%, ${project.color.glow}15, transparent),
              linear-gradient(135deg, #000000 0%, #0a0a0f 25%, #151515 50%, #0a0a0f 75%, #000000 100%)
            `
          }}
        />
        
        {/* Animated Mesh Points */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`mesh-${i}`}
              className="floating-orb absolute rounded-full"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                width: `${60 + Math.random() * 40}px`,
                height: `${60 + Math.random() * 40}px`,
                background: `radial-gradient(circle, ${i % 2 === 0 ? project.color.primary : project.color.secondary}40 0%, transparent 70%)`,
                filter: 'blur(40px)',
                animation: `meshFloat ${20 + i * 5}s infinite ease-in-out ${i * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        
        {/* Immersive Hero Section */}
        <section ref={heroRef} className="min-h-screen relative overflow-hidden flex items-center">
          
          {/* Floating Navigation */}
          <div className="absolute top-8 left-8 z-30">
            <Link 
              href="/websites"
              className="group flex items-center space-x-3 bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full hover:bg-black/80 transition-all duration-300"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ 
                  background: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})`
                }}
              >
                <span className="text-white text-sm">←</span>
              </div>
              <span className="text-white font-medium">Back to Websites</span>
            </Link>
          </div>

          {/* Large Centered Project Showcase */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            
            {/* Project Title with Dramatic Typography */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <div 
                  className="w-24 h-24 rounded-full border-4 flex items-center justify-center mr-8"
                  style={{ 
                    backgroundColor: `${project.color.primary}20`,
                    borderColor: `${project.color.primary}60`
                  }}
                >
                  <Image
                    src={project.logo}
                    alt={project.client}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div className="text-left">
                  <h1 
                    className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})` }}
                  >
                    {project.title.split(' ').map((word, i) => (
                      <div key={i}>{word}</div>
                    ))}
                  </h1>
                  <p 
                    className="text-2xl font-bold mt-4"
                    style={{ color: project.color.primary }}
                  >
                    {project.client}
                  </p>
                </div>
              </div>
            </div>

            {/* Massive Hero Image with 3D Effect */}
            <div className="relative mb-16">
              <div className="hero-image relative mx-auto max-w-4xl">
                {/* 3D Container Effect */}
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-700"
                  style={{
                    boxShadow: `
                      0 50px 100px -20px ${project.color.glow}40,
                      0 30px 60px -12px ${project.color.glow}20,
                      inset 0 1px 0 rgba(255,255,255,0.1)
                    `,
                    background: `linear-gradient(145deg, ${project.color.primary}10, transparent)`
                  }}
                >
                  <Image
                    src={project.preview}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full aspect-[3/2] object-cover"
                  />
                  
                  {/* Overlay with Project Type */}
                  <div className="absolute top-6 left-6">
                    <div 
                      className="px-6 py-3 rounded-full backdrop-blur-xl border font-bold text-lg"
                      style={{
                        backgroundColor: `${project.color.primary}90`,
                        borderColor: `${project.color.secondary}60`,
                        color: 'white'
                      }}
                    >
                      {project.type}
                    </div>
                  </div>

                  {/* Bottom Gradient */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"
                  />
                </div>
                
                {/* Floating Tech Ecosystem */}
                <div className="absolute inset-0 pointer-events-none">
                  {project.technologies.map((tech, i) => {
                    const angle = (i * 360) / project.technologies.length;
                    const radius = 280;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <div
                        key={tech}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          animation: `techOrbit ${30 + i * 5}s infinite linear ${i * 2}s`
                        }}
                      >
                        <div 
                          className="px-4 py-2 rounded-full backdrop-blur-xl border font-semibold shadow-lg"
                          style={{
                            backgroundColor: `${project.color.primary}20`,
                            borderColor: `${project.color.primary}40`,
                            color: project.color.primary
                          }}
                        >
                          {tech}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                <button
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="group px-12 py-5 rounded-full font-bold text-white text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})`,
                    boxShadow: `0 20px 40px ${project.color.glow}30`
                  }}
                >
                  <span className="flex items-center space-x-3">
                    <span>Experience Live Site</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </button>
                
                <div 
                  className="px-8 py-4 rounded-full border-2 backdrop-blur-xl font-semibold"
                  style={{
                    borderColor: `${project.color.primary}50`,
                    color: project.color.primary,
                    backgroundColor: `${project.color.primary}05`
                  }}
                >
                  ↓ Scroll for Case Study
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Immersive Story Sections */}
        <div className="content-sections">
          
          {/* Problem Section - Dramatic Layout */}
          <section className="content-section min-h-screen flex items-center relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left - Large Problem Statement */}
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                      style={{ 
                        backgroundColor: `${project.color.primary}20`,
                        color: project.color.primary
                      }}
                    >
                      ⚠️
                    </div>
                    <h2 
                      className="text-4xl sm:text-5xl font-black"
                      style={{ color: project.color.primary }}
                    >
                      The Challenge
                    </h2>
                  </div>
                  
                  <p className="text-2xl text-gray-300 leading-relaxed font-light">
                    {project.problem}
                  </p>
                  
                  <div 
                    className="p-8 rounded-2xl border backdrop-blur-sm"
                    style={{
                      backgroundColor: `${project.color.primary}08`,
                      borderColor: `${project.color.primary}25`
                    }}
                  >
                    <p className="text-gray-400 text-lg italic">
                      "Every challenge is an opportunity to innovate and create something extraordinary."
                    </p>
                  </div>
                </div>

                {/* Right - Visual Problem Representation */}
                <div className="relative">
                  <div 
                    className="aspect-square rounded-full border-4 flex items-center justify-center text-center p-12"
                    style={{
                      backgroundColor: `${project.color.primary}05`,
                      borderColor: `${project.color.primary}30`,
                      background: `conic-gradient(from 0deg, ${project.color.primary}20, transparent, ${project.color.secondary}15, transparent)`
                    }}
                  >
                    <div>
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-2xl font-bold text-white mb-2">Core Issues</h3>
                      <p className="text-gray-400">Identified & Analyzed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Solution Section - Creative Layout */}
          <section className="content-section min-h-screen flex items-center relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center mb-16">
                <h2 
                  className="text-5xl sm:text-6xl font-black mb-8 bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})` }}
                >
                  Our Solution
                </h2>
                <p className="text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
                  {project.solution}
                </p>
              </div>

              {/* Tech Stack Constellation */}
              <div className="relative max-w-3xl mx-auto aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-32 h-32 rounded-full border-4 flex items-center justify-center text-4xl"
                    style={{
                      backgroundColor: `${project.color.primary}20`,
                      borderColor: `${project.color.primary}50`
                    }}
                  >
                    ⚡
                  </div>
                </div>
                
                {/* Orbiting Technologies */}
                {project.technologies.map((tech, i) => {
                  const angle = (i * 360) / project.technologies.length;
                  const radius = 180;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={tech}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        animation: `techOrbit ${40 + i * 3}s infinite linear ${i * 3}s`
                      }}
                    >
                      <div 
                        className="px-6 py-3 rounded-full backdrop-blur-xl border-2 font-bold shadow-xl text-lg"
                        style={{
                          backgroundColor: `${project.color.primary}25`,
                          borderColor: `${project.color.primary}60`,
                          color: 'white',
                          boxShadow: `0 10px 30px ${project.color.glow}40`
                        }}
                      >
                        {tech}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Results Section - Impact Dashboard */}
          <section className="content-section stats-section min-h-screen flex items-center relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="text-center mb-20">
                <h2 
                  className="text-5xl sm:text-6xl font-black mb-8"
                  style={{ color: project.color.primary }}
                >
                  Impact & Results
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Measurable outcomes that demonstrate the success of our solution
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {project.results.map((result, index) => (
                  <div 
                    key={index}
                    className="stat-item relative group"
                  >
                    {/* Glowing Card */}
                    <div 
                      className="relative p-12 rounded-3xl border-2 backdrop-blur-xl text-center transform group-hover:scale-105 transition-all duration-500"
                      style={{
                        backgroundColor: `${project.color.primary}08`,
                        borderColor: `${project.color.primary}30`,
                        boxShadow: `0 20px 60px ${project.color.glow}20`
                      }}
                    >
                      {/* Icon */}
                      <div 
                        className="w-24 h-24 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl"
                        style={{
                          background: `linear-gradient(135deg, ${project.color.primary}40, ${project.color.secondary}30)`,
                          boxShadow: `0 10px 30px ${project.color.glow}30`
                        }}
                      >
                        {index === 0 ? '📈' : index === 1 ? '📱' : '⭐'}
                      </div>
                      
                      {/* Result Text */}
                      <p className="text-white text-xl font-bold leading-relaxed">
                        {result}
                      </p>
                      
                      {/* Hover Glow */}
                      <div 
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${project.color.glow}15 0%, transparent 70%)`,
                          filter: 'blur(20px)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section - Premium Feel */}
          <section className="content-section min-h-screen flex items-center relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
              
              {/* Large CTA Title */}
              <div className="mb-16">
                <h2 className="text-6xl sm:text-7xl font-black text-white mb-8 leading-tight">
                  Ready to Create
                  <span 
                    className="block bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})` }}
                  >
                    Something Amazing?
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  Let's transform your digital presence with innovative solutions that drive real business results.
                </p>
              </div>

              {/* Premium Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <button
                  className="group relative px-16 py-6 rounded-full font-black text-white text-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})`,
                    boxShadow: `0 30px 60px ${project.color.glow}40`
                  }}
                >
                  <span className="relative z-10 flex items-center space-x-4">
                    <span>Start Your Project</span>
                    <span className="group-hover:translate-x-3 transition-transform duration-300 text-3xl">🚀</span>
                  </span>
                  
                  {/* Animated Background */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${project.color.secondary}, ${project.color.primary})`
                    }}
                  />
                </button>
                
                <Link
                  href="/websites"
                  className="group px-12 py-5 rounded-full border-3 backdrop-blur-xl font-bold text-xl hover:scale-105 transition-all duration-500"
                  style={{
                    borderColor: `${project.color.primary}60`,
                    color: project.color.primary,
                    backgroundColor: `${project.color.primary}08`
                  }}
                >
                  <span className="flex items-center space-x-3">
                    <span>View More Projects</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes meshFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-30px) translateX(15px) scale(1.2) rotate(90deg);
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-15px) translateX(30px) scale(0.8) rotate(180deg);
            opacity: 0.5;
          }
          75% { 
            transform: translateY(15px) translateX(8px) scale(1.1) rotate(270deg);
            opacity: 0.7;
          }
        }

        @keyframes techOrbit {
          0% { 
            transform: translate(-50%, -50%) rotate(0deg) translateX(180px) rotate(0deg);
          }
          100% { 
            transform: translate(-50%, -50%) rotate(360deg) translateX(180px) rotate(-360deg);
          }
        }

        @keyframes heroGlow {
          0%, 100% { 
            opacity: 0.3;
            transform: scale(1);
          }
          50% { 
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
}
