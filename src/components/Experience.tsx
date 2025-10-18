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
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
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
    return <Icon className="w-8 h-8 text-gray-600" />;
  };

  // Certifications (static for now)
  const certifications = [
    {
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credential: "SAA-C03",
      logo: <Cloud className="w-8 h-8 text-blue-600" />,
      description: "Designing distributed systems on AWS",
    },
    {
      name: "React Developer",
      issuer: "Meta",
      date: "2022",
      credential: "Meta React Developer",
      logo: (
        <div className="w-8 h-8 text-blue-500 font-bold text-xs flex items-center justify-center bg-blue-100 rounded-full">
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
      logo: <Globe className="w-8 h-8 text-green-600" />,
      description: "Google Cloud Platform development",
    },
    {
      name: "Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2021",
      credential: "CKA",
      logo: <Settings className="w-8 h-8 text-purple-600" />,
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
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 hidden md:block"></div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-8 w-16 h-16 hidden md:flex items-center justify-center z-10">
                <div className="w-4 h-4 bg-gray-800 rounded-full border-4 border-white shadow-lg"></div>
              </div>

              <Card hover className="relative group md:ml-24">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
                        {getLogoIcon(index)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-lg font-semibold text-gray-600">
                            {exp.company}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{exp.location}</span>
                          <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-700">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  {/* Description */}
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                      Key Focus Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, highlightIndex) => (
                        <Badge key={highlightIndex} variant="secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements Grid */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      Key Achievements
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300 group/achievement"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg
                                className="w-4 h-4 text-green-600"
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
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-800 mb-1">
                                {achievement.title}
                              </h5>
                              <p className="text-sm text-gray-600 mb-2">
                                {achievement.description}
                              </p>
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
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
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="default">
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
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Certifications
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional certifications validating my expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} hover>
              {/* Certificate Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center">
                    {cert.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-gray-600 font-medium">{cert.issuer}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {cert.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500">
                      Credential ID:
                    </span>
                    <span className="ml-2 font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                      {cert.credential}
                    </span>
                  </div>

                  <div className="flex items-center text-green-600">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">Verified</span>
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
