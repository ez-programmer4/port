export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ezedin Ebrahim",
    jobTitle: "Full Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud solutions",
    url: "https://ezedin.me",
    sameAs: [
      "https://github.com/ez-programmer4",
      "https://linkedin.com/in/ezedinebrahim", // Update with your actual LinkedIn
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Full Stack Development",
      "Cloud Computing",
      "Web Development",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Jimma University",
    },
    email: "ezedinebrahim111@gmail.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

