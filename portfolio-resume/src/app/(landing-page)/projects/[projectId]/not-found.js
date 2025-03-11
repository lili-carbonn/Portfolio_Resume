import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto p-8 pb-20 sm:p-20 bg-gradient-to-r from-amber-50 to-purple-100 rounded-xl">
      <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Project Not Found</h1>
      <p className="text-center text-gray-500 mb-8">
        The project you are looking for does not exist.
      </p>
      <div className="flex justify-center">
        <Link
          href="/#projects"
          className="px-6 py-3 bg-amber-50 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-200 hover:border-primary-300 transition-all duration-300"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
