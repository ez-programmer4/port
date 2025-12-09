"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Rocket,
  Lightbulb,
  Palette,
  Cloud,
  Globe,
  Settings,
} from "lucide-react";
import { Section, Card, Badge } from "./ui";

interface Achievement {
  title: string;
  description: string;
  impact: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  highlights: string[];
  order: number;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experiences");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure data is an array
        setExperiences(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        setExperiences([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return (
      <Section
        id="experience"
        title="Professional Experience"
        subtitle="Loading..."
      >
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  const getLogoIcon = (index: number) => {
    const icons = [Building2, Rocket, Lightbulb, Palette];
    const Icon = icons[index % icons.length];
    return (
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-gray-600" />
    );
  };

  // Certifications (static for now)
  const certifications = [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credential: "SAA-C03",
      logo: (
        <Cloud className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-600" />
      ),
      description: "Designing distributed systems on AWS",
    },
    {
      name: "React Developer",
      issuer: "Meta",
      date: "2022",
      credential: "Meta React Developer",
      logo: (
        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500 font-bold text-xs flex items-center justify-center bg-blue-100 rounded-full">
          R
        </div>
      ),
      description: "React development and best practices",
    },
    {
      name: "Google Cloud Developer",
      issuer: "Google Cloud",
      date: "2022",
      credential: "GCP-PD",
      logo: (
        <Globe className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-green-600" />
      ),
      description: "Google Cloud Platform development",
    },
    {
      name: "Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2021",
      credential: "CKA",
      logo: (
        <Settings className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-purple-600" />
      ),
      description: "Kubernetes cluster administration",
    },
  ];

  return (
    <Section
      id="experience"
      title="Professional Experience"
      subtitle="My journey in software development, from intern to senior engineer."
    >
      {/* Experience Cards with Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 hidden sm:block"></div>

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-4 sm:top-6 md:top-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 hidden sm:flex items-center justify-center z-10">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-gray-800 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg"></div>
              </div>

              <Card hover className="relative group sm:ml-12 md:ml-24">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0">
                        {getLogoIcon(index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1 break-words">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-600 break-words">
                            {exp.company}
                          </span>
                          <span className="text-gray-400 hidden sm:inline">
                            •
                          </span>
                          <span className="text-xs sm:text-sm md:text-base text-gray-600 break-words">
                            {exp.location}
                          </span>
                          <span className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Description */}
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3 uppercase tracking-wide">
                      Key Focus Areas
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <Badge
                          key={highlightIndex}
                          variant="secondary"
                          className="text-xs sm:text-sm"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements Grid */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                      Key Achievements
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300 group/achievement"
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm sm:text-base font-semibold text-gray-800 mb-1 break-words">
                                {achievement.title}
                              </h5>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 break-words">
                                {achievement.description}
                              </p>
                              <span className="inline-block px-2 sm:px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium whitespace-nowrap">
                                {achievement.impact}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3 uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="default"
                          className="text-xs sm:text-sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="mt-12 sm:mt-16 md:mt-20">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
            Certifications
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Professional certifications validating my expertise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} hover>
              {/* Certificate Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 sm:px-5 md:px-6 py-3 sm:py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0">
                    {cert.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 break-words">
                      {cert.name}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium break-words">
                      {cert.issuer}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="inline-block px-2 sm:px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {cert.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                      Credential ID:
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded break-all sm:break-normal">
                      {cert.credential}
                    </span>
                  </div>

                  <div className="flex items-center text-green-600">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
