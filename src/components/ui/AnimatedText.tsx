"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

const AnimatedText = forwardRef<HTMLElement, AnimatedTextProps>(
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
    const Component = motion[as];

    return (
      <Component
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration, delay }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export default AnimatedText;

