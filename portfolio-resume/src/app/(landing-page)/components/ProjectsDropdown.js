"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ProjectsDropdown = ({ projects = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-foreground relative px-3 py-2 overflow-hidden group flex items-center justify-center"
      >
        <span className="relative z-10 transition-all duration-300 group-hover:text-primary-600">
          Projects
        </span>
        <ChevronDownIcon 
          className={`ml-0.5 h-3.5 w-3.5 transition-all duration-300 group-hover:text-primary-600 ${isOpen ? 'rotate-180' : ''}`} 
        />
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
        <span className="absolute inset-0 w-full h-full bg-amber-50 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-300 -z-10"></span>
      </button>

      {isOpen && (
        <div 
          className="absolute mt-2 w-64  rounded-lg shadow-xl backdrop-blur-md border bg-amber-50 border-primary-100 z-20 overflow-hidden animate-fadeIn origin-top"
        >
          <div className="py-1">
            <Link
              href="/#projects"
              className="block px-4 py-3 text-sm text-foreground hover:bg-primary-50/70 hover:text-primary-700 transition-all duration-200 hover:pl-6 group"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-medium">All Projects</span>
              <span className="block text-xs text-gray-500 group-hover:text-primary-500 transition-colors duration-200">View the complete collection</span>
            </Link>
            
            <div className="border-t border-primary-100 my-1"></div>
            
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`block px-4 py-2.5 text-sm text-foreground hover:bg-primary-50/70 hover:text-primary-700 truncate transition-all duration-200 hover:pl-6 hover:scale-[1.01] transform animate-slideIn opacity-0`}
                onClick={() => setIsOpen(false)}
                style={{
                  animationDelay: `${index * 30}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {project.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsDropdown;
