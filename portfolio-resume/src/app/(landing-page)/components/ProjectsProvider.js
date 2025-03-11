import { getPayload } from "@/app/lib/payload";
import Header from "./Header";

// Fallback projects in case there are no projects in the database
const fallbackProjects = [
  {
    "id": "fallback1",
    "title": "Multithreaded Concurrency Examples",
  },
  {
    "id": "fallback2",
    "title": "NSF REU: Materials Research with Data Science",
  },
  {
    "id": "fallback3",
    "title": "Interactive Qualifying Project (IQP)",
  },
  {
    "id": "fallback4",
    "title": "3D Sphere Animation with WebGL",
  }
];

// Add cache control to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ProjectsProvider = async () => {
  let projects = [];
  
  try {
    // Try to fetch projects from the database
    const payload = await getPayload();
    
    // Query for posts with type "project"
    const result = await payload.find({
      collection: 'posts',
      where: {
        type: {
          equals: 'project'
        }
      },
      depth: 0 // Reduce depth to improve performance
    });
    
    if (result && result.docs && result.docs.length > 0) {
      // Map the database projects to just id and title
      projects = result.docs.map(post => ({
        id: post.id,
        title: post.title || 'Untitled Project'
      }));
    } else {
      projects = fallbackProjects;
    }
  } catch (error) {
    console.error("Error fetching projects for dropdown:", error);
    projects = fallbackProjects;
  }
  
  return <Header projects={projects} />;
};

export default ProjectsProvider;
