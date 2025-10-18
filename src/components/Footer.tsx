"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronUp,
  Linkedin,
  Github,
  Twitter,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import { IconButton } from "./ui";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Technologies", href: "#technologies" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/ezedin", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/ezedin", icon: Github },
    { name: "Twitter", url: "https://twitter.com/ezedin", icon: Twitter },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/logo.png"
                alt="Ezedin Logo"
                width={48}
                height={48}
                className="mr-3 rounded-full"
              />
              <div>
                <div className="text-2xl font-bold text-white">Ezedin</div>
                <div className="text-sm text-gray-400">Software Engineer</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 max-w-md">
              Full-stack developer passionate about creating innovative digital
              solutions. Let&apos;s build something amazing together.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <IconButton
                    key={index}
                    icon={Icon}
                    variant="ghost"
                    size="md"
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                    onClick={() => window.open(social.url, "_blank")}
                    title={social.name}
                  />
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm inline-block hover:translate-x-1 transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:ezedin@example.com"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  ezedin@example.com
                </a>
              </li>
              <li className="text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Available Worldwide
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              © {currentYear} Ezedin. Built with
              <Heart className="w-4 h-4 text-red-500 inline animate-pulse" />
              using Next.js & Tailwind CSS
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        {/* Contact Button */}
        <motion.button
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="w-14 h-14 bg-gray-800 text-white rounded-full shadow-xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center border-2 border-gray-700"
          aria-label="Contact me"
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Mail className="w-6 h-6" />
        </motion.button>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-14 h-14 bg-gray-800 text-white rounded-full shadow-xl hover:bg-gray-700 transition-all duration-300 flex items-center justify-center border-2 border-gray-700"
          aria-label="Back to top"
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      </div>
    </footer>
  );
}
