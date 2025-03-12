import { getPayload } from "@/app/lib/payload";
import { ClientProjectsProvider } from "./ClientProjectsProvider";

// Fallback projects in case there are no projects in the database
const fallbackProjects = [
  {
    "id": "yelp-dataset-challenge",
    "title": "Yelp Dataset Challenge: Identifying Influential Users",
  },
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

// Use stable cache with revalidation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// This is a server component that fetches the data
const ProjectsProvider = async ({ children }) => {
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
      depth: 2 // Increase depth to get related media and its fields
    });
    
    if (result && result.docs && result.docs.length > 0) {
      // Map the database projects with more details
      projects = result.docs.map(post => ({
        id: post.id,
        title: post.title || 'Untitled Project',
        content: post.content,
        image: post.image,
        link: post.link,
        additionalInfoLink: post.additionalInfoLink,
        cards: post.cards
      }));
    } else {
      projects = fallbackProjects;
    }
  } catch (error) {
    console.error("Error fetching projects for dropdown:", error);
    projects = fallbackProjects;
  }
  
  // Pass the fetched data to the client component
  return (
    <ClientProjectsProvider projects={projects}>
      {children}
    </ClientProjectsProvider>
  );
};

export default ProjectsProvider;
