"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ContainerProps {
  children: React.ReactNode;
  variant?: "default" | "narrow" | "wide";
  animate?: boolean;
  className?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { children, variant = "default", animate = true, className = "" },
    ref
  ) => {
    const variants = {
      default: "max-w-7xl mx-auto",
      narrow: "max-w-4xl mx-auto",
      wide: "max-w-full mx-auto px-4 sm:px-6 lg:px-8",
    };

    if (!animate) {
      return (
        <div
          ref={ref}
          className={`${variants[variant]} ${className}`}
        >
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`${variants[variant]} ${className}`}
      >
        {children}
      </motion.div>
    );
  }
);

Container.displayName = "Container";

export default Container;

