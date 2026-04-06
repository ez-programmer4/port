"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface CardProps {
  variant?: "default" | "elevated" | "outlined";
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", hover = false, children, className = "", onClick },
    ref
  ) => {
    const baseClasses = "rounded-3xl transition-all duration-300";

    const variants = {
      default:
        "bg-[linear-gradient(150deg,rgba(17,26,48,0.94),rgba(10,18,36,0.98))] border border-indigo-300/20 shadow-[0_20px_60px_rgba(3,8,25,0.45)]",
      elevated:
        "bg-[linear-gradient(150deg,rgba(21,31,57,0.95),rgba(10,17,35,0.99))] border border-indigo-200/20 shadow-[0_24px_70px_rgba(2,6,22,0.55)]",
      outlined:
        "bg-slate-900/70 border-2 border-slate-500/50 shadow-sm",
    };

    const hoverClasses = hover
      ? "hover:shadow-[0_28px_70px_rgba(3,8,25,0.6)] hover:-translate-y-1.5 hover:border-indigo-200/40"
      : "";

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;

