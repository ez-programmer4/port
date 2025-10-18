"use client";

import { motion } from "framer-motion";

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
}

export default function AnimatedText({
  children,
  delay = 0,
  duration = 0.6,
  as = "div",
  className = "",
  ...props
}: AnimatedTextProps & React.HTMLAttributes<HTMLElement>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = motion[as] as any;

  return (
    <Component
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
