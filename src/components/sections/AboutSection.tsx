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

 

// Holographic Card with Glitch Effect
const HolographicCard = ({ profileImage }: { profileImage?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);
    }, 5000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <motion.div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <Card className={`relative overflow-hidden backdrop-blur-xl border-2 h-[750px] md:h-[850px] ${
        theme === 'light' 
          ? 'bg-white/70 border-orange-200/50' 
          : 'bg-neutral-900/70 border-orange-500/30'
      }`}>
        <BorderBeam
          size={350}
          duration={isHovered ? 8 : 12}
          colorFrom="#F97316"
          colorTo="#EA580C"
        />
        
        {/* Holographic shimmer overlay */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br ${
            theme === 'light'
              ? 'from-orange-300/20 via-purple-300/20 to-blue-300/20'
              : 'from-orange-500/20 via-purple-500/20 to-blue-500/20'
          } animate-gradient`} />
        </div>

        {/* Profile Image Section (65% height) */}
        <div className="relative h-[60%] p-6">
          <motion.div
            className="relative w-full h-full"
            variants={glitchVariants}
            animate={isGlitching ? "glitch" : "idle"}
          >
            {/* Profile image container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-orange-500/50">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${
                  theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'
                }`}>
                  <Users className="w-24 h-24 text-slate-400" />
                </div>
              )}

              {/* Scan line effect (clipped inside) */}
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/15 to-transparent"
                animate={{ y: [-500, 500] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* RGB separation effect on hover */}
              {isHovered && (
                <>
                  <div className="absolute inset-0 mix-blend-screen opacity-60">
                    <div className="absolute inset-0 bg-red-500 transform translate-x-1" />
                  </div>
                  <div className="absolute inset-0 mix-blend-screen opacity-60">
                    <div className="absolute inset-0 bg-blue-500 transform -translate-x-1" />
                  </div>
                </>
              )}
            </div>

            {/* Floating data points */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                y: [0, -5, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Badge className="bg-green-500 text-white border-0">
                <span className="animate-pulse">● ONLINE</span>
              </Badge>
            </motion.div>
          </motion.div>
        </div>

        {/* Info Section (40% height) */}
        <CardContent className="p-8 pt-4 pb-6 h-[40%] relative z-10">
          <div className="h-full flex flex-col justify-between">
            {/* Name, Role, and Location */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-left space-y-3">
                <div className="space-y-2">
                  <h3 className={`text-4xl xl:text-5xl font-extrabold tracking-tight leading-none ${
                    theme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    <TypeWriter text="Andreas Kyriakou" delay={1} />
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
                </div>
                
                <p className="text-orange-500 font-bold text-sm tracking-wide">
                  <TypeWriter text="Full-Stack Developer & Designer" delay={1.3} speed={0.02} />
                </p>
                
                <div className="flex items-center justify-start gap-3 pt-1">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span className={`text-lg font-medium ${
                    theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    <TypeWriter text="Nicosia, Cyprus" delay={1.6} speed={0.02} />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex justify-start gap-4 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg border transition-all shadow-md hover:shadow-lg relative z-20 ${
                    theme === 'light'
                      ? 'bg-white/90 border-slate-200/60 hover:border-orange-500/50 hover:bg-orange-50'
                      : 'bg-neutral-800/70 border-neutral-700/60 hover:border-orange-500/50 hover:bg-orange-950/40'
                  }`}
                >
                  <social.icon className="w-6 h-6 text-orange-500" />
                </motion.a>
              ))}
            </motion.div>

            {/* Contact Button */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
            >
              <Button className="w-full group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <MessageCircle className="w-4 h-4 mr-2" />
                Let's Connect
                <ArrowRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
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
              <HolographicCard />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
