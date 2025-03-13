"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useInView from "../hooks/useInView";
import ImageWithFallback from "./ImageWithFallback";

const ProjectCard = ({ project, index }) => {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px' // Trigger a bit before the element is fully in view
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <Link
      href={`/projects/${project.id}`}
      ref={ref}
      className={`group bg-gradient-to-r from-amber-50 to-purple-100 backdrop-blur-md rounded-xl p-3 border border-gray-300 hover:border-primary-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1 block h-full ${isInView ? 'animate-scroll-fade-in' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center justify-center text-center gap-1 h-full">
        {/* Title at the top */}
        <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary-700 transition-colors">{project.title}</h3>
        
        {/* Image */}
        {project.image && (
          <div className="mb-1 overflow-hidden rounded-lg h-36 w-full flex justify-center items-center bg-gray-100 relative">
            <ImageWithFallback 
              src={project.image} // Use the image path directly
              alt={project.title || "Project image"} 
              width={240}
              height={135}
              sizes="(max-width: 768px) 100vw, 240px"
              className="max-h-36 w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ width: 'auto', height: 'auto' }}
              priority // Prioritize loading these images
              loading="eager"
              unoptimized={true}
              onError={(e) => {
                console.error("Error loading image:", e.target.src);
                // Try different fallbacks
                console.log("Using default fallback");
                e.target.src = "/Orb_Example_Image.webp";
              }}
            />
          </div>
        )}
        
        {/* Tags underneath the image */}
        <div className="flex flex-wrap gap-1 mb-1 justify-center">
          {project.tags && project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-0.5 text-xs rounded-full bg-amber-50 text-primary-700 border border-primary-200 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Description at the bottom */}
        <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
      </div>
    </Link>
  );
};

const ProjectCards = ({ projects = [] }) => {
  // Handle case where projects is undefined or empty
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No projects available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} index={index} />
      ))}
    </div>
  );
};

export default ProjectCards;
