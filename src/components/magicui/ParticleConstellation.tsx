"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  shape: "triangle" | "circle" | "hexagon" | "square";
  opacity: number;
  targetOpacity: number;
  glowIntensity: number;
  rotation: number;
  rotationSpeed: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
}

export const ParticleConstellation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mousePos = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Initialize particles (delay to avoid hydration mismatch)
    setTimeout(() => {
      const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000));
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 2,
        shape: ["triangle", "circle", "hexagon", "square"][Math.floor(Math.random() * 4)] as Particle["shape"],
        opacity: 0,
        targetOpacity: Math.random() * 0.5 + 0.3,
        glowIntensity: 0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      }));
    }, 100);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Draw functions for different shapes
    const drawShape = (
      ctx: CanvasRenderingContext2D,
      shape: Particle["shape"],
      x: number,
      y: number,
      size: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      switch (shape) {
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(-size * 0.866, size * 0.5);
          ctx.lineTo(size * 0.866, size * 0.5);
          ctx.closePath();
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          break;
        case "hexagon":
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const px = size * Math.cos(angle);
            const py = size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          break;
        case "square":
          ctx.beginPath();
          ctx.rect(-size, -size, size * 2, size * 2);
          break;
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update connections
      connectionsRef.current = [];
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
          
          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            connectionsRef.current.push({ from: i, to: j, opacity });
          }
        }
      }

      // Draw connections
      connectionsRef.current.forEach((conn) => {
        const p1 = particlesRef.current[conn.from];
        const p2 = particlesRef.current[conn.to];
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        
        if (theme === "light") {
          gradient.addColorStop(0, `rgba(251, 146, 60, ${conn.opacity * 0.6})`);
          gradient.addColorStop(1, `rgba(251, 146, 60, ${conn.opacity * 0.2})`);
        } else {
          gradient.addColorStop(0, `rgba(251, 146, 60, ${conn.opacity})`);
          gradient.addColorStop(1, `rgba(251, 146, 60, ${conn.opacity * 0.3})`);
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const mouseDistance = Math.sqrt(
          (particle.x - mousePos.current.x) ** 2 + (particle.y - mousePos.current.y) ** 2
        );
        
        if (mouseDistance < 100) {
          particle.glowIntensity = Math.min(1, particle.glowIntensity + 0.1);
          const angle = Math.atan2(particle.y - mousePos.current.y, particle.x - mousePos.current.x);
          particle.vx += Math.cos(angle) * 0.05;
          particle.vy += Math.sin(angle) * 0.05;
        } else {
          particle.glowIntensity = Math.max(0, particle.glowIntensity - 0.05);
        }

        // Fade in animation
        particle.opacity = Math.min(particle.targetOpacity, particle.opacity + 0.01);

        // Draw glow effect
        if (particle.glowIntensity > 0) {
          ctx.shadowBlur = 20 * particle.glowIntensity;
          ctx.shadowColor = theme === "light" ? "rgba(251, 146, 60, 0.8)" : "rgba(251, 146, 60, 1)";
        }

        // Draw particle
        drawShape(ctx, particle.shape, particle.x, particle.y, particle.size, particle.rotation);
        
        if (theme === "light") {
          ctx.fillStyle = `rgba(251, 146, 60, ${particle.opacity * 0.8})`;
          ctx.strokeStyle = `rgba(251, 146, 60, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(251, 146, 60, ${particle.opacity})`;
          ctx.strokeStyle = `rgba(251, 146, 60, ${particle.opacity * 0.6})`;
        }
        
        ctx.fill();
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: theme === "light" ? 0.6 : 0.8 }}
    />
  );
};
