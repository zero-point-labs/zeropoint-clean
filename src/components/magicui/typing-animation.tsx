"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function TypingAnimation({
  text,
  duration = 80,
  delay = 0,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);

  useEffect(() => {
    const typingEffect = setTimeout(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      }
    }, duration);

    return () => {
      clearTimeout(typingEffect);
    };
  }, [duration, i, text]);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setI(0);
      setDisplayedText("");
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [delay]);

  return (
    <span className={className}>
      {displayedText ? displayedText : text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
