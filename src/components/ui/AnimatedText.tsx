"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  [key: string]: any;
}

const AnimatedText = forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      children,
      delay = 0,
      duration = 0.6,
      as = "div",
      className = "",
      ...props
    },
    ref
  ) => {
    const Component = motion[as] as any;

    return (
      <Component
        ref={ref as any}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration, delay }}
        className={className}
        {...(props as any)}
      >
        {children}
      </Component>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;
