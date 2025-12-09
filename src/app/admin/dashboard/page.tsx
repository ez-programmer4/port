"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  Briefcase,
  MessageSquare,
  Mail,
  TrendingUp,
  Eye,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    experiences: 0,
    testimonials: 0,
    messages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, experiences, testimonials] = await Promise.all([
          fetch("/api/projects").then((r) => r.json()),
          fetch("/api/experiences").then((r) => r.json()),
          fetch("/api/testimonials").then((r) => r.json()),
        ]);

        setStats({
          projects: projects.length,
          experiences: experiences.length,
          testimonials: testimonials.length,
          messages: 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderGit2,
      color: "bg-blue-500",
      href: "/admin/dashboard/projects",
    },
    {
      title: "Experiences",
      value: stats.experiences,
      icon: Briefcase,
      color: "bg-green-500",
      href: "/admin/dashboard/experience",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "bg-purple-500",
      href: "/admin/dashboard/testimonials",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-orange-500",
      href: "/admin/dashboard/messages",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome Back! 👋</h2>
        <p className="text-gray-300">
          Manage your portfolio content from this dashboard
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.a
              key={stat.title}
              href={stat.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </motion.a>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/dashboard/projects"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-800 hover:bg-gray-50 transition-all group"
          >
            <FolderGit2 className="w-8 h-8 text-gray-600 mb-2 group-hover:text-gray-800" />
            <h4 className="font-semibold text-gray-800 mb-1">Add Project</h4>
            <p className="text-sm text-gray-600">
              Create a new portfolio project
            </p>
          </a>

          <a
            href="/admin/dashboard/experience"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-800 hover:bg-gray-50 transition-all group"
          >
            <Briefcase className="w-8 h-8 text-gray-600 mb-2 group-hover:text-gray-800" />
            <h4 className="font-semibold text-gray-800 mb-1">Add Experience</h4>
            <p className="text-sm text-gray-600">Add work experience entry</p>
          </a>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-gray-800 hover:bg-gray-50 transition-all group"
          >
            <Eye className="w-8 h-8 text-gray-600 mb-2 group-hover:text-gray-800" />
            <h4 className="font-semibold text-gray-800 mb-1">View Site</h4>
            <p className="text-sm text-gray-600">
              See your live portfolio site
            </p>
          </a>
        </div>
      </motion.div>
    </div>
  );
}


