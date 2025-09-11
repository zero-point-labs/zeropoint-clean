'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { useTheme } from "@/lib/theme-context";
import { 
  Send, 
  MessageCircle, 
  Sparkles, 
  Bot,
  Mic,
  Paperclip,
  ArrowDown
} from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP plugins will be registered in useEffect to avoid hydration issues

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotSection: React.FC = () => {
  const { theme } = useTheme();
  // Initialize with welcome message immediately to prevent disappearing
  const [messages, setMessages] = useState<ChatMessage[]>(() => [{
    id: 'welcome-persistent',
    text: "Hi! I'm Zero Point AI. Ask me about projects, quotes, or technical questions.",
    isBot: true,
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Enhanced scroll state management
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [hasNewMessagesBelow, setHasNewMessagesBelow] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  
  // Refs for animations and scroll management
  const sectionRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null);

  // Welcome message is now initialized directly in useState

  useEffect(() => {
    // Register GSAP plugins on client side only
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    const bot = botRef.current;
    const chat = chatRef.current;
    
    if (!section || !bot || !chat) return;

    // No need to initialize welcome message - it's already in initial state

    // Create GSAP context for cleanup
    const ctx = gsap.context(() => {
      // Get all animated elements
      const sectionTitle = section.querySelector('.section-title');
      const sectionSubtitle = section.querySelector('.section-subtitle'); 
      const sectionBadge = section.querySelector('.section-badge');
      const featuresRow = section.querySelector('.features-row');
      const orbitElements = section.querySelectorAll('.orbit-element');
      const botGlow = section.querySelector('.bot-glow');

      // Set initial states for all elements
      gsap.set([sectionBadge, sectionTitle, sectionSubtitle, bot, chat, featuresRow], { 
        opacity: 0, 
        y: 100, 
        scale: 0.8 
      });

      // Main section entrance timeline with mobile optimization and repeatable animations
      const isMobile = window.innerWidth < 768;
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: isMobile ? "top 90%" : "top 85%", // Match floating islands trigger
          end: "bottom 15%", // Match floating islands end point
          toggleActions: "play none none reverse",
          markers: false,
          onEnter: () => {
            setHasAnimated(true);
            
            // Start continuous animations after entrance - same as floating islands
            
            // Bot floating animation
            gsap.to(bot, {
              y: "+=20",
              rotation: 2,
              duration: 6,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            });

            // Orbital elements animation
            orbitElements.forEach((orbit, index) => {
              gsap.to(orbit, {
                rotation: 360,
                duration: 8 + index * 2,
                ease: "none",
                repeat: -1,
              });
            });

            // Glow pulse
            if (botGlow) {
              gsap.to(botGlow, {
                scale: 1.1,
                opacity: 0.8,
                duration: 4,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
            
            // Keep welcome message persistent - don't change messages
          },
          onLeave: () => {
            // Reset animation state but keep messages persistent
            setHasAnimated(false);
            
            // Kill continuous animations
            gsap.killTweensOf([bot, ...orbitElements, botGlow].filter(Boolean));
          },
          onEnterBack: () => {
            // Replay everything when scrolling back up into view - same as floating islands
            setHasAnimated(true);
            
            // Restart continuous animations (keep messages persistent)
            gsap.to(bot, {
              y: "+=20",
              rotation: 2,
              duration: 6,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            });

            orbitElements.forEach((orbit, index) => {
              gsap.to(orbit, {
                rotation: 360,
                duration: 8 + index * 2,
                ease: "none",
                repeat: -1,
              });
            });

            if (botGlow) {
              gsap.to(botGlow, {
                scale: 1.1,
                opacity: 0.8,
                duration: 4,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
              });
            }
            
            // Keep welcome message persistent - don't reset messages
          },
          onLeaveBack: () => {
            // Reset animation state but keep messages persistent
            setHasAnimated(false);
            
            // Kill continuous animations
            gsap.killTweensOf([bot, ...orbitElements, botGlow].filter(Boolean));
          }
        }
      });

      // Staggered entrance sequence (like portfolio) - Mobile optimized
      const mobileDuration = isMobile ? 0.8 : 1;
      const mobileOverlap = isMobile ? 0.4 : 0.7;
      
      if (sectionBadge) {
        masterTl.to(sectionBadge, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: mobileDuration,
          ease: "power3.out"
        });
      }

      if (sectionTitle) {
        masterTl.to(sectionTitle, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: mobileDuration * 1.2,
          ease: "power3.out"
        }, `-=${mobileOverlap}`);
      }

      if (sectionSubtitle) {
        masterTl.to(sectionSubtitle, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: mobileDuration,
          ease: "power3.out"
        }, `-=${mobileOverlap + 0.1}`);
      }

      // Bot and chat entrance with staggered internal elements - Mobile optimized
      masterTl.to(bot, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: isMobile ? 1 : 1.4,
        ease: "power3.out"
      }, `-=${isMobile ? 0.3 : 0.6}`)
      .to(chat, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: isMobile ? 0.8 : 1.2,
        ease: "power3.out"
      }, `-=${isMobile ? 0.4 : 0.8}`);

      // Reveal chat internal elements with slight delay - Mobile optimized
      const chatHeader = section.querySelector('.chat-header');
      const chatMessages = section.querySelector('.chat-messages');
      const chatInput = section.querySelector('.chat-input');
      
      if (chatHeader && chatMessages && chatInput) {
        gsap.set([chatHeader, chatMessages, chatInput], { opacity: 0, y: isMobile ? 10 : 20 });
        
        const internalDuration = isMobile ? 0.5 : 0.8;
        
        masterTl.to(chatHeader, {
          opacity: 1,
          y: 0,
          duration: internalDuration,
          ease: "power2.out"
        }, `-=${isMobile ? 0.2 : 0.3}`)
        .to(chatMessages, {
          opacity: 1,
          y: 0,
          duration: internalDuration,
          ease: "power2.out"
        }, `-=${isMobile ? 0.3 : 0.6}`)
        .to(chatInput, {
          opacity: 1,
          y: 0,
          duration: internalDuration,
          ease: "power2.out"
        }, `-=${isMobile ? 0.25 : 0.5}`);
      }

      if (featuresRow) {
        masterTl.to(featuresRow, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: isMobile ? 0.6 : 1,
          ease: "power3.out"
        }, `-=${isMobile ? 0.2 : 0.4}`);
      }

      // Background effects entrance
      const backgroundEffects = section.querySelector('.background-effects');
      if (backgroundEffects) {
        gsap.set(backgroundEffects, { opacity: 0 });
        masterTl.to(backgroundEffects, {
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        }, "-=1.5");
      }

      // Individual element parallax effects (like portfolio)
      if (sectionTitle) {
        gsap.to(sectionTitle, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionTitle,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      if (bot) {
        gsap.to(bot, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: bot,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      if (chat) {
        gsap.to(chat, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: chat,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

    }, section);

    return () => {
      ctx.revert();
    };
  }, []); // No dependencies needed since welcome message is static

  // Enhanced scroll management functions
  const checkScrollPosition = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollBottom = scrollHeight - clientHeight - scrollTop;
    
    // User is considered at bottom if within 20px of bottom
    const isAtBottom = scrollBottom <= 20;
    
    setIsUserScrolledUp(!isAtBottom);
    
    // If user scrolled back to bottom, clear new messages indicator
    if (isAtBottom) {
      setHasNewMessagesBelow(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    // Throttle scroll events for performance
    if (scrollThrottleRef.current) {
      clearTimeout(scrollThrottleRef.current);
    }
    
    scrollThrottleRef.current = setTimeout(() => {
      checkScrollPosition();
    }, 100);
  }, [checkScrollPosition]);

  const scrollToBottomSmooth = useCallback((force = false) => {
    if (!messagesEndRef.current) return;
    
    // Only auto-scroll if user hasn't manually scrolled up or if forced
    if (!isUserScrolledUp || force) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
      
      // Update scroll state immediately after scrolling
      setTimeout(() => {
        setIsUserScrolledUp(false);
        setHasNewMessagesBelow(false);
      }, 100);
    }
  }, [isUserScrolledUp]);

  const scrollToBottomInstant = useCallback(() => {
    if (!messagesEndRef.current) return;
    
    messagesEndRef.current.scrollIntoView({ 
      behavior: 'auto',
      block: 'end',
      inline: 'nearest'
    });
    
    setIsUserScrolledUp(false);
    setHasNewMessagesBelow(false);
  }, []);

  // Typing animation simulation
  const simulateTyping = async (message: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    setIsTyping(false);
    
    // Add bot response
    const botResponse = {
      id: Date.now().toString(),
      text: message,
      isBot: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    // Start typing animation
    setIsTyping(true);

    try {
      // Call real GPT-4 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              id: userMessage.id,
              role: 'user',
              content: currentMessage,
              timestamp: new Date()
            }
          ],
          conversationId: `homepage-${Date.now()}`,
          settings: {
            personality: 'professional',
            maxTokens: 1000,
            autoCollectContact: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Simulate typing delay to maintain smooth UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsTyping(false);

      // Add real AI response
      const botResponse: ChatMessage = {
        id: data.message.id,
        text: data.message.content || "I'm here to help! Could you tell me more about your project?",
        isBot: true,
        timestamp: new Date(data.message.timestamp)
      };
      
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response on error
      setIsTyping(false);
      const errorResponse: ChatMessage = {
        id: Date.now().toString(),
        text: "I'm having trouble connecting right now. Please try again or contact us directly at hello@zeropointlabs.com for immediate assistance!",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  // Enhanced auto-scroll management with message detection
  useEffect(() => {
    // Check if new messages were added
    if (messages.length > lastMessageCount) {
      setLastMessageCount(messages.length);
      
      // If user is scrolled up, show new messages indicator instead of auto-scrolling
      if (isUserScrolledUp) {
        setHasNewMessagesBelow(true);
      } else {
        // Auto-scroll to bottom for new messages if user is at bottom
        setTimeout(() => {
          scrollToBottomSmooth();
        }, 100);
      }
    }
  }, [messages.length, lastMessageCount, isUserScrolledUp, scrollToBottomSmooth]);

  // Auto-scroll for typing indicator only if user is at bottom
  useEffect(() => {
    if (isTyping && !isUserScrolledUp) {
      const timer = setTimeout(() => {
        scrollToBottomSmooth();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isTyping, isUserScrolledUp, scrollToBottomSmooth]);

  // Scroll event listener setup
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll position check
    checkScrollPosition();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, [handleScroll, checkScrollPosition]);

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center px-4 md:px-8 py-16 md:py-20 lg:py-32 overflow-hidden ${
        theme === 'light' ? 'text-slate-900' : 'text-slate-100'
      }`}
    >
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="section-badge mb-8">
            <Badge
              variant="outline"
              className={`border-orange-500/70 text-orange-400 px-6 py-3 text-base font-semibold rounded-full shadow-lg ${
                theme === 'light' 
                  ? 'bg-orange-50/80 shadow-orange-200/60' 
                  : 'bg-orange-950/60 shadow-orange-900/60'
              }`}
            >
              <AnimatedShinyText className="text-orange-400">
                AI-Powered Assistance ✨
              </AnimatedShinyText>
            </Badge>
          </div>
          
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6">
            <SparklesText 
              colors={{ first: "#F97316", second: "#EA580C" }}
              sparklesCount={12}
            >
              Meet Your AI Assistant
            </SparklesText>
          </h2>
          
          <p className={`section-subtitle text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed ${
            theme === 'light' ? 'text-slate-600' : 'text-gray-300'
          }`}>
            Get instant answers, project quotes, and expert guidance from our intelligent AI assistant
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* AI Bot with 3D Effects */}
          <div className="relative flex justify-center lg:justify-end">
            <div ref={botRef} className="relative">
              
              {/* Multi-layered Bot Glow Effect */}
              <div 
                className="bot-glow absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 140, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 40%, transparent 70%)',
                  filter: 'blur(60px)',
                  transform: 'scale(1.8)',
                }}
              />
              
              {/* Secondary glow */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 200, 0, 0.3) 0%, transparent 50%)',
                  filter: 'blur(30px)',
                  transform: 'scale(1.4)',
                }}
              />

              {/* Orbiting Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="orbit-element absolute w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400"
                  style={{
                    left: '10%',
                    top: '20%',
                    boxShadow: '0 0 20px rgba(251, 146, 60, 0.8)',
                    transformOrigin: '300px 200px',
                  }}
                />
                <div 
                  className="orbit-element absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                  style={{
                    right: '15%',
                    top: '60%',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.7)',
                    transformOrigin: '-250px -150px',
                  }}
                />
                <div 
                  className="orbit-element absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  style={{
                    left: '70%',
                    top: '10%',
                    boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
                    transformOrigin: '-200px 300px',
                  }}
                />
                <div 
                  className="orbit-element absolute w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400"
                  style={{
                    left: '20%',
                    bottom: '10%',
                    boxShadow: '0 0 12px rgba(34, 197, 94, 0.7)',
                    transformOrigin: '250px -200px',
                  }}
                />
              </div>

              {/* Main AI Bot Image */}
              <div className="relative z-10">
                <Image
                  src="/ai-assistand.png"
                  alt="AI Assistant Bot"
                  width={400}
                  height={400}
                  className="w-full max-w-sm lg:max-w-md"
                  style={{
                    filter: `
                      drop-shadow(0 30px 60px rgba(255, 140, 0, 0.4))
                      drop-shadow(0 0 30px rgba(255, 140, 0, 0.3))
                    `,
                  }}
                />
              </div>

              {/* Floating Status Badge */}
              <div 
                className="absolute top-4 right-4 z-20"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                <div className={`px-4 py-2 rounded-full border shadow-lg backdrop-blur-sm ${
                  theme === 'light' 
                    ? 'bg-green-50/90 border-green-500/50 shadow-green-200/60' 
                    : 'bg-green-950/80 border-green-500/50 shadow-green-900/60'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-600 font-medium text-sm">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="relative">
            <div ref={chatRef} className="relative">
              
              {/* Chat Window - Dark Transparent Glass */}
              <div className="relative rounded-xl shadow-2xl overflow-hidden bg-gradient-to-br from-black/40 via-slate-900/30 to-black/50 backdrop-blur-xl border border-slate-600/15">
                {/* Minimal glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                
                {/* Chat Header - Dark Transparent */}
                <div className="chat-header px-4 md:px-5 py-3 border-b border-slate-700/10 bg-gradient-to-r from-black/20 via-slate-900/15 to-black/25 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-7 md:w-9 h-7 md:h-9 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                      <Bot className="w-3.5 md:w-4.5 h-3.5 md:h-4.5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-stone-700 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-slate-200/95">Zero Point AI</h3>
                    <p className="text-xs text-stone-400/80">AI Assistant</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-400/90 font-medium hidden sm:inline">Online</span>
                  </div>
                </div>

                {/* Messages Area - Enhanced with Smart Scrolling */}
                <div 
                  ref={chatContainerRef}
                  className="chat-messages relative h-72 md:h-80 overflow-y-auto p-3 md:p-4 space-y-2.5 md:space-y-3 scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-600/30 hover:scrollbar-thumb-slate-500/50 transition-all duration-200"
                  style={{ 
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch' // Enhanced mobile scrolling
                  }}
                  onScroll={handleScroll}
                >
                  {/* Regular Messages - Clean display without typing animation */}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`max-w-[80%] md:max-w-xs px-3 py-2.5 rounded-xl backdrop-blur-md shadow-sm ${
                        message.isBot
                          ? 'bg-gradient-to-br from-black/50 via-slate-900/40 to-black/60 text-slate-200 border border-slate-700/10'
                          : 'bg-gradient-to-r from-orange-600/90 to-amber-600/90 text-white border border-orange-500/20'
                      }`}>
                        {message.isBot && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <Bot className="w-3 h-3 text-orange-400/90" />
                            <span className="text-xs font-medium text-stone-300/80">AI</span>
                          </div>
                        )}
                        <p className="text-xs leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  ))}

                  {/* Scroll anchor for auto-scroll */}
                  <div ref={messagesEndRef} />

                  {/* Typing Indicator - Charcoal */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="px-3 py-2.5 rounded-xl bg-gradient-to-br from-black/50 via-slate-900/40 to-black/60 text-slate-200 border border-slate-700/10 backdrop-blur-md shadow-sm">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Bot className="w-3 h-3 text-orange-400/90" />
                          <span className="text-xs font-medium text-stone-300/80">AI</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-orange-400/80 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-orange-400/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1.5 h-1.5 bg-orange-400/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <span className="text-xs ml-1.5 text-stone-300/70">typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />

                  {/* New Messages Indicator & Scroll to Bottom Button */}
                  {hasNewMessagesBelow && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <button
                        onClick={() => scrollToBottomSmooth(true)}
                        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 backdrop-blur-md"
                        style={{ 
                          animation: 'pulse 2s infinite',
                          boxShadow: '0 4px 15px rgba(251, 146, 60, 0.4)' 
                        }}
                      >
                        <span className="font-medium">New messages</span>
                        <ArrowDown className="w-3 h-3 animate-bounce" />
                      </button>
                    </div>
                  )}
                  
                  {/* Scroll to Bottom Button (always visible when scrolled up) */}
                  {isUserScrolledUp && !hasNewMessagesBelow && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <button
                        onClick={() => scrollToBottomSmooth(true)}
                        className="w-8 h-8 bg-black/60 hover:bg-black/80 text-slate-300 hover:text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Message Input - Dark Transparent */}
                <div className="chat-input p-3 border-t border-slate-700/10 bg-gradient-to-r from-black/20 via-slate-900/15 to-black/25">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Ask me about projects, quotes, or technical questions..."
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-700/15 transition-all duration-200 focus:ring-1 focus:ring-orange-500/40 focus:border-orange-500/40 text-sm bg-black/30 backdrop-blur-md text-slate-200 placeholder-slate-400/70"
                      />
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg transition-all duration-200 hover:bg-slate-800/30 text-slate-400/90 hover:text-slate-300">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg transition-all duration-200 hover:bg-slate-800/30 text-slate-400/90 hover:text-slate-300">
                        <Mic className="w-4 h-4" />
                      </button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="px-3 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-md shadow-orange-600/20"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features - Minimal and Elegant */}
        <div className="features-row mt-8 md:mt-12 lg:mt-16 px-4">
          {/* Mobile: Single highlighted feature */}
          <div className="block md:hidden">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-1" />
                <div className="text-xs font-medium text-orange-500 tracking-wider">AI POWERED</div>
                <div className="h-px bg-gradient-to-l from-orange-500/50 to-transparent flex-1" />
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                24/7 availability • Smart recommendations • Expert knowledge
              </p>
            </div>
          </div>

          {/* Desktop: All features in a clean row */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <MessageCircle className="w-5 h-5" />,
                title: "24/7 Availability",
                description: "Get instant responses anytime"
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                title: "Smart Recommendations", 
                description: "AI-powered suggestions for your needs"
              },
              {
                icon: <Bot className="w-5 h-5" />,
                title: "Expert Knowledge",
                description: "Trained on web development expertise"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-500 transition-colors duration-300">{feature.title}</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  {feature.description}
                </p>
                
                {/* Subtle underline on hover */}
                <div className="mt-3 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="background-effects absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 10)}%`,
              width: `${20 + (i * 5)}px`,
              height: `${20 + (i * 5)}px`,
              background: `radial-gradient(circle, ${theme === 'light' ? '#ff8c00' : '#ff8c00'} 0%, transparent 70%)`,
              filter: 'blur(15px)',
              animation: `float ${4 + (i % 3)}s infinite ease-in-out ${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Animations & Scrollbar Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-15px); 
          }
        }
        
        /* Enhanced scrollbar for chat messages */
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.4);
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.6);
        }
        
        .chat-messages::-webkit-scrollbar-thumb:active {
          background: rgba(71, 85, 105, 0.8);
        }
        
        /* Enhanced mobile scrolling */
        .chat-messages {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        
        /* Smooth scrolling for all devices */
        @supports (scroll-behavior: smooth) {
          .chat-messages {
            scroll-behavior: smooth;
          }
        }
        
        /* Hide scrollbar on mobile but keep functionality */
        @media (max-width: 768px) {
          .chat-messages::-webkit-scrollbar {
            width: 3px;
          }
          
          .chat-messages::-webkit-scrollbar-thumb {
            background: rgba(71, 85, 105, 0.3);
          }
        }
        
        /* Focus indicators for accessibility */
        .chat-messages:focus-visible {
          outline: 2px solid rgba(251, 146, 60, 0.5);
          outline-offset: 2px;
          border-radius: 8px;
        }
      `}</style>
    </section>
  );
};

export default ChatbotSection;

// Add these styles to your global CSS or add a <style> tag
// .chat-messages::-webkit-scrollbar {
//   width: 4px;
// }
// .chat-messages::-webkit-scrollbar-track {
//   background: transparent;
// }
// .chat-messages::-webkit-scrollbar-thumb {
//   background: rgba(71, 85, 105, 0.3);
//   border-radius: 2px;
// }
// .chat-messages::-webkit-scrollbar-thumb:hover {
//   background: rgba(71, 85, 105, 0.5);
// }