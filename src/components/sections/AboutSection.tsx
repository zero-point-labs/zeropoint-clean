"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  EnhancedGrid,
  FloatingDots,
  GradientMesh,
  CleanTexture,
  SimpleGlow
} from "@/components/magicui/MinimalBackgrounds";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { FlickeringGrid } from "@/components/magicui/FlickeringGrid";
import { useTheme } from "@/lib/theme-context";
import { 
  Code, 
  Palette,
  Users,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  ArrowRight,
  Globe,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Cpu,
  Layers,
  GitBranch
} from "lucide-react";

// Types
interface Skill {
  name: string;
  icon: React.ElementType;
  level: number;
  category: "frontend" | "backend" | "design" | "other";
}

 

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const glitchVariants: Variants = {
  idle: { x: 0, opacity: 1 },
  glitch: {
    x: [-2, 2, -1, 1, 0],
    opacity: [1, 0.8, 1, 0.9, 1],
    transition: {
      x: { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] },
      opacity: { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] },
    },
  },
};

// Typewriter component
const TypeWriter = ({ text, delay = 0, speed = 0.03 }: { text: string; delay?: number; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [isTyping, text, speed]);

  return (
    <span>
      {displayedText}
      {isTyping && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-orange-500 ml-1"
        />
      )}
    </span>
  );
};

 

// Modern Minimal Tech Profile Card
const ModernProfileCard = ({ profileImage }: { profileImage?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-white" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  ];

  const statusItems = [
    { label: "Available", color: "bg-green-500" },
    { label: "Remote", color: "bg-blue-500" },
  ];

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Main Card */}
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden rounded-3xl ${
        theme === 'light' 
            ? 'bg-white shadow-2xl' 
            : 'bg-neutral-900'
        }`}
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`
        } as React.CSSProperties}>
        
        {/* Subtle gradient border */}
        <div className="absolute inset-0 p-[1px] rounded-3xl bg-gradient-to-br from-orange-500/50 via-transparent to-orange-600/50">
          <div className={`w-full h-full rounded-3xl ${
            theme === 'light' ? 'bg-white' : 'bg-neutral-900'
          }`} />
        </div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Profile Image Section */}
          <div className="relative h-[400px] overflow-hidden group">
            {/* Main Image Container */}
          <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Base Image with Filters */}
              <img 
                src={profileImage || "/about-us-profile.jpeg"} 
                alt="Andreas Kyriakou" 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isHovered 
                    ? 'contrast-110 brightness-105' 
                    : 'contrast-100 brightness-100'
                }`}
                style={{
                  filter: isHovered 
                    ? 'saturate(0.9) hue-rotate(-5deg)' 
                    : 'saturate(0.85)'
                }}
              />
              
              {/* Duotone Effect Layer */}
              <div 
                className="absolute inset-0 mix-blend-multiply transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  opacity: isHovered ? 0.15 : 0.25
                }}
              />
              
              {/* Contrast Enhancement Layer */}
              <div className="absolute inset-0 mix-blend-overlay">
                <div className="w-full h-full bg-gradient-to-br from-white/20 to-black/20" />
            </div>

              {/* Dynamic Mesh Gradient Overlay */}
              <motion.div 
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)',
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Gradient overlay for text readability */}
              <div className={`absolute inset-0 bg-gradient-to-t ${
                theme === 'light'
                  ? 'from-white via-transparent to-transparent'
                  : 'from-neutral-900 via-transparent to-transparent'
              }`} />
            </motion.div>

            {/* Animated Scan Lines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                backgroundPosition: isHovered ? '0 -10px' : '0 0' 
              }}
              transition={{
                duration: 0.3,
                ease: "linear"
              }}
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(249, 115, 22, 0.03) 2px,
                  rgba(249, 115, 22, 0.03) 4px
                )`,
                backgroundSize: '100% 4px'
              }}
            />

            {/* RGB Split Effect on Hover */}
            {isHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div className="absolute inset-0" 
                    style={{
                      background: 'linear-gradient(90deg, rgba(255,0,0,0.1) 0%, transparent 50%, rgba(0,0,255,0.1) 100%)',
                      mixBlendMode: 'screen',
                      transform: 'translateX(-2px)'
                    }}
                  />
                </motion.div>
              </>
            )}

            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <pattern id="tech-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="rgba(249, 115, 22, 0.3)" />
                    <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="rgba(249, 115, 22, 0.1)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#tech-pattern)" />
              </svg>
            </div>

            {/* Noise Texture */}
            <div 
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.02' /%3E%3C/svg%3E")`,
              }}
            />

            {/* Status badges */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
              {statusItems.map((status, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 ${
                    theme === 'light'
                      ? 'bg-white/90 shadow-lg'
                      : 'bg-black/50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
                  <span className={`text-xs font-medium ${
                    theme === 'light' ? 'text-slate-700' : 'text-white'
                  }`}>{status.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Corner Accent */}
            <motion.div
              className="absolute top-0 left-0 w-20 h-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-full h-full" viewBox="0 0 80 80">
                <path 
                  d="M0 0 L80 0 L0 80 Z" 
                  fill="none" 
                  stroke="rgba(249, 115, 22, 0.3)" 
                  strokeWidth="1"
                />
                <path 
                  d="M0 20 L20 0" 
                  fill="none" 
                  stroke="rgba(249, 115, 22, 0.5)" 
                  strokeWidth="2"
                />
              </svg>
          </motion.div>
        </div>

          {/* Info Section */}
          <div className="relative px-8 pt-6 pb-8">
            {/* Name and Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h3 className={`text-3xl font-bold tracking-tight mb-2 ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                Andreas Kyriakou
                  </h3>
              
              <div className="flex items-center gap-3 mb-4">
                <p className="text-orange-500 font-semibold">
                  Full-Stack Developer
                </p>
                <span className={`${theme === 'light' ? 'text-slate-300' : 'text-neutral-600'}`}>•</span>
                <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  UI/UX Designer
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-500/70" />
                <span className={theme === 'light' ? 'text-slate-600' : 'text-slate-400'}>
                  Nicosia, Cyprus
                  </span>
              </div>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-700'
                      : 'bg-neutral-800 border-neutral-700 text-slate-300'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Separator */}
            <div className={`h-px mb-6 ${
              theme === 'light' ? 'bg-slate-200' : 'bg-neutral-800'
            }`} />

            {/* Social Links - Minimal Style */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-1">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.05 }}
                    onMouseEnter={() => setActiveLink(index)}
                    onMouseLeave={() => setActiveLink(null)}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      theme === 'light'
                        ? 'hover:bg-slate-100'
                        : 'hover:bg-neutral-800'
                    }`}
                  >
                    <social.icon className={`w-5 h-5 transition-colors duration-300 ${
                      activeLink === index 
                        ? social.color 
                        : theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`} />
                  </motion.a>
                ))}
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className={`px-4 py-2 rounded-full text-xs font-medium ${
                  theme === 'light'
                    ? 'bg-orange-50 text-orange-600'
                    : 'bg-orange-950/50 text-orange-400'
                }`}
              >
                5+ Years Experience
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex gap-3"
            >
              <Button 
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0"
              >
                <span className="relative z-10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                  Let's Talk
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.2 }}
                />
              </Button>
              
              <Button 
                variant="outline" 
                className={`group ${
                  theme === 'light'
                    ? 'border-slate-200 hover:bg-slate-50'
                    : 'border-neutral-700 hover:bg-neutral-800'
                }`}
              >
                <span className="flex items-center">
                  CV
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Interactive hover effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.1), transparent 40%)"
              : "radial-gradient(600px circle at 50% 50%, transparent, transparent 40%)"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute -z-10 top-10 -right-10 w-32 h-32 rounded-full bg-orange-500/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute -z-10 bottom-10 -left-10 w-40 h-40 rounded-full bg-orange-600/10 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
};

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { theme } = useTheme();


  // Data
  const skills: Skill[] = [
    { name: "React/Next.js", icon: Code, level: 95, category: "frontend" },
    { name: "TypeScript", icon: Code, level: 90, category: "frontend" },
    { name: "Node.js", icon: Cpu, level: 85, category: "backend" },
    { name: "UI/UX Design", icon: Palette, level: 88, category: "design" },
    { name: "Tailwind CSS", icon: Layers, level: 92, category: "frontend" },
    { name: "Database Design", icon: Database, level: 80, category: "backend" },
    { name: "Cloud Services", icon: Cloud, level: 82, category: "backend" },
    { name: "Web Security", icon: Shield, level: 78, category: "other" },
    { name: "Mobile Dev", icon: Smartphone, level: 75, category: "other" },
    { name: "Git/Version Control", icon: GitBranch, level: 90, category: "other" },
    { name: "API Development", icon: Globe, level: 88, category: "backend" },
    { name: "Figma", icon: Palette, level: 85, category: "design" },
  ];





  return (
    <motion.section
      ref={sectionRef}
      className={`relative min-h-screen py-20 md:py-24 overflow-hidden ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-slate-50 via-white to-orange-50/20' 
          : 'bg-[#0A0A0A]'
      }`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Background: Flickering Grid */}
      <div className="absolute inset-0">
        <FlickeringGrid 
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(249, 115, 22)"
          maxOpacity={0.4}
          className="w-full h-full"
        />
        {/* Black overlay to reduce brightness */}
        <div className={`absolute inset-0 ${
          theme === 'light' 
            ? 'bg-black/20' 
            : 'bg-black/40'
        }`} />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 xl:gap-24">
          {/* Left Panel (60% on desktop) */}
          <div className="lg:col-span-3 space-y-8 max-w-2xl">
            {/* Section Header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className={`text-4xl md:text-5xl font-bold ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                <SparklesText 
                  className="inline-block"
                  colors={{ first: "#F97316", second: "#EA580C" }}
                >
                  About
                </SparklesText>{" "}
                <AuroraText 
                  className="inline-block"
                  colors={["#FDE047", "#FDBA74", "#F97316", "#EA580C"]}
                >
                  Zeropoint
                </AuroraText>
              </h2>
              <Separator className="w-20 bg-orange-500" />
            </motion.div>

            {/* Main Description with Typewriter */}
            <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
              <p className={`text-lg leading-relaxed max-w-xl ${
                theme === 'light' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                <TypeWriter 
                  text="We are a cutting-edge web development agency based in Cyprus, specializing in creating stunning digital experiences that drive results."
                  delay={0.5}
                  speed={0.02}
                />
              </p>
            </motion.div>

            

            {/* Core Skills */}
            <motion.div variants={itemVariants}>
              <h3 className={`text-2xl font-bold mb-6 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                Core Expertise
              </h3>
              
              <motion.div 
                className="grid grid-cols-2 gap-3 max-w-lg"
                layout
              >
                {skills.slice(0, 6).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`group relative p-4 rounded-lg border backdrop-blur-sm overflow-hidden ${
                      theme === 'light'
                        ? 'bg-white/70 border-slate-200/50 hover:border-orange-500/50'
                        : 'bg-neutral-900/50 border-neutral-700/50 hover:border-orange-500/50'
                    }`}
                  >
                    {/* Skill level background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    <div className="relative z-10 flex items-center gap-3">
                      <skill.icon className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform" />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          theme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>{skill.name}</p>
                        <div className="mt-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>


          </div>

          {/* Right Panel (40% on desktop) */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <ModernProfileCard profileImage="/about-us-profile.jpeg" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
