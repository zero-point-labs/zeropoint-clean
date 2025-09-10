"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code2, 
  Zap, 
  Layers, 
  Rocket,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Globe
} from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useTheme } from "@/lib/theme-context";

// Tech stack data with proper orange theme and better orbital setup
const techStack = [
  {
    name: "TypeScript",
    icon: "TS",
    color: "#ff8c00",
    size: 56,
    orbitRadius: 180,
    speed: 120,
    offset: 0,
    description: "Type-safe development"
  },
  {
    name: "Next.js",
    icon: "▲",
    color: "#ff6347",
    size: 52,
    orbitRadius: 240,
    speed: 140,
    offset: 60,
    description: "Full-stack React framework"
  },
  {
    name: "Tailwind",
    icon: "💨",
    color: "#ff4500",
    size: 48,
    orbitRadius: 160,
    speed: 90,
    offset: 120,
    description: "Utility-first CSS"
  },
  {
    name: "Framer",
    icon: "F",
    color: "#ffa500",
    size: 50,
    orbitRadius: 280,
    speed: 160,
    offset: 180,
    description: "Motion & animations"
  },
  {
    name: "Vite",
    icon: "⚡",
    color: "#ff7f00",
    size: 44,
    orbitRadius: 140,
    speed: 80,
    offset: 240,
    description: "Lightning fast builds"
  },
  {
    name: "Node.js",
    icon: "🟢",
    color: "#1e90ff",
    size: 54,
    orbitRadius: 320,
    speed: 180,
    offset: 300,
    description: "JavaScript runtime"
  }
];

// Features data with proper orange theme
const reactFeatures = [
  {
    icon: Code2,
    title: "Component-Based",
    description: "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Virtual DOM and optimized rendering make React applications incredibly fast and responsive.",
    gradient: "from-orange-600 to-orange-500"
  },
  {
    icon: Layers,
    title: "Ecosystem Rich",
    description: "Massive ecosystem with thousands of libraries, tools, and resources for every use case.",
    gradient: "from-red-500 to-orange-600"
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Used by Facebook, Netflix, Airbnb, and thousands of companies worldwide in production.",
    gradient: "from-blue-500 to-orange-500"
  }
];

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Orbiting Tech Logo Component with Fixed Distribution
const OrbitingLogo = ({ tech, index, isInView }: { tech: typeof techStack[0], index: number, isInView: boolean }) => {
  const { theme } = useTheme();
  const [rotation, setRotation] = useState(tech.offset); // Start with the offset instead of 0
  
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, tech.speed);
    
    return () => clearInterval(interval);
  }, [isInView, tech.speed]);
  
  // Calculate position using current rotation (which already includes initial offset)
  const currentAngle = rotation * (Math.PI / 180);
  const x = Math.cos(currentAngle) * tech.orbitRadius;
  const y = Math.sin(currentAngle) * tech.orbitRadius;
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        zIndex: 40,
      }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 20 }}
      transition={{ delay: 1 + index * 0.15, duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={`relative flex items-center justify-center rounded-full border-2 backdrop-blur-md font-bold cursor-pointer group transition-all duration-300 ${
          theme === 'light' 
            ? 'bg-white/95 border-orange-300/70 hover:border-orange-500/80 shadow-xl hover:shadow-2xl' 
            : 'bg-neutral-800/95 border-orange-500/60 hover:border-orange-400/80 shadow-2xl hover:shadow-orange-500/20'
        }`}
        style={{
          width: `${tech.size}px`,
          height: `${tech.size}px`,
          color: tech.color,
          boxShadow: `0 0 20px ${tech.color}30, inset 0 0 10px ${tech.color}10`,
        }}
        whileHover={{ 
          scale: 1.3,
          boxShadow: `0 0 30px ${tech.color}50, inset 0 0 15px ${tech.color}20`,
          }}
          animate={{
            boxShadow: [
              `0 0 15px ${tech.color}40, inset 0 0 8px ${tech.color}15`,
              `0 0 20px ${tech.color}50, inset 0 0 10px ${tech.color}20`,
              `0 0 15px ${tech.color}40, inset 0 0 8px ${tech.color}15`
            ]
          }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <span className="text-base font-bold relative z-10">{tech.icon}</span>
        
        {/* Tooltip */}
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 backdrop-blur-md ${
          theme === 'light' 
            ? 'bg-slate-900/95 text-white border border-slate-600/50' 
            : 'bg-white/95 text-slate-800 border border-white/30'
        }`}>
          <div className="font-semibold">{tech.name}</div>
          <div className="text-xs opacity-80 mt-1">{tech.description}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// React Text Label Component - Like an orbiting logo but fixed position
const ReactTextLabel = ({ isInView }: { isInView: boolean }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="absolute"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(-50%, calc(-50% - 180px))`, // Position above the React logo
        zIndex: 40,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <motion.div
        className={`relative flex items-center justify-center rounded-xl border-2 backdrop-blur-md font-bold cursor-pointer group transition-all duration-300 px-4 py-2 ${
          theme === 'light' 
            ? 'bg-white/95 border-orange-300/70 hover:border-orange-500/80 shadow-xl hover:shadow-2xl' 
            : 'bg-neutral-800/95 border-orange-500/60 hover:border-orange-400/80 shadow-2xl hover:shadow-orange-500/20'
        }`}
        style={{
          color: '#ff8c00',
          boxShadow: `0 0 20px #ff8c0030, inset 0 0 10px #ff8c0010`,
        }}
        whileHover={{ 
          scale: 1.3,
          boxShadow: `0 0 30px #ff8c0050, inset 0 0 15px #ff8c0020`,
        }}
        animate={{
          boxShadow: [
            `0 0 20px #ff8c0030, inset 0 0 10px #ff8c0010`,
            `0 0 25px #ff8c0040, inset 0 0 12px #ff8c0015`,
            `0 0 20px #ff8c0030, inset 0 0 10px #ff8c0010`
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <span className="text-lg md:text-xl font-bold relative z-10 tracking-wider">REACT</span>
        
        {/* Tooltip */}
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 backdrop-blur-md ${
          theme === 'light' 
            ? 'bg-slate-900/95 text-white border border-slate-600/50' 
            : 'bg-white/95 text-slate-800 border border-white/30'
        }`}>
          <div className="font-semibold">React</div>
          <div className="text-xs opacity-80 mt-1">JavaScript Library for Building UIs</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Central React Logo Component - Single Rotating Piece
const ReactLogo = ({ isInView }: { isInView: boolean }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0, rotate: -180 }}
      animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 140, 0, 0.25) 0%, rgba(255, 165, 0, 0.15) 40%, transparent 70%)',
          filter: 'blur(25px)',
          transform: 'scale(3)',
        }}
        animate={isInView ? {
          scale: [3, 3.5, 3],
          opacity: [0.25, 0.5, 0.25]
        } : {}}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 165, 0, 0.3) 0%, rgba(255, 140, 0, 0.2) 30%, transparent 60%)',
          filter: 'blur(15px)',
          transform: 'scale(2)',
        }}
        animate={isInView ? {
          scale: [2, 2.3, 2],
          opacity: [0.3, 0.6, 0.3]
        } : {}}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
      />

      {/* Main React Logo Container */}
      <motion.div
        className={`relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-4 flex flex-col items-center justify-center backdrop-blur-md ${
          theme === 'light'
            ? 'bg-gradient-to-br from-slate-50/95 to-orange-50/95 border-orange-300/70'
            : 'bg-gradient-to-br from-slate-900/95 to-orange-950/60 border-orange-500/50'
        }`}
        style={{
          boxShadow: '0 0 40px rgba(255, 140, 0, 0.4), inset 0 0 40px rgba(255, 140, 0, 0.15)',
        }}
        animate={isInView ? {
          y: [-4, 4, -4],
        } : {}}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {/* Single Rotating React Logo SVG */}
        <motion.div
          className="flex flex-col items-center justify-center"
          animate={isInView ? { rotate: 360 } : {}}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <svg
            className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mb-2"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Central nucleus */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill="#ff8c00"
            />
            
            {/* First orbital ring */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="15"
              stroke="#ff8c00"
              strokeWidth="2.5"
              fill="none"
              opacity="0.8"
            />
            
            {/* Second orbital ring - rotated 60 degrees */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="15"
              stroke="#ffa500"
              strokeWidth="2.5"
              fill="none"
              opacity="0.7"
              transform="rotate(60 50 50)"
            />
            
            {/* Third orbital ring - rotated 120 degrees */}
            <ellipse
              cx="50"
              cy="50"
              rx="35"
              ry="15"
              stroke="#ff7f00"
              strokeWidth="2.5"
              fill="none"
              opacity="0.6"
              transform="rotate(120 50 50)"
            />

            {/* Orbital electrons */}
            <circle cx="85" cy="50" r="3" fill="#ff6347" />
            <circle cx="15" cy="50" r="3" fill="#ff4500" />
            <circle cx="65" cy="35" r="2.5" fill="#ffa500" />
            <circle cx="35" cy="65" r="2.5" fill="#ff8c00" />
            <circle cx="35" cy="35" r="2.5" fill="#ff7f00" />
            <circle cx="65" cy="65" r="2.5" fill="#ff6347" />
          </svg>

        </motion.div>

        {/* Energy pulses */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-400/60 rounded-full"
              style={{
                left: `${25 + i * 12}%`,
                top: `${30 + (i % 3) * 15}%`,
              }}
              animate={isInView ? {
                y: [-8, 8, -8],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5]
              } : {}}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ feature, index, isInView }: { feature: typeof reactFeatures[0], index: number, isInView: boolean }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      className="h-full"
    >
      <Card className={`h-full group backdrop-blur-md border-2 transition-all duration-300 overflow-hidden hover:scale-105 ${
        theme === 'light'
          ? 'bg-white/80 border-orange-200/40 hover:border-orange-400/60 hover:shadow-xl'
          : 'bg-neutral-900/80 border-orange-500/30 hover:border-orange-400/50 hover:shadow-2xl'
      }`}>
        <BorderBeam
          size={200}
          duration={8 + index * 2}
          colorFrom="#ff8c00"
          colorTo="#ff4500"
        />
        
        <CardContent className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <feature.icon className="w-6 h-6" />
            </motion.div>
            
            <h3 className={`text-xl font-bold ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              {feature.title}
            </h3>
          </div>
          
          <p className={`text-sm leading-relaxed flex-grow ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {feature.description}
          </p>

          <motion.div
            className="mt-4 pt-4 border-t border-orange-500/20 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs text-orange-500 font-medium">Production Ready</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ReactEcosystemSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { theme } = useTheme();

  return (
    <motion.section
      ref={sectionRef}
      className={`relative min-h-screen py-16 md:py-20 lg:py-24 px-4 md:px-8 overflow-hidden ${
        theme === 'light' ? 'text-slate-900' : 'text-slate-100'
      }`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16 md:mb-20">
          <Badge className={`mb-6 px-4 py-2 border ${
            theme === 'light'
              ? 'bg-orange-50/80 text-orange-600 border-orange-300/60'
              : 'bg-orange-950/40 text-orange-400 border-orange-500/40'
          }`}>
            <Sparkles className="w-4 h-4 mr-2" />
            The Power Behind Zeropoint
          </Badge>

          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${
            theme === 'light' ? 'text-slate-900' : 'text-white'
          }`}>
            Built with{" "}
            <SparklesText 
              className="inline-block"
              colors={{ first: "#ff8c00", second: "#ff4500" }}
            >
              React
            </SparklesText>
          </h2>

          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            We harness the power of React and its incredible ecosystem to build lightning-fast, 
            scalable applications that deliver exceptional user experiences.
          </p>
        </motion.div>

        {/* Solar System Visualization */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full max-w-6xl mx-auto mb-20 md:mb-24 overflow-visible"
          style={{ height: '700px', minHeight: '700px' }}
        >
          {/* Connection rings - Behind everything */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[140, 160, 180, 240, 280, 320].map((radius, i) => (
              <motion.div
                key={radius}
                className="absolute border border-orange-500/20 rounded-full"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
          </div>

          {/* Central React Logo - Background layer */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <ReactLogo isInView={isInView} />
          </div>

          {/* React Text Label - Above the logo */}
          <ReactTextLabel isInView={isInView} />

          {/* Orbiting Tech Logos - Foreground layer */}
          <div className="absolute inset-0 overflow-visible" style={{ zIndex: 30 }}>
            {techStack.map((tech, index) => (
              <OrbitingLogo
                key={tech.name}
                tech={tech}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

        </motion.div>

        {/* Why React Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Why We Choose{" "}
              <AuroraText 
                className="inline-block"
                colors={["#ff8c00", "#ff4500", "#ffa500", "#ff6347"]}
              >
                React
              </AuroraText>
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              React powers some of the world's most successful applications. Here's why it's perfect for your next project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {reactFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <div className={`max-w-3xl mx-auto p-8 md:p-12 rounded-2xl border backdrop-blur-md ${
            theme === 'light'
              ? 'bg-gradient-to-br from-white/70 to-orange-50/70 border-orange-200/50'
              : 'bg-gradient-to-br from-neutral-900/70 to-orange-950/20 border-orange-500/30'
          }`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}>
              Ready to Build Something Amazing?
            </h3>
            
            <p className={`text-lg mb-8 ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Let's harness the power of React to create your next groundbreaking project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 text-base shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
              >
                <Code2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Your React Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={`group font-semibold py-4 px-8 text-base transition-all duration-300 border-2 ${
                  theme === 'light'
                    ? 'border-orange-300 text-orange-600 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-50'
                    : 'border-orange-500 text-orange-400 hover:border-orange-400 hover:text-orange-300 hover:bg-orange-950/20'
                }`}
              >
                <Globe className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View Our React Portfolio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}