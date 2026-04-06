"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  form?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      children,
      isLoading = false,
      className = "",
      type,
      form,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "text-white focus:ring-orange-300 shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 bg-[linear-gradient(120deg,#ff6b3d,#ff8f62)]",
      secondary:
        "bg-slate-100 text-slate-900 border border-slate-100 hover:bg-white focus:ring-slate-200",
      outline:
        "bg-transparent text-slate-100 border border-slate-500/60 hover:bg-slate-700/30 hover:border-slate-300 focus:ring-slate-300",
      ghost:
        "bg-transparent text-slate-300 hover:bg-slate-700/40 hover:text-slate-100 focus:ring-slate-300",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-xl",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-2xl",
    };

    return (
      <motion.button
        ref={ref}
        type={type}
        form={form}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${
          variants[variant as keyof typeof variants]
        } ${sizes[size as keyof typeof sizes]} ${className}`}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
          />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
