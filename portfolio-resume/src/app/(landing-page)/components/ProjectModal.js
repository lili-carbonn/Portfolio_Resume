import Image from "next/image";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function ProjectModal({ project, onClose, onNext, onPrev }) {
  const modalRef = useRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Ensure project data is valid
  if (!project) {
    return null;
  }

  const {
    title = "Untitled Project",
    description = "No description available",
    fullDescription = "No full description available",
    image = "/placeholder-project.jpg",
    techStack = [],
    link = "",
    tags = []
  } = project;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      // Adjust expanded state based on screen size
      if (window.innerWidth < 768 && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  // Handle modal scroll lock
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  const handleOutsideClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOutsideClick}
      ref={modalRef}
    >
      <div
        ref={modalRef}
        className={`bg-gray-900/90 backdrop-blur-md rounded-2xl max-w-5xl w-11/12 border border-gray-700/30 p-4 sm:p-6 md:p-8 relative ${isExpanded ? 'max-h-[85vh] overflow-y-auto' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight pr-8">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-2 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 shrink-0"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="space-y-4 md:w-1/2">
            {/* Project link */}
            {link && (
              <div className="mb-6">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary-500/10 text-primary-200 border border-primary-500/20 rounded-xl hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300 hover:scale-105 group"
                >
                  <span>View Project</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            )}
            
            {/* Description */}
            <div>
              <p className={`text-gray-300 text-base sm:text-lg leading-relaxed ${isExpanded ? '' : 'line-clamp-4'}`}>
                {fullDescription || description}
              </p>
              {fullDescription && fullDescription.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary-300 hover:text-primary-200 text-sm mt-2 transition-colors flex items-center gap-1"
                >
                  {isExpanded ? 'Show Less ↑' : 'Read More ↓'}
                </button>
              )}
            </div>
            {/* Display tags */}
            {tags && tags.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-3 text-primary-300 text-base sm:text-lg">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs rounded-full bg-primary-500/10 text-primary-200 border border-primary-500/20 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Display tech stack */}
            {techStack && techStack.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-primary-300 text-base sm:text-lg">Tech Stack</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {techStack.map((tech, index) => (
                    <li
                      key={index}
                      className="text-gray-400 text-sm sm:text-base flex items-center before:content-['•'] before:text-primary-500/50 before:mr-2 break-words"
                    >
                      <span className="line-clamp-1">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative h-48 sm:h-56 md:h-64 w-full md:w-1/2 rounded-xl overflow-hidden border border-gray-700/30">
            <Image
              src={imageError ? "/placeholder-project.jpg" : image}
              alt={title}
              fill
              onError={handleImageError}
              className="object-cover hover:scale-105 transition-transform duration-500"
              unoptimized={image && image.startsWith('/api/')} // Don't optimize API images
            />
          </div>
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-800/50 rounded-full p-2 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 text-gray-400 hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-800/50 rounded-full p-2 hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 text-gray-400 hover:text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
