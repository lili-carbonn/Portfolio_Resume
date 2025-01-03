"use client";
import ProjectModal from "./ProjectModal";
import { useState } from "react";
const ProjectSection = () => {
  const projects = [
    {
      id: 1,
      title: "AI Summarization Tool",
      tags: ["AWS", "React", "Cloudflare"],
      description: "A tool that summarizes long articles into short paragraphs using AI.",
      fullDescription:
        "This project uses AWS Lambda functions to process text data and return a summarized version of the content. The front-end is built with React and hosted on Cloudflare Pages.",
      image: "/summarization.png",
      techStack: ["React", "AWS", "Cloudflare", "TailwindCSS", "NodeJS"],
    },
    {
      id: 2,
      title: "Newsletter App",
      tags: ["NextJs", "Cloudflare", "PayloadCMS"],
      description: "A newsletter app that sends daily updates to subscribers.",
      fullDescription:
        "This project uses NextJS to build the front-end and PayloadCMS to manage content. The app is hosted on Cloudflare Workers.",
      image: "/proj.png",
      techStack: ["NextJS", "Cloudflare", "PayloadCMS", "TailwindCSS", "NodeJS", "TypeScript"],
    },
    {
      id: 3,
      title: "Feedback Platform",
      tags: ["TS", "Postgres", "DrizzleORM"],
      description: "A platform for collecting feedback from users.",
      fullDescription:
        "This project uses TypeScript and Postgres to store user feedback. DrizzleORM is used to manage the database schema.",
      image: "/feedback.png",
      techStack: ["TypeScript", "Postgres", "DrizzleORM", "TailwindCSS", "NodeJS", "Stripe API"],
    },
    {
      id: 4,
      title: "AI Quiz Generator",
      tags: ["TS", "NextJS", "DrizzleORM"],
      description: "A quiz generator that uses AI to generate questions.",
      fullDescription:
        "This project uses TypeScript and NextJS to build the front-end. Langchain is used to manage AI requests and responses.",
      image: "/quiz.png",
      techStack: ["TypeScript", "NextJS", "OpenAI", "TailwindCSS", "NodeJS", "Stripe API"],
    },
    {
      id: 5,
      title: "Form Builder Tool",
      tags: ["NextJS", "React", "TailwindCSS", "Prisma"],
      description: "A tool that allows users to create custom forms.",
      fullDescription:
        "This project uses NextJS and React to build the front-end. Prisma is used to manage the database schema.",
      image: "/form.png",
      techStack: ["NextJS", "React", "Prisma", "TailwindCSS", "NodeJS", "Stripe API"],
    },
    {
      id: 6,
      title: "Blog Website",
      tags: ["MDX", "NextJS", "TailwindCSS", "Framer Motion"],
      description: "A blog website with animated page transitions.",
      fullDescription:
        "This project uses MDX and NextJS to build the front-end. Framer Motion is used to create page transitions.",
      image: "/blog.png",
      techStack: ["MDX", "NextJS", "Framer Motion", "TailwindCSS", "NodeJS", "Stripe API"],
    },
  ];

  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (id) => {
    setSelectedProject(id);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    const currentIndex = projects.findIndex((project) => project.id === selectedProject);

    if (currentIndex === -1) {
      return null;
    }

    const nextIndex = (currentIndex + 1) % projects.length;

    setSelectedProject(projects[nextIndex].id);
  };

  const handlePrevProject = () => {
    const currentIndex = projects.findIndex((project) => project.id === selectedProject);

    if (currentIndex === -1) {
      return null;
    }

    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

    setSelectedProject(projects[prevIndex].id);
  };

  return (
    <section
      id="projects"
      className="px-4 py-32 sm:px-6 lg:px-8"
    >
      <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, index) => (
          <button
            onClick={() => handleProjectClick(project.id)}
            key={index}
            className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-primary-500/50 transition-colors hover:shadow-sm text-left"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-1 mt-auto">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs rounded-full bg-primary-500/20 text-primary-200 border border-primary-500/30 "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={projects.find((project) => project.id === selectedProject)}
          onClose={handleCloseModal}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </section>
  );
};

export default ProjectSection;
