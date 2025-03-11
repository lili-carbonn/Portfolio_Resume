"use client";

import Link from "next/link";

const ProjectsInline = ({ projects = [] }) => {
  // If there are no projects, just show the "All Projects" link
  if (!projects || projects.length === 0) {
    return (
      <Link
        href="/#projects"
        className="text-foreground relative px-2 py-1 overflow-hidden group"
      >
        <span className="relative z-10 transition-all duration-300 group-hover:text-primary-600">Projects</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
        <span className="absolute inset-0 w-full h-full bg-amber-50 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-300 -z-10"></span>
      </Link>
    );
  }

  // Show up to 3 projects inline, plus an "All Projects" link
  const displayedProjects = projects.slice(0, 3);

  return (
    <div className="flex space-x-6">
      {displayedProjects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.id}`}
          className="text-foreground relative px-2 py-1 overflow-hidden group"
        >
          <span className="relative z-10 transition-all duration-300 group-hover:text-primary-600">
            {project.title.length > 15 ? `${project.title.substring(0, 15)}...` : project.title}
          </span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
          <span className="absolute inset-0 w-full h-full bg-amber-50 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-300 -z-10"></span>
        </Link>
      ))}
      
      <Link
        href="/#projects"
        className="text-foreground relative px-2 py-1 overflow-hidden group"
      >
        <span className="relative z-10 transition-all duration-300 group-hover:text-primary-600">All Projects</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
        <span className="absolute inset-0 w-full h-full bg-amber-50 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-300 -z-10"></span>
      </Link>
    </div>
  );
};

export default ProjectsInline;
