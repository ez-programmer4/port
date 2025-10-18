"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Clock,
  FolderGit2,
} from "lucide-react";
import { Section, Card, Badge, Button } from "./ui";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  features?: string[];
  category: string;
  status: string;
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="Loading projects..."
      >
        <div className="flex items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Section>
    );
  }

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const otherProjects = projects.filter((p) => !p.isFeatured);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === "All"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === filter);

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="A showcase of my recent work, demonstrating expertise in full-stack development, cloud architecture, and modern web technologies."
    >
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            size="sm"
            variant={filter === category ? "primary" : "outline"}
            onClick={() => setFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Projects */}
      <div className="space-y-12 mb-20">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Card hover className="overflow-hidden">
              <div className={`grid lg:grid-cols-2 gap-8`}>
                {/* Project Image */}
                <div className="relative group">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        unoptimized
                        priority={index === 0}
                      />
                    ) : (
                      <FolderGit2 className="w-20 h-20 text-gray-400" />
                    )}

                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gray-800/90 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            View Code
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Status & Category Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <Badge variant="default" size="sm">
                      {project.category}
                    </Badge>
                    <Badge
                      variant={
                        project.status === "Live" ? "success" : "warning"
                      }
                      size="sm"
                    >
                      {project.status === "Live" ? (
                        <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1 inline" />
                      )}
                      {project.status}
                    </Badge>
                  </div>
                </div>

                {/* Project Content */}
                <div className="space-y-6 p-4">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-3">
                      {project.description}
                    </p>
                    {project.longDescription && (
                      <p className="text-gray-600 text-sm">
                        {project.longDescription}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  {project.features && project.features.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start space-x-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="default" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="primary"
                        className="flex items-center justify-center gap-2"
                        onClick={() => window.open(project.liveUrl, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Site
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center justify-center gap-2"
                        onClick={() => window.open(project.githubUrl, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Other Projects */}
      <div className="mt-20">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
          More Projects
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FolderGit2 className="w-16 h-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  )}

                  {/* Hover Overlay with Links */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-800" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white rounded-full hover:scale-110 transition-transform"
                        title="GitHub"
                      >
                        <Github className="w-4 h-4 text-gray-800" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
