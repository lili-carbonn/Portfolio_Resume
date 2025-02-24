"use client";
import ProjectModal from "./ProjectModal";
import { useState } from "react";
const ProjectSection = () => {
  const projects = [
    {
      "id": 1,
      "title": "Multithreaded Concurrency Examples",
      "tags": ["C", "Multithreading", "Concurrency", "POSIX", "Synchronization"],
      "description": "Demonstrates advanced multithreaded programming concepts in C with two simulations that showcase thread synchronization and deadlock prevention.",
      "fullDescription": "This project contains two C programs that demonstrate advanced multithreaded programming concepts. The first program (shoeElection.c) simulates different types of shoes taking turns on a stage in a round-robin fashion, using mutexes and condition variables for synchronization. The second program (FedOops.c) simulates a package processing system with colored teams of workers processing packages through various stations, using semaphores to prevent deadlocks by implementing an all-or-nothing resource acquisition strategy.",
      "image": "/Example_Image_OS_Project.jpeg",
      "techStack": ["C", "POSIX Threads", "POSIX Semaphores", "Mutexes", "Condition Variables"],
      "link": "https://github.com/lili-carbonn/OS_Simulation_Project_Public"
    },
    {
      "id": 2,
      "title": "NSF REU: Materials Research with Data Science",
      "tags": ["Machine Learning", "Computer Vision", "Materials Science", "Data Science", "Microscopy"],
      "description": "Used machine learning and computer vision to analyze Transmission Electron Microscopy (TEM) scans of plant cellulose synthesis complex (CSC).",
      "fullDescription": "Participated in an NSF REU program focused on applying data science to materials research. Implemented YOLO (You Only Look Once) to detect and classify structural components in microscopic images. Developed skills in data preprocessing, model optimization, and scientific communication. Presented findings at a research symposium.",
      "image": "/Yolov9segPred.jpeg",
      "techStack": ["Python", "YOLO", "RoboFlow", "OpenCV", "MATLAB"],
      "link": "https://mse.ncsu.edu/reu/past/"
    },
    {
      "id": 3,
      "title": "Interactive Qualifying Project (IQP) – Mental Health in Emergency Services",
      "tags": ["Mental Health", "Data Analysis", "Interdisciplinary Research", "Public Health", "Emergency Services"],
      "description": "Analyzed mental health programs for emergency service workers in Victoria, Australia, through interdisciplinary research and data analysis.",
      "fullDescription": "Worked with an interdisciplinary team to evaluate mental health programs for emergency service workers in Victoria, Australia. Collaborated with students from biology, psychology, and engineering, as well as faculty from sociology, chemistry, and management. Conducted interviews and performed data analysis to identify patterns and gaps in support services. Provided recommendations for improving mental health resources in emergency service organizations.",
      "image": "/ESF-WPI-Project-2024-GR-Final.jpg",
      "techStack": ["Python", "R", "Qualtrics"],
      "link": "https://digital.wpi.edu/concern/student_works/sq87c0237?locale=en"
    },
    {
      "id": 4,
      "title": "3D Sphere Animation with WebGL",
      "tags": ["WebGL", "JavaScript", "3D Graphics", "Animation"],
      "description": "A 3D sphere that animates along a curve path using WebGL.",
      "fullDescription": "This project demonstrates a 3D sphere that can animate along a curve path using WebGL. It features multiple lighting modes (lit or wireframe), shading modes (flat or Phong), and interactive camera controls. The curve path is generated using Chaikin's corner cutting algorithm with adjustable subdivision levels.",
      "image": "/Orb_Example_Image.png",
      "techStack": ["JavaScript", "WebGL", "GLSL", "HTML5", "CSS3"],
      "link": "https://github.com/lili-carbonn/Render_Orb_Spinning_Public"
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
      className="px-4 py-40 sm:px-8 lg:px-16 bg-gradient-to-b from-transparent to-gray-900/10"
    >
      <h2 className="text-4xl font-bold text-white mb-16 text-center tracking-tight">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <button
            onClick={() => handleProjectClick(project.id)}
            key={index}
            className="group bg-gray-800/20 backdrop-blur-md rounded-xl p-8 border border-gray-700/30 hover:border-primary-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1 text-left"
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-primary-300 transition-colors">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-200 border border-primary-500/20 backdrop-blur-sm"
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
