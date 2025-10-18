import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "admin123",
    10
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Seed Skills
  const skills = [
    {
      category: "Frontend Development",
      description:
        "Building responsive, interactive user interfaces with modern frameworks and state management solutions.",
      technologies: JSON.stringify([
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "GraphQL",
      ]),
      order: 1,
    },
    {
      category: "Backend Development",
      description:
        "Designing scalable server architectures and RESTful APIs with robust database management systems.",
      technologies: JSON.stringify([
        "Node.js",
        "Express",
        "Python",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ]),
      order: 2,
    },
    {
      category: "Cloud & DevOps",
      description:
        "Implementing cloud-native solutions with containerization and automated deployment pipelines.",
      technologies: JSON.stringify([
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Terraform",
        "Jenkins",
      ]),
      order: 3,
    },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  console.log("✅ Skills seeded");

  // Seed Projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with advanced features including real-time inventory management, payment processing, and admin dashboard.",
      longDescription:
        "Built a comprehensive e-commerce platform serving 10,000+ products with advanced search, filtering, and recommendation systems. Implemented secure payment processing with Stripe integration and real-time order tracking.",
      technologies: JSON.stringify([
        "React",
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "AWS",
      ]),
      features: JSON.stringify([
        "Real-time inventory management",
        "Advanced search and filtering",
        "Secure payment processing",
        "Admin dashboard with analytics",
        "Mobile-responsive design",
        "Order tracking system",
      ]),
      category: "Full-Stack",
      status: "Live",
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/ezedin/ecommerce-platform",
      isFeatured: true,
      order: 1,
    },
    {
      title: "Task Management SaaS",
      description:
        "A collaborative project management tool with real-time collaboration, team management, and advanced reporting features.",
      longDescription:
        "Developed a comprehensive SaaS platform for project management with real-time collaboration features, team management, and detailed analytics. Supports multiple workspaces and integrates with popular tools.",
      technologies: JSON.stringify([
        "Vue.js",
        "Express",
        "Socket.io",
        "MongoDB",
        "Redis",
        "Docker",
      ]),
      features: JSON.stringify([
        "Real-time collaboration",
        "Team and workspace management",
        "Advanced reporting and analytics",
        "File sharing and storage",
        "Third-party integrations",
        "Mobile applications",
      ]),
      category: "SaaS",
      status: "Live",
      liveUrl: "https://example-taskmanager.com",
      githubUrl: "https://github.com/ezedin/task-management-saas",
      isFeatured: true,
      order: 2,
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description:
        "A data visualization platform with machine learning capabilities for business intelligence and predictive analytics.",
      longDescription:
        "Created an advanced analytics dashboard that processes large datasets and provides insights through machine learning algorithms. Features include predictive analytics, custom reporting, and automated alerts.",
      technologies: JSON.stringify([
        "React",
        "Python",
        "Django",
        "TensorFlow",
        "PostgreSQL",
        "AWS",
      ]),
      features: JSON.stringify([
        "Machine learning predictions",
        "Custom data visualization",
        "Automated reporting",
        "Real-time data processing",
        "API integrations",
        "Role-based access control",
      ]),
      category: "AI/ML",
      status: "In Development",
      liveUrl: "https://example-analytics.com",
      githubUrl: "https://github.com/ezedin/ai-analytics-dashboard",
      isFeatured: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  console.log("✅ Projects seeded");

  // Seed Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "InnovateX",
      content:
        "Ezedin is an exceptional developer. Their ability to translate complex requirements into elegant, scalable solutions is truly impressive. The attention to detail and commitment to quality made our project a huge success. Highly recommend!",
      rating: 5,
      linkedin: "https://linkedin.com/in/sarahj",
      order: 1,
      isActive: true,
    },
    {
      name: "Michael Chen",
      role: "CTO",
      company: "GlobalTech",
      content:
        "Working with Ezedin was a game-changer for our startup. Their expertise in full-stack development and cloud infrastructure helped us launch our MVP ahead of schedule with robust performance. A true professional and a pleasure to collaborate with.",
      rating: 5,
      linkedin: "https://linkedin.com/in/michaelc",
      order: 2,
      isActive: true,
    },
    {
      name: "Emily Rodriguez",
      role: "Founder & CEO",
      company: "CreativeFlow",
      content:
        "Ezedin delivered beyond our expectations. The custom web application they built not only looks fantastic but also performs flawlessly. Their proactive communication and problem-solving skills were invaluable throughout the entire development process.",
      rating: 5,
      linkedin: "https://linkedin.com/in/emilyr",
      order: 3,
      isActive: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  console.log("✅ Testimonials seeded");

  // Seed Experiences - Using REAL data from frontend
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "MELAVERSE TECHNOLOGIES",
      location: "Remote",
      type: "Full-time",
      period: "2022 - Present",
      description:
        "Leading full-stack development and cloud architecture for enterprise clients.",
      achievements: JSON.stringify([
        {
          title: "Microservices Architecture",
          description: "Built microservices for 100K+ daily users",
          impact: "99.9% uptime",
        },
        {
          title: "Performance Optimization",
          description: "Reduced response time by 60%",
          impact: "3x faster loads",
        },
        {
          title: "Team Leadership",
          description: "Led team of 5 developers in agile practices",
          impact: "40% faster delivery",
        },
        {
          title: "CI/CD Implementation",
          description: "Built pipelines, reduced deployment time by 80%",
          impact: "Zero downtime",
        },
      ]),
      technologies: JSON.stringify([
        "React",
        "Node.js",
        "AWS",
        "Docker",
        "PostgreSQL",
        "GraphQL",
      ]),
      highlights: JSON.stringify([
        "Leadership",
        "Architecture",
        "Performance",
        "DevOps",
      ]),
      order: 1,
    },
    {
      title: "Full-Stack Developer",
      company: "MELAVERSE TECHNOLOGIES",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      period: "2021 - 2022",
      description:
        "Built and maintained web applications with modern frameworks.",
      achievements: JSON.stringify([
        {
          title: "Scalable Web Apps",
          description: "Built apps serving 50K+ users",
          impact: "Zero issues",
        },
        {
          title: "API Integration",
          description: "Integrated third-party APIs and payments",
          impact: "Seamless UX",
        },
        {
          title: "Quality Assurance",
          description: "Automated testing with 90% coverage",
          impact: "95% fewer bugs",
        },
        {
          title: "UI/UX Collaboration",
          description: "Created intuitive interfaces with designers",
          impact: "40% more engagement",
        },
      ]),
      technologies: JSON.stringify([
        "Vue.js",
        "Express",
        "MongoDB",
        "Heroku",
        "Jest",
        "Redis",
      ]),
      highlights: JSON.stringify([
        "Frontend",
        "Backend",
        "Testing",
        "Collaboration",
      ]),
      order: 2,
    },
    {
      title: "Software Developer",
      company: "JIMMA UNIVERSITY",
      location: "Addis Ababa, Ethiopia",
      type: "Full-time",
      period: "2020 - 2021",
      description:
        "Early-stage product development and establishing best practices.",
      achievements: JSON.stringify([
        {
          title: "MVP Development",
          description: "Built MVP for fintech app",
          impact: "Successful launch",
        },
        {
          title: "Process Establishment",
          description: "Set up code review and documentation standards",
          impact: "Better code quality",
        },
        {
          title: "Mentorship",
          description: "Mentored juniors and conducted interviews",
          impact: "Team growth",
        },
        {
          title: "Real-time Features",
          description: "Built real-time features with WebSocket",
          impact: "Better UX",
        },
      ]),
      technologies: JSON.stringify([
        "React",
        "Python",
        "Django",
        "PostgreSQL",
        "WebSocket",
        "AWS",
      ]),
      highlights: JSON.stringify([
        "MVP",
        "Processes",
        "Mentoring",
        "Real-time",
      ]),
      order: 3,
    },
    {
      title: "Frontend Developer Intern",
      company: "EVERGREEN TECHNOLOGIES",
      location: "Remote",
      type: "Internship",
      period: "2019 - 2020",
      description: "Frontend development and client project delivery.",
      achievements: JSON.stringify([
        {
          title: "Client Projects",
          description: "Built 10+ responsive websites",
          impact: "100% satisfaction",
        },
        {
          title: "Technology Learning",
          description: "Learned modern CSS and JS libraries",
          impact: "Skill expansion",
        },
        {
          title: "Client Interaction",
          description: "Led client meetings and requirements",
          impact: "Better communication",
        },
        {
          title: "Open Source",
          description: "Contributed to open-source projects",
          impact: "Community involvement",
        },
      ]),
      technologies: JSON.stringify([
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap",
        "jQuery",
        "Git",
      ]),
      highlights: JSON.stringify([
        "Learning",
        "Client Work",
        "Open Source",
        "Growth",
      ]),
      order: 4,
    },
  ];

  for (const experience of experiences) {
    await prisma.experience.create({ data: experience });
  }

  console.log("✅ Experiences seeded");

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
