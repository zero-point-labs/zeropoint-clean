'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { AuroraText } from '@/components/magicui/aurora-text';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import { FlickeringGrid } from '@/components/magicui/FlickeringGrid';
import { MinimalGrid } from '@/components/magicui/MinimalGrid';
import { useTheme } from '@/lib/theme-context';
import { 
  MapPin,
  MessageCircle,
  ArrowRight,
  Send,
  Zap,
  Clock,
  Sparkles,
  Star,
  Rocket,
  CheckCircle
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const [profileMousePos, setProfileMousePos] = useState({ x: 0, y: 0 });
  const [aiMousePos, setAiMousePos] = useState({ x: 0, y: 0 });
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isAiHovered, setIsAiHovered] = useState(false);
  const [message, setMessage] = useState('');
  const { theme } = useTheme();

  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
    const profile = profileRef.current;
    const ai = aiRef.current;
    
    if (!container) {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      return;
    }

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      
      // Hero section animations
      if (hero) {
        gsap.fromTo('.hero-title',
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2
          }
        );

        gsap.fromTo('.hero-subtitle',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.4
          }
        );
      }

      // Profile floating animation
      if (profile) {
        gsap.to(profile, {
          y: "+=30",
          rotation: 3,
          duration: 6,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // AI assistant floating animation
      if (ai) {
        gsap.to(ai, {
          y: "+=25",
          rotation: -3,
          duration: 5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1
        });
      }

      // Parallax effects
      gsap.to('.background-layer', {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Reveal animations
      gsap.fromTo('.team-member',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.team-section',
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, container);

    // Cleanup
    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setProfileMousePos({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    });
  };

  const handleAiMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setAiMousePos({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Background Layer */}
      <div className="background-layer absolute inset-0">
        {/* Flickering Grid Background */}
        <FlickeringGrid 
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(249, 115, 22)"
          maxOpacity={0.15}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Minimal Grid Overlay */}
        <MinimalGrid
          className="absolute inset-0"
          gridSize={60}
          strokeWidth={0.5}
          color="rgb(255, 140, 0)"
          opacity={0.05}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 via-transparent to-orange-600/5" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          {/* Badge */}
          <div className="mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <div className="px-6 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-orange-500/30">
                <AnimatedShinyText className="text-orange-400 font-semibold text-sm tracking-wider">
                  ⚡ ZERO POINT LABS TEAM ⚡
                </AnimatedShinyText>
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <div className="hero-title mb-6">
            <h1 className="text-5xl md:text-7xl font-bold">
              <SparklesText 
                className="inline-block"
                colors={{ first: "#F97316", second: "#EA580C" }}
                sparklesCount={8}
              >
                Meet Our
              </SparklesText>{" "}
              <AuroraText 
                className="inline-block"
                colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}
              >
                Team
              </AuroraText>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            The perfect blend of human creativity and AI-powered efficiency
          </p>
        </div>
      </section>

      {/* Team Section - Side by Side */}
      <section className="team-section relative z-10 pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-start gap-8 md:gap-16 max-w-6xl mx-auto">
            
            {/* Andreas Profile - No Card */}
            <motion.div
              ref={profileRef}
              className="team-member flex-1 max-w-[280px] md:max-w-sm"
              onMouseMove={handleProfileMouseMove}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => {
                setIsProfileHovered(false);
                setProfileMousePos({ x: 0, y: 0 });
              }}
              style={{
                transform: `
                  perspective(1000px)
                  rotateX(${isProfileHovered ? profileMousePos.y * -10 : 0}deg)
                  rotateY(${isProfileHovered ? profileMousePos.x * 10 : 0}deg)
                  translateZ(${isProfileHovered ? 20 : 0}px)
                `,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* Profile Content */}
              <div className="relative text-center">
                {/* Profile Image Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                  {/* Glow Effects */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-orange-600/40 rounded-full blur-2xl animate-pulse"
                    style={{ transform: 'translateZ(-20px)' }}
                  />
                  
                  {/* Image */}
                  <Image
                    src="/about-us-profile.jpeg"
                    alt="Andreas Kyriakou"
                    width={160}
                    height={160}
                    className="relative rounded-full object-cover border-4 border-orange-500/30 shadow-2xl w-full h-full"
                    style={{
                      filter: 'contrast(1.1) saturate(1.1)',
                      transform: `translateZ(30px) scale(${isProfileHovered ? 1.05 : 1})`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  />
                  
                  {/* Status Indicator */}
                  <div 
                    className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center"
                    style={{
                      transform: 'translateZ(40px)',
                      boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)'
                    }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Andreas Kyriakou</h3>
                <p className="text-orange-400 font-semibold text-base md:text-lg mb-3">
                  Full-Stack Developer & Designer
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-400 text-sm">Nicosia, Cyprus</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-orange-500/10 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg md:text-xl font-bold text-orange-400">5+</div>
                    <div className="text-[10px] text-gray-400">Years</div>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg md:text-xl font-bold text-orange-400">50+</div>
                    <div className="text-[10px] text-gray-400">Projects</div>
                  </div>
                  <div className="bg-orange-500/10 rounded-lg p-2 backdrop-blur-sm">
                    <div className="text-lg md:text-xl font-bold text-orange-400">100%</div>
                    <div className="text-[10px] text-gray-400">Quality</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1 mb-6">
                  {['React', 'Next.js', 'TypeScript', 'UI/UX'].map((skill) => (
                    <Badge 
                      key={skill}
                      className="text-[10px] md:text-xs bg-black/40 text-orange-400 border-orange-500/30 backdrop-blur-sm px-2 py-0.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 text-sm"
                >
                  <MessageCircle className="w-3 h-3 mr-2" />
                  Contact
                </Button>
              </div>
            </motion.div>

            {/* AI Assistant - No Card */}
            <motion.div
              ref={aiRef}
              className="team-member flex-1 max-w-[280px] md:max-w-sm"
              onMouseMove={handleAiMouseMove}
              onMouseEnter={() => setIsAiHovered(true)}
              onMouseLeave={() => {
                setIsAiHovered(false);
                setAiMousePos({ x: 0, y: 0 });
              }}
              style={{
                transform: `
                  perspective(1000px)
                  rotateX(${isAiHovered ? aiMousePos.y * -10 : 0}deg)
                  rotateY(${isAiHovered ? aiMousePos.x * 10 : 0}deg)
                  translateZ(${isAiHovered ? 20 : 0}px)
                `,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* AI Content */}
              <div className="relative text-center">
                {/* AI Image Container */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                  {/* Glow Effects */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/50 to-orange-500/40 rounded-full blur-2xl animate-pulse"
                    style={{ transform: 'translateZ(-20px)' }}
                  />
                  
                  {/* Floating Particles */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                      style={{
                        left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 45}%`,
                        top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 45}%`,
                        animation: `float ${3 + i * 0.5}s infinite ease-in-out ${i * 0.2}s`,
                        transform: 'translateZ(50px)',
                        boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
                      }}
                    />
                  ))}
                  
                  {/* AI Image */}
                  <Image
                    src="/ai-assistand.png"
                    alt="Zara AI Assistant"
                    width={160}
                    height={160}
                    className="relative w-full h-full object-contain"
                    style={{
                      filter: `
                        contrast(1.2) 
                        saturate(1.2) 
                        drop-shadow(0 10px 25px rgba(251, 191, 36, 0.5))
                      `,
                      transform: `translateZ(30px) scale(${isAiHovered ? 1.1 : 1})`,
                      transition: 'transform 0.5s ease-out'
                    }}
                  />
                  
                  {/* Status Indicator */}
                  <div 
                    className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center"
                    style={{
                      transform: 'translateZ(40px)',
                      boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)'
                    }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Meet Zara</h3>
                <p className="text-yellow-400 font-semibold text-base md:text-lg mb-3">
                  AI Developer Assistant
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-3 h-3 text-green-500" />
                  <span className="text-green-500 font-medium text-sm">Online 24/7</span>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-yellow-500/10 rounded-lg p-2 backdrop-blur-sm">
                    <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <div className="text-[10px] text-gray-400">Instant</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-2 backdrop-blur-sm">
                    <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <div className="text-[10px] text-gray-400">Smart</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-2 backdrop-blur-sm">
                    <Rocket className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                    <div className="text-[10px] text-gray-400">Fast</div>
                  </div>
                </div>

                {/* Capabilities */}
                <div className="flex flex-wrap justify-center gap-1 mb-6">
                  {['Code', 'Debug', 'Deploy', 'Optimize'].map((capability) => (
                    <Badge 
                      key={capability}
                      className="text-[10px] md:text-xs bg-black/40 text-yellow-400 border-yellow-500/30 backdrop-blur-sm px-2 py-0.5"
                    >
                      {capability}
                    </Badge>
                  ))}
                </div>

                {/* Chat Button */}
                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 text-sm"
                >
                  <MessageCircle className="w-3 h-3 mr-2" />
                  Chat Now
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section - Combined Info */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-20"
          >
            {/* Stats Bar */}
            <div className="flex justify-center gap-8 md:gap-16 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">50+</div>
                <div className="text-sm text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">24/7</div>
                <div className="text-sm text-gray-400">AI Support</div>
              </div>
            </div>

            {/* Chat Interface */}
            <div className="max-w-2xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold">Chat with Our Team</h3>
              </div>
              
              <div className="bg-black/40 rounded-xl p-4 mb-4 text-left">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-300">
                    Hi! I'm Zara, working alongside Andreas. How can we help you build something amazing today?
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Ask about our services..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-black/40 border-orange-500/30 text-white placeholder:text-gray-500"
                />
                <Button 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Questions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {[
                  'What services do you offer?',
                  'How much for a website?',
                  'What\'s your process?',
                  'View portfolio'
                ].map((question) => (
                  <button
                    key={question}
                    onClick={() => setMessage(question)}
                    className="p-3 rounded-lg bg-black/30 border border-orange-500/20 text-xs md:text-sm text-gray-300 hover:bg-orange-500/10 hover:border-orange-500/40 transition-all"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg"
              className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) translateZ(50px);
          }
          50% { 
            transform: translateY(-8px) translateX(3px) translateZ(50px);
          }
        }
      `}</style>
    </div>
  );
}