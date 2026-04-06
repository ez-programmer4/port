"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  title?: string;
}

export default function IconButton({
  icon: Icon,
  size = "md",
  variant = "default",
  children,
  className = "",
  onClick,
  disabled,
  type,
  "aria-label": ariaLabel,
  title,
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default:
      "bg-slate-100/10 text-slate-200 hover:bg-orange-500 hover:text-white focus:ring-orange-300 border border-slate-500/40",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-slate-100/10 focus:ring-slate-300",
    outline:
      "bg-transparent text-slate-100 border border-slate-500 hover:bg-slate-100/10 focus:ring-slate-300",
  };

  const sizes = {
    sm: "w-8 h-8 text-sm rounded-lg",
    md: "w-12 h-12 text-base rounded-xl",
    lg: "w-14 h-14 text-lg rounded-xl",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      title={title}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <Icon className="w-5 h-5" />
      {children && <span className="ml-2">{children}</span>}
    </motion.button>
  );
}

