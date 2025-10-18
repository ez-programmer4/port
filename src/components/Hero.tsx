"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  Download,
  ArrowRight,
} from "lucide-react";
import { Button, IconButton } from "./ui";

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Content - Centered Layout */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <Image
                  src="/logo.png"
                  alt="Ezedin Logo"
                  width={56}
                  height={56}
                  className="rounded-full shadow-lg"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium shadow-sm"
              >
                👋 Welcome to my portfolio
              </motion.span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight"
          >
            Full-Stack Developer
            <br />
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              &amp; Software Engineer
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Building scalable web applications with modern technologies.
            Specialized in full-stack development and cloud solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              variant="primary"
              className="flex items-center justify-center gap-2"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
          >
            <h3 className="text-sm font-semibold text-gray-600 mb-6 uppercase tracking-wide">
              Connect With Me
            </h3>
            <div className="flex justify-center gap-4">
              <IconButton
                icon={Linkedin}
                variant="default"
                size="lg"
                title="LinkedIn"
                onClick={() => window.open("#", "_blank")}
              />
              <IconButton
                icon={Github}
                variant="default"
                size="lg"
                title="GitHub"
                onClick={() => window.open("#", "_blank")}
              />
              <IconButton
                icon={Twitter}
                variant="default"
                size="lg"
                title="Twitter"
                onClick={() => window.open("#", "_blank")}
              />
              <IconButton
                icon={Mail}
                variant="default"
                size="lg"
                title="Email"
                onClick={() => (window.location.href = "mailto:your@email.com")}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
