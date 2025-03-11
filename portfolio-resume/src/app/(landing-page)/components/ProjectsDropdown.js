"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ProjectsDropdown = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-foreground hover:text-primary-600 transition-all duration-300"
      >
        Projects
        <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-background border border-gray-300 ring-1 ring-black ring-opacity-5 z-20">
          <div className="py-1 max-h-60 overflow-y-auto">
            <Link
              href="/#projects"
              className="block px-4 py-2 text-sm text-foreground hover:bg-primary-50 hover:text-primary-700"
              onClick={() => setIsOpen(false)}
            >
              All Projects
            </Link>
            
            <div className="border-t border-gray-300 my-1"></div>
            
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block px-4 py-2 text-sm text-foreground hover:bg-primary-50 hover:text-primary-700 truncate"
                onClick={() => setIsOpen(false)}
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
