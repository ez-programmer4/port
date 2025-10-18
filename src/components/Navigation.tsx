"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderGit2,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Button, IconButton } from "./ui";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "#", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Testimonials", href: "#testimonials", icon: MessageCircle },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      // If we're at the very top, set to home
      if (window.scrollY < 100) {
        setActiveSection("");
        return;
      }

      // Check each section
      const sections = navItems
        .filter((item) => item.href !== "#") // Skip home link
        .map((item) => ({
          id: item.href.slice(1),
          element: document.getElementById(item.href.slice(1)),
        }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    handleScroll(); // Run on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "shadow-lg border-b-2 border-gray-200"
          : "shadow-sm border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: scrolled ? 360 : 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/logo.png"
                alt="Ezedin Logo"
                width={40}
                height={40}
                className="mr-3"
              />
            </motion.div>
            <div>
              <div className="text-2xl font-bold text-gray-800">Ezedin</div>
              <span className="text-sm text-gray-500 font-medium">
                Software Engineer
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              // For home link, check if activeSection is empty
              const isActive =
                item.href === "#"
                  ? activeSection === ""
                  : activeSection === item.href.slice(1);

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                    isActive
                      ? "text-gray-800 bg-gray-100"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-800"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="sm" variant="primary">
              Let&apos;s Connect
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <IconButton
              icon={isMenuOpen ? X : Menu}
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-2 pt-4 pb-4 space-y-2 sm:px-3 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200"
              >
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  // For home link, check if activeSection is empty
                  const isActive =
                    item.href === "#"
                      ? activeSection === ""
                      : activeSection === item.href.slice(1);

                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-gray-800 text-white shadow-md"
                          : "text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-sm"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileSection"
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                          initial={false}
                        />
                      )}
                    </motion.a>
                  );
                })}

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-4 px-2 border-t border-gray-200 mt-2"
                >
                  <Button
                    size="md"
                    variant="primary"
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Let&apos;s Connect
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
