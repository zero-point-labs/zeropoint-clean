"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MinimalGridProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: number;
  strokeWidth?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export const MinimalGrid: React.FC<MinimalGridProps> = ({
  gridSize = 50,
  strokeWidth = 0.5,
  color = "rgb(255, 255, 255)",
  opacity = 0.1,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{
        backgroundImage: `
          linear-gradient(${color} ${strokeWidth}px, transparent ${strokeWidth}px),
          linear-gradient(90deg, ${color} ${strokeWidth}px, transparent ${strokeWidth}px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity: opacity,
      }}
      {...props}
    />
  );
};
