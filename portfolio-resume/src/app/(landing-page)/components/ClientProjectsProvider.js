"use client";

import { ProjectsContextProvider } from "../context/ProjectsContext";

// This is a client component that provides the context
export function ClientProjectsProvider({ projects, children }) {
  return (
    <ProjectsContextProvider projects={projects}>
      {children}
    </ProjectsContextProvider>
  );
}
