'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Project page error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-8 pb-20 sm:p-20 bg-gradient-to-r from-amber-50 to-purple-100 rounded-xl">
      <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Something went wrong</h1>
      <p className="text-center text-gray-500 mb-8">
        An error occurred while loading this project.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-amber-50 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-200 hover:border-primary-300 transition-all duration-300"
        >
          Try again
        </button>
        <Link
          href="/#projects"
          className="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-200 hover:text-gray-800 transition-all duration-300"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
