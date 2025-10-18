"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", hover = false, children, className = "", ...props },
    ref
  ) => {
    const baseClasses = "rounded-2xl transition-all duration-300";

    const variants = {
      default: "bg-white border border-gray-200 shadow-lg",
      elevated: "bg-white border border-gray-100 shadow-xl",
      outlined: "bg-white border-2 border-gray-300 shadow-sm",
    };

    const hoverClasses = hover
      ? "hover:shadow-2xl hover:-translate-y-1 hover:border-gray-200"
      : "";

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;

