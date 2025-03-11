"use client";

import ProjectCards from "./ProjectCards";
import AnimatedSectionTitle from "./AnimatedSectionTitle";
import { useProjects } from "../context/ProjectsContext";
import { useState, useEffect } from "react";

// Fallback projects in case there are no projects in the database
const fallbackProjects = [
  {
    "id": "yelp-dataset-challenge",
    "title": "Yelp Dataset Challenge: Identifying Influential Users",
    "tags": ["Graph Neural Networks", "Machine Learning", "Social Network Analysis", "Python", "PyTorch Geometric", "Sentence-BERT"],
    "description": "This project implements a graph-based machine learning approach to identify influential users on Yelp.",
    "fullDescription": "This project implements a graph-based machine learning approach to identify influential users on Yelp. Users and businesses are represented as nodes, with reviews forming edges in a heterogeneous graph. The model leverages Sentence-BERT embeddings for text analysis, network centrality metrics, and sentiment features. A Graph Convolutional Network (GCN) serves as a baseline, while an enhanced Graph Attention Network (GAT) improves accuracy by incorporating multi-head attention. The study demonstrates that integrating multiple feature types significantly enhances prediction accuracy, reaching 81% in classifying influential users.",
    "image": "/Screenshot 2025-03-07 134115.png",
    "techStack": ["Python", "PyTorch", "PyTorch Geometric", "Sentence-BERT", "NetworkX", "Scikit-learn"],
    "link": "https://github.com/lili-carbonn/yelp-dataset-challenge"
  },
  {
    "id": "fallback1",
    "title": "Multithreaded Concurrency Examples",
    "tags": ["C", "Multithreading", "Concurrency", "POSIX", "Synchronization"],
    "description": "Demonstrates advanced multithreaded programming concepts in C with two simulations that showcase thread synchronization and deadlock prevention.",
    "fullDescription": "This project contains two C programs that demonstrate advanced multithreaded programming concepts. The first program (shoeElection.c) simulates different types of shoes taking turns on a stage in a round-robin fashion, using mutexes and condition variables for synchronization. The second program (FedOops.c) simulates a package processing system with colored teams of workers processing packages through various stations, using semaphores to prevent deadlocks by implementing an all-or-nothing resource acquisition strategy.",
    "image": "/Example_Image_OS_Project.jpeg",
    "techStack": ["C", "POSIX Threads", "POSIX Semaphores", "Mutexes", "Condition Variables"],
    "link": "https://github.com/lili-carbonn/OS_Simulation_Project_Public"
  },
  {
    "id": "fallback2",
    "title": "NSF REU: Materials Research with Data Science",
    "tags": ["Machine Learning", "Computer Vision", "Materials Science", "Data Science", "Microscopy"],
    "description": "Used machine learning and computer vision to analyze Transmission Electron Microscopy (TEM) scans of plant cellulose synthesis complex (CSC).",
    "fullDescription": "Participated in an NSF REU program focused on applying data science to materials research. Implemented YOLO (You Only Look Once) to detect and classify structural components in microscopic images. Developed skills in data preprocessing, model optimization, and scientific communication. Presented findings at a research symposium.",
    "image": "/Yolov9segPred.jpeg",
    "techStack": ["Python", "YOLO", "RoboFlow", "OpenCV", "MATLAB"],
    "link": "https://mse.ncsu.edu/reu/past/"
  },
  {
    "id": "fallback3",
    "title": "Interactive Qualifying Project (IQP) – Mental Health in Emergency Services",
    "tags": ["Mental Health", "Data Analysis", "Interdisciplinary Research", "Public Health", "Emergency Services"],
    "description": "Analyzed mental health programs for emergency service workers in Victoria, Australia, through interdisciplinary research and data analysis.",
    "fullDescription": "Worked with an interdisciplinary team to evaluate mental health programs for emergency service workers in Victoria, Australia. Collaborated with students from biology, psychology, and engineering, as well as faculty from sociology, chemistry, and management. Conducted interviews and performed data analysis to identify patterns and gaps in support services. Provided recommendations for improving mental health resources in emergency service organizations.",
    "image": "/ESF-WPI-Project-2024-GR-Final.jpg",
    "techStack": ["Python", "R", "Qualtrics"],
    "link": "https://digital.wpi.edu/concern/student_works/sq87c0237?locale=en"
  },
  {
    "id": "fallback4",
    "title": "3D Sphere Animation with WebGL",
    "tags": ["WebGL", "JavaScript", "3D Graphics", "Animation"],
    "description": "A 3D sphere that animates along a curve path using WebGL.",
    "fullDescription": "This project demonstrates a 3D sphere that can animate along a curve path using WebGL. It features multiple lighting modes (lit or wireframe), shading modes (flat or Phong), and interactive camera controls. The curve path is generated using Chaikin's corner cutting algorithm with adjustable subdivision levels.",
    "image": "/Orb_Example_Image.png",
    "techStack": ["JavaScript", "WebGL", "GLSL", "HTML5", "CSS3"],
    "link": "https://github.com/lili-carbonn/Render_Orb_Spinning_Public"
  }
];

const ProjectSection = () => {
  // Get the basic project data from context with fallback to empty array
  const basicProjects = useProjects() || [];
  // State to store the enhanced project data
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    // If we have projects from context, use them directly or enhance them with fallback data
    if (basicProjects.length > 0) {
      const enhancedProjects = basicProjects.map(project => {
        // First, check if this is the Yelp Dataset Challenge project by title
        if (project.title && project.title.includes("Yelp Dataset Challenge")) {
          // Use the predefined Yelp Dataset Challenge project
          const yelpProject = fallbackProjects.find(fp => fp.id === "yelp-dataset-challenge");
          return {
            ...yelpProject,
            id: project.id || yelpProject.id
          };
        }
        
        // Otherwise, try to find a matching fallback project
        const fallbackProject = fallbackProjects.find(
          fallback => (fallback.title && project.title && 
            (fallback.title.includes(project.title) || project.title.includes(fallback.title)))
        );
        
        // If we found a matching fallback, use its data to enhance the basic project
        if (fallbackProject) {
          return {
            ...fallbackProject,
            id: project.id || fallbackProject.id,
            title: project.title || fallbackProject.title
          };
        }
        
        // Otherwise, create a basic enhanced project while preserving the original title
        return {
          id: project.id,
          title: project.title, // Preserve the original title
          tags: ['Project'],
          description: `Details for ${project.title}`,
          fullDescription: `Full details for ${project.title}`,
          image: '/Example_Image_OS_Project.jpeg',
          link: '#'
        };
      });
      
      setProjects(enhancedProjects);
    } else {
      // If no projects from context, use fallback projects
      setProjects(fallbackProjects);
    }
  }, [basicProjects]);
  
  return (
    <section
      id="projects"
      className="px-4 pt-10 pb-20 sm:px-8 lg:px-16 bg-gradient-to-b from-transparent to-primary-50/30"
    >
      <AnimatedSectionTitle>
        Featured Projects
      </AnimatedSectionTitle>
      <ProjectCards projects={projects} />
    </section>
  );
};

export default ProjectSection;
