"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "outline";
  children?: React.ReactNode;
}

export default function IconButton({
  icon: Icon,
  size = "md",
  variant = "default",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default:
      "bg-gray-100 text-gray-600 hover:bg-gray-800 hover:text-white focus:ring-gray-500",
    ghost:
      "bg-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
    outline:
      "bg-transparent text-gray-600 border-2 border-gray-300 hover:bg-gray-100 focus:ring-gray-500",
  };

  const sizes = {
    sm: "w-8 h-8 text-sm rounded-lg",
    md: "w-12 h-12 text-base rounded-xl",
    lg: "w-14 h-14 text-lg rounded-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
      {children && <span className="ml-2">{children}</span>}
    </motion.button>
  );
}

