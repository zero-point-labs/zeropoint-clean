'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FlickeringGrid } from '@/components/magicui/FlickeringGrid';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Project data for websites
const websiteProjects = [
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
    liveUrl: 'https://example.com'
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
    liveUrl: 'https://example.com'
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
    liveUrl: 'https://example.com'
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
    liveUrl: 'https://example.com'
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
    liveUrl: 'https://example.com'
  }
];

export default function WebsitesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
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
      // Parallax background effect
      if (backgroundRef.current) {
        gsap.to(backgroundRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // Header entrance animation
      gsap.fromTo('.header-content', 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1
        }
      );

      // Staggered card reveal animations
      gsap.fromTo('.project-card', 
        { 
          y: 80, 
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Individual card hover enhancements
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(cardElement, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(cardElement.querySelector('.card-glow'), {
            opacity: 1,
            duration: 0.3
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(cardElement.querySelector('.card-glow'), {
            opacity: 0,
            duration: 0.3
          });
        });
      });

      // Smooth scroll progress indicator
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
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
    <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="scroll-progress h-full bg-gradient-to-r from-orange-400 to-red-500 origin-left scale-x-0"
        />
      </div>

      {/* Flickering Grid Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={4}
          gridGap={6}
          color="#ffffff"
          maxOpacity={0.08}
          flickerChance={0.06}
        />
        
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 20%, rgba(255, 140, 0, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, rgba(255, 69, 0, 0.05) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 60%, rgba(255, 165, 0, 0.04) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-20">
          <div className="max-w-7xl mx-auto">
            {/* Title with Back Button */}
            <div className="text-center header-content">
              <div className="flex items-center justify-center mb-4">
                <Link 
                  href="/floating-islands-optimized"
                  className="inline-flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors duration-300 group mr-6"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xs">←</span>
                  </div>
                  <span className="font-medium text-sm">Back</span>
                </Link>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  WEBSITES PORTFOLIO
                </h1>
              </div>
              <p className="text-orange-300/80 text-sm sm:text-base">Digital Presence Solutions</p>
            </div>
          </div>
        </header>

        {/* Vertical Project Showcase */}
        <main>
          {websiteProjects.map((project, index) => (
            <section 
              key={project.id}
              className="project-card min-h-screen flex items-center relative"
              style={{ 
                paddingTop: index === 0 ? '2rem' : '8rem',
                paddingBottom: '8rem'
              }}
            >
              {/* Enhanced Glow Effect */}
              <div 
                className="card-glow absolute inset-0 opacity-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 140, 0, 0.15) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  
                  {/* Project Visual - Alternating sides */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <Link href={`/websites/${project.id}`} className="group block">
                      <div className="relative">
                        {/* Large Project Preview */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-500">
                          <Image
                            src={project.preview}
                            alt={project.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          
                          {/* Floating "View Project" indicator */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="px-8 py-4 bg-orange-500/90 backdrop-blur-sm rounded-full text-white font-semibold shadow-lg">
                              View Project →
                            </div>
                          </div>
                        </div>

                        {/* Floating Tech Stack */}
                        <div className="absolute -top-4 -right-4 flex flex-wrap gap-2 justify-end max-w-xs">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm text-orange-300 backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm text-orange-300 backdrop-blur-sm">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Project Details */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    
                    {/* Project Number */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-6xl font-black text-orange-500/20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="w-16 h-px bg-orange-500/30"></div>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                        <Image
                          src={project.logo}
                          alt={project.client}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-1">
                          {project.title}
                        </h2>
                        <p className="text-orange-400 text-lg font-medium">{project.client}</p>
                        <p className="text-gray-400 text-sm">{project.type}</p>
                      </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-orange-400 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        Challenge
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-orange-400 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        Solution
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-orange-400 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                        Results
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project.results.slice(0, 2).map((result, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                            <p className="text-gray-300">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Link
                        href={`/websites/${project.id}`}
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 text-center"
                      >
                        View Full Case Study
                      </Link>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-orange-500/30 text-orange-400 font-semibold rounded-xl hover:bg-orange-500/10 transition-all duration-300 text-center"
                      >
                        Visit Live Site
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Separator */}
              {index < websiteProjects.length - 1 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-orange-500/50 to-transparent"></div>
              )}
            </section>
          ))}
        </main>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
