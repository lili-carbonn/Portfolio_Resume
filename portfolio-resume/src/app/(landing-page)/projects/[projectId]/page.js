import Image from "next/image";
import Link from "next/link";
import { getPayload } from "/src/app/lib/payload";
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";

// Add cache control to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ProjectPage = async ({ params }) => {
  const resolvedParams = await params;
  const { projectId } = resolvedParams;
  const payload = await getPayload();
  
  try {
    console.log('Fetching project with ID:', projectId);
    
    // Query for the project by ID
    const posts = await payload.find({
      collection: "posts",
      where: {
        and: [
          {
            id: {
              equals: projectId
            }
          },
          {
            type: {
              equals: "project"
            }
          }
        ]
      }
    });

    console.log("Project query result:", posts);

    if (!posts?.docs?.length) {
      console.log("No project found for ID:", projectId);
    return (
      <div className="w-full">
        <div className="container mx-auto p-8 pb-20 sm:p-20">
          <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Project not found</h1>
          <p className="text-center text-gray-500">The requested project could not be found.</p>
          <div className="mt-8 text-center">
            <Link href="/#projects" className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-200 hover:border-primary-300 transition-all duration-300 hover:scale-105">
              <span>Back to Projects</span>
            </Link>
          </div>
        </div>
      </div>
    );
    }

    const project = posts.docs[0];
    console.log("Project data:", project);
    
    // Ensure the links are valid URLs
    let projectLink = project.link;
    let additionalInfoLink = project.additionalInfoLink;
    
    if (projectLink) {
      // If the link doesn't start with http:// or https://, add https://
      if (!projectLink.startsWith('http://') && !projectLink.startsWith('https://')) {
        projectLink = 'https://' + projectLink;
      }
      console.log("Project link:", projectLink);
    }
    
    if (additionalInfoLink) {
      // If the link doesn't start with http:// or https://, add https://
      if (!additionalInfoLink.startsWith('http://') && !additionalInfoLink.startsWith('https://')) {
        additionalInfoLink = 'https://' + additionalInfoLink;
      }
      console.log("Additional info link:", additionalInfoLink);
    }

    // Helper function to extract tags from media
    const extractTags = (media) => {
      if (!media || !media.tags || !media.tags.length) return [];
      return media.tags.map(tagObj => tagObj.tag || tagObj).filter(Boolean);
    };

    // Extract tags from project image or card image
    let tags = ['Project']; // Default tag
    
    // Add tags from card image if available
    if (project.cards && project.cards.length > 0 && project.cards[0].image) {
      const cardImageTags = extractTags(project.cards[0].image);
      if (cardImageTags.length > 0) {
        tags = [...tags, ...cardImageTags];
      }
    } 
    // Otherwise add tags from project image if available
    else if (project.image) {
      const projectImageTags = extractTags(project.image);
      if (projectImageTags.length > 0) {
        tags = [...tags, ...projectImageTags];
      }
    }

    // Get the image URL - use the API URL directly
    let imageUrl = '/placeholder-project.jpg';
    
    // First try to get the image from the card
    if (project.cards && project.cards.length > 0 && project.cards[0].image) {
      if (project.cards[0].image.url) {
        imageUrl = project.cards[0].image.url;
      }
    } 
    // If no card image, try the post image
    else if (project.image) {
      if (project.image.url) {
        imageUrl = project.image.url;
      }
    }
    
    console.log("Using image URL:", imageUrl);

    return (
      <div className="w-full">
        <div className="container mx-auto p-8 pb-20 sm:p-20">
          <div className="mb-8">
          <Link href="/#projects" className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors">
            <span className="mr-2">←</span>
            <span>Back to Projects</span>
          </Link>
        </div>
        
        <h1 className="text-5xl font-bold mb-6 leading-tight text-foreground">{project.title}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Project image */}
          <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden border border-gray-300">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
              unoptimized={imageUrl && imageUrl.startsWith('/api/')} // Don't optimize API images
            />
          </div>
          
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-700 border border-primary-200 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Project link and Additional Information Link */}
            <div className="flex flex-wrap gap-4 mb-8">
              {projectLink && (
                <a
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-200 hover:border-primary-300 transition-all duration-300 hover:scale-105 group"
                >
                  <span>View Project</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
              
              {additionalInfoLink && (
                <a
                  href={additionalInfoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-200 hover:text-gray-800 transition-all duration-300"
                >
                  <span>Additional Information</span>
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
            </div>
            
            {/* Full content */}
            <div className="prose max-w-none">
              <SerializedRichText data={project.content} />
            </div>
          </div>
        </div>
        
        {/* Back to projects link */}
        <div className="mt-12 border-t border-gray-300 pt-8">
          <Link
            href="/#projects"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-200 hover:text-gray-800 transition-all duration-300"
          >
            <span>View All Projects</span>
          </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    return (
      <div className="w-full">
        <div className="container mx-auto p-8 pb-20 sm:p-20">
          <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Error</h1>
        <p className="text-center text-gray-500">An error occurred while loading the project.</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto text-gray-800">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
        <div className="mt-8 text-center">
          <Link href="/#projects" className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 border border-primary-200 rounded-xl hover:bg-primary-200 hover:border-primary-300 transition-all duration-300 hover:scale-105">
            <span>Back to Projects</span>
          </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default ProjectPage;
