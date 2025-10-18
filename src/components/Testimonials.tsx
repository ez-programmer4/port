"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "./ui";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  rating: number;
  linkedin?: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <Section
        id="testimonials"
        title="Client Testimonials"
        subtitle="Loading..."
      >
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <Section
        id="testimonials"
        title="Client Testimonials"
        subtitle="No testimonials yet"
      >
        <div className="text-center py-12 text-gray-600">
          Check back soon for client testimonials!
        </div>
      </Section>
    );
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Section
      id="testimonials"
      title="Client Testimonials"
      subtitle="What people say about working with me"
      className="bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="max-w-5xl mx-auto">
        {/* Testimonial Slider */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                {/* Content - Horizontal Layout */}
                <div className="relative p-6 md:p-8">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Left: Author Info */}
                    <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-56 flex-shrink-0">
                      <div className="relative w-16 h-16">
                        <Image
                          src={currentTestimonial.image || "/logo.png"}
                          alt={currentTestimonial.name}
                          width={64}
                          height={64}
                          className="rounded-full object-cover border-2 border-white shadow-md"
                        />
                      </div>
                      <div className="text-center md:text-left">
                        <div className="font-bold text-gray-800 mb-1">
                          {currentTestimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {currentTestimonial.role}
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          {currentTestimonial.company}
                        </div>
                        <div className="flex gap-0.5 justify-center md:justify-start">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-24 bg-gray-300"></div>

                    {/* Right: Quote */}
                    <div className="flex-1 relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-300" />
                      <blockquote className="pl-6">
                        <p className="text-lg text-gray-700 leading-relaxed italic">
                          {currentTestimonial.content}
                        </p>
                      </blockquote>
                      <a
                        href={currentTestimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
                        title="View LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all duration-300 border border-gray-200 z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all duration-300 border border-gray-200 z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-12 h-3 bg-gray-800"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
