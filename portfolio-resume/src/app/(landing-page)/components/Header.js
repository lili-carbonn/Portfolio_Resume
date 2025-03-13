"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProjectsDropdown from "./ProjectsDropdown";
import { useProjects } from "../context/ProjectsContext";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const projects = useProjects();
  const [isMounted, setIsMounted] = useState(false);
  
  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  const handleNavigation = (sectionId) => {
    // Only run client-side
    if (typeof window !== 'undefined') {
      // Check if we're already on the home page
      if (window.location.pathname !== '/') {
        router.push(`/#${sectionId}`);
      } else {
        // If we're already on the home page, just scroll to the section
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-gradient-to-r from-purple-200 to-amber-50 backdrop-blur-sm shadow-md">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto p-18 md:p-12 lg:p-20">
        <Link
          href={"/"}
          className="text-2xl md:text-3xl text-foreground font-normal relative overflow-hidden group"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:text-primary-600">Portfolio</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <div
          className="menu hidden md:block md:w-auto"
          id="navbar"
        >
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            <li>
              <Link
                href="/posts/about"
                className="text-foreground relative px-3 py-2 overflow-hidden group flex items-center justify-center"
              >
                <span className="relative z-10 transition-all duration-300 group-hover:text-primary-600">About</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 w-full h-full bg-amber-50 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-300 -z-10"></span>
              </Link>
            </li>
            <li>
              {isMounted && <ProjectsDropdown projects={projects} />}
            </li>
            <li>
              <Link
                href="/posts/contact"
                className="text-foreground relative px-3 py-2 overflow-hidden group flex items-center justify-center"
              >
                <span className="relative z-10 transition-all duration-300 group-hover:text-primary-600">Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 w-full h-full bg-amber-50 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-10 rounded-lg transition-all duration-300 -z-10"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
