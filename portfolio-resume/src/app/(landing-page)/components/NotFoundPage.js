'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFoundPage() {
  const pathname = usePathname();
  
  // Determine context-specific content based on the current path
  const getContextSpecificContent = () => {
    if (pathname.startsWith('/projects/')) {
      return {
        title: "Project Not Found",
        message: "The project you are looking for does not exist.",
        backLink: "/#projects",
        backText: "Back to Projects"
      };
    } else if (pathname.startsWith('/posts/')) {
      return {
        title: "Post Not Found",
        message: "The post you are looking for does not exist.",
        backLink: "/",
        backText: "Go back home"
      };
    } else {
      return {
        title: "Page Not Found",
        message: "The page you are looking for does not exist.",
        backLink: "/",
        backText: "Go back home"
      };
    }
  };

  const { title, message, backLink, backText } = getContextSpecificContent();

  return (
    <div className="container mx-auto p-8 pb-20 sm:p-20 bg-gradient-to-r from-amber-50 to-purple-100 rounded-xl">
      <h1 className="text-5xl font-bold mb-5 leading-normal text-center">{title}</h1>
      <p className="text-center text-gray-500 mb-8">
        {message}
      </p>
      <div className="flex justify-center">
        <Link
          href={backLink}
          className="px-6 py-3 bg-amber-50 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-200 hover:border-primary-300 transition-all duration-300"
        >
          {backText}
        </Link>
      </div>
    </div>
  );
}
