"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleNavigation = (sectionId) => {
    router.push('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto py-2 p-8 md:p-12 lg:p-20">
        <Link
          href={"/"}
          className="text-2xl md:text-3xl text-white font-normal"
        >
          Portfolio
        </Link>
        <div
          className="menu hidden md:block md:w-auto"
          id="navbar"
        >
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            <li>
              <Link
                href="/posts/1"
                className="hover:text-slate-200 transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/');
                  setTimeout(() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300);
                }}
                className="hover:text-slate-200"
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
