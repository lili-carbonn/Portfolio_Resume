"use client";

import { ProjectsContextProvider } from "../context/ProjectsContext";
import Header from "./Header";

// This is a client component that provides the context
export function ClientProjectsProvider({ projects, children }) {
  return (
    <ProjectsContextProvider projects={projects}>
      <Header />
      {children}
    </ProjectsContextProvider>
  );
}
