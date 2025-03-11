"use client";

import { createContext, useContext } from 'react';

// Create the context with a default empty array
export const ProjectsContext = createContext([]);

// Custom hook to use the context
export const useProjects = () => {
  return useContext(ProjectsContext);
};

// Provider component
export const ProjectsContextProvider = ({ children, projects = [] }) => {
  return (
    <ProjectsContext.Provider value={projects}>
      {children}
    </ProjectsContext.Provider>
  );
};
