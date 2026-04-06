"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  variant?: "default" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  size = "md",
  children,
  className = "",
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center font-semibold rounded-full transition-all duration-200 hover:scale-105 cursor-default";

  const variants = {
    default: "bg-slate-100/10 text-slate-100 border border-slate-400/30",
    secondary: "bg-cyan-400/20 text-cyan-100 border border-cyan-300/40",
    success: "bg-emerald-400/20 text-emerald-100 border border-emerald-300/40",
    warning: "bg-amber-300/20 text-amber-100 border border-amber-200/40",
    error: "bg-rose-400/20 text-rose-100 border border-rose-300/40",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
}


