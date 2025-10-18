"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Send,
  MessageSquare,
  X,
} from "lucide-react";
import { Section, Button, IconButton } from "./ui";

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTimeout(() => {
          setShowForm(false);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/ezedin", icon: Linkedin },
    { name: "GitHub", url: "https://github.com/ezedin", icon: Github },
    { name: "Twitter", url: "https://twitter.com/ezedin", icon: Twitter },
  ];

  return (
    <Section
      id="contact"
      title="Let's Work Together"
      subtitle="Ready to start your next project? Let's connect and make it happen."
      className="bg-gray-50"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Main CTA */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 md:p-16 mb-8">
                <MessageSquare className="w-20 h-20 text-white mx-auto mb-6" />
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Have a Project in Mind?
                </h3>
                <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
                  Let&apos;s discuss how we can work together to bring your
                  ideas to life.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-gray-800 hover:bg-gray-100 mb-6"
                  onClick={() => setShowForm(true)}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Me a Message
                </Button>

                {/* Quick Contact Info */}
                <div className="mt-8 pt-8 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <a
                        href="mailto:ezedin@example.com"
                        className="hover:text-white transition-colors"
                      >
                        ezedin@example.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <a
                        href="tel:+15551234567"
                        className="hover:text-white transition-colors"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>Worldwide</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">
                  Or Connect on Social Media
                </h4>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;

                    return (
                      <IconButton
                        key={index}
                        icon={Icon}
                        variant="default"
                        size="lg"
                        onClick={() => window.open(social.url, "_blank")}
                        title={social.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-800 text-sm">
                    Available for New Projects
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-gray-800 rounded-2xl p-8 md:p-12 relative">
                {/* Close Button */}
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
                  aria-label="Close form"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Send Me a Message
                  </h3>
                  <p className="text-gray-400">
                    Fill out the form below and I&apos;ll get back to you soon
                  </p>
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-500 text-white rounded-lg">
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                {/* Error Message */}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-500 text-white rounded-lg">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-400 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 border-2 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
                      className="flex-1 bg-white text-gray-800 hover:bg-gray-100 flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    I&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
