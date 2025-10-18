"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, title, subtitle, className = "", id }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}
      >
        <div className="max-w-7xl mx-auto">
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              {title && (
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}
          {children}
        </div>
      </motion.section>
    );
  }
);

Section.displayName = "Section";

export default Section;

