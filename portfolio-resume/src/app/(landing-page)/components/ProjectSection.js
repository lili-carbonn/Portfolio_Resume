import ProjectCards from "./ProjectCards";
import { getPayload } from "@/app/lib/payload";
import AnimatedSectionTitle from "./AnimatedSectionTitle";

// Add cache control to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Fallback projects in case there are no projects in the database
const fallbackProjects = [
  {
    "id": "fallback1",
    "title": "Multithreaded Concurrency Examples",
    "tags": ["C", "Multithreading", "Concurrency", "POSIX", "Synchronization"],
    "description": "Demonstrates advanced multithreaded programming concepts in C with two simulations that showcase thread synchronization and deadlock prevention.",
    "fullDescription": "This project contains two C programs that demonstrate advanced multithreaded programming concepts. The first program (shoeElection.c) simulates different types of shoes taking turns on a stage in a round-robin fashion, using mutexes and condition variables for synchronization. The second program (FedOops.c) simulates a package processing system with colored teams of workers processing packages through various stations, using semaphores to prevent deadlocks by implementing an all-or-nothing resource acquisition strategy.",
    "image": "/Example_Image_OS_Project.jpeg",
    "techStack": ["C", "POSIX Threads", "POSIX Semaphores", "Mutexes", "Condition Variables"],
    "link": "https://github.com/lili-carbonn/OS_Simulation_Project_Public"
  },
  {
    "id": "fallback2",
    "title": "NSF REU: Materials Research with Data Science",
    "tags": ["Machine Learning", "Computer Vision", "Materials Science", "Data Science", "Microscopy"],
    "description": "Used machine learning and computer vision to analyze Transmission Electron Microscopy (TEM) scans of plant cellulose synthesis complex (CSC).",
    "fullDescription": "Participated in an NSF REU program focused on applying data science to materials research. Implemented YOLO (You Only Look Once) to detect and classify structural components in microscopic images. Developed skills in data preprocessing, model optimization, and scientific communication. Presented findings at a research symposium.",
    "image": "/Yolov9segPred.jpeg",
    "techStack": ["Python", "YOLO", "RoboFlow", "OpenCV", "MATLAB"],
    "link": "https://mse.ncsu.edu/reu/past/"
  },
  {
    "id": "fallback3",
    "title": "Interactive Qualifying Project (IQP) – Mental Health in Emergency Services",
    "tags": ["Mental Health", "Data Analysis", "Interdisciplinary Research", "Public Health", "Emergency Services"],
    "description": "Analyzed mental health programs for emergency service workers in Victoria, Australia, through interdisciplinary research and data analysis.",
    "fullDescription": "Worked with an interdisciplinary team to evaluate mental health programs for emergency service workers in Victoria, Australia. Collaborated with students from biology, psychology, and engineering, as well as faculty from sociology, chemistry, and management. Conducted interviews and performed data analysis to identify patterns and gaps in support services. Provided recommendations for improving mental health resources in emergency service organizations.",
    "image": "/ESF-WPI-Project-2024-GR-Final.jpg",
    "techStack": ["Python", "R", "Qualtrics"],
    "link": "https://digital.wpi.edu/concern/student_works/sq87c0237?locale=en"
  },
  {
    "id": "fallback4",
    "title": "3D Sphere Animation with WebGL",
    "tags": ["WebGL", "JavaScript", "3D Graphics", "Animation"],
    "description": "A 3D sphere that animates along a curve path using WebGL.",
    "fullDescription": "This project demonstrates a 3D sphere that can animate along a curve path using WebGL. It features multiple lighting modes (lit or wireframe), shading modes (flat or Phong), and interactive camera controls. The curve path is generated using Chaikin's corner cutting algorithm with adjustable subdivision levels.",
    "image": "/Orb_Example_Image.png",
    "techStack": ["JavaScript", "WebGL", "GLSL", "HTML5", "CSS3"],
    "link": "https://github.com/lili-carbonn/Render_Orb_Spinning_Public"
  }
];

const ProjectSection = async () => {
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
      }
    });
    
    if (result && result.docs && result.docs.length > 0) {
      console.log(`Found ${result.docs.length} projects in the database`);
      
      // Log the raw data from the database for debugging
      try {
        console.log("Raw project data from database:", JSON.stringify(result.docs, null, 2));
      } catch (e) {
        console.error("Error stringifying project data:", e);
      }
      
      // Helper function to extract text from rich text content
      const extractTextFromRichText = (richText) => {
        if (!richText) return '';
        
        try {
          // If it's already a string, return it
          if (typeof richText === 'string') return richText.replace(/<[^>]*>/g, '');
          
          // If it's an object with a root property (Lexical format)
          if (richText.root && richText.root.children) {
            // Extract text from all paragraphs
            return richText.root.children
              .filter(child => child.children)
              .flatMap(child => 
                child.children
                  .filter(textNode => textNode.text)
                  .map(textNode => textNode.text)
              )
              .join(' ');
          }
          
          // Fallback to JSON stringify
          return JSON.stringify(richText);
        } catch (e) {
          console.error('Error extracting text from rich text:', e);
          return 'Error extracting text';
        }
      };
      
      // Map the database projects to the format expected by ProjectCards
      projects = result.docs.map(post => {
        // Initialize tags array
        let tags = ['Project']; // Default tag
        
        // Use the first card's data if available
        if (post.cards && post.cards.length > 0) {
          const card = post.cards[0];
          
          // Process image URL from the card
          let imageUrl = '/placeholder.jpg';
          if (card.image) {
            // For Media collection items, we need to use the URL directly
            // The image is a reference to a Media collection item
            imageUrl = card.image.url || '/placeholder.jpg';
            
            // Keep the API URL as is - Next.js will handle it
          }
          
          // Add tags from card image if available
          if (card.image && card.image.tags && card.image.tags.length > 0) {
            // Extract tags from the media collection
            const mediaTags = card.image.tags.map(tagObj => tagObj.tag || tagObj).filter(Boolean);
            if (mediaTags.length > 0) {
              tags = [...tags, ...mediaTags];
            }
          }
          
          return {
            id: post.id || `db-${Math.random().toString(36).substr(2, 9)}`,
            title: card.title || post.title || 'Untitled Project',
            description: extractTextFromRichText(card.description) || 'No description available',
            fullDescription: extractTextFromRichText(post.content) || 'No detailed description available',
            image: imageUrl,
            tags: tags,
            link: (post.link && typeof post.link === 'string') 
              ? post.link 
              : (post.link && post.link.root) 
                ? extractTextFromRichText(post.link) 
                : (card && card.link) 
                  ? extractTextFromRichText(card.link) 
                  : '#',
            additionalInfoLink: post.additionalInfoLink || ''
          };
        } else {
          // Fallback to post data if no cards
          let imageUrl = '/placeholder.jpg';
          if (post.image) {
            // For Media collection items, we need to use the URL directly
            // The image is a reference to a Media collection item
            imageUrl = post.image.url || '/placeholder.jpg';
            
            // Keep the API URL as is - Next.js will handle it
          }
          
          // Add tags from post image if available (only if no card image tags were found)
          if (post.image && post.image.tags && post.image.tags.length > 0 && tags.length <= 1) {
            const postImageTags = post.image.tags.map(tagObj => tagObj.tag || tagObj).filter(Boolean);
            if (postImageTags.length > 0) {
              tags = [...tags, ...postImageTags];
            }
          }
          
          return {
            id: post.id || `db-${Math.random().toString(36).substr(2, 9)}`,
            title: post.title || 'Untitled Project',
            description: extractTextFromRichText(post.briefDescription) || 'No description available',
            fullDescription: extractTextFromRichText(post.content) || 'No detailed description available',
            image: imageUrl,
            tags: tags,
            link: (post.link && typeof post.link === 'string') 
              ? post.link 
              : (post.link && post.link.root) 
                ? extractTextFromRichText(post.link) 
                : '#',
            additionalInfoLink: post.additionalInfoLink || ''
          };
        }
      });
      
      try {
        console.log("Processed projects:", JSON.stringify(projects, null, 2));
      } catch (e) {
        console.error("Error stringifying processed projects:", e);
      }
    } else {
      console.log("No projects found in the database, using fallback projects");
      projects = fallbackProjects;
    }
  } catch (error) {
    console.error("Error fetching projects from database:", error);
    console.log("Using fallback projects due to database error");
    projects = fallbackProjects;
  }
  
  return (
    <section
      id="projects"
      className="px-4 pt-20 pb-40 sm:px-8 lg:px-16 bg-gradient-to-b from-transparent to-primary-50/30"
    >
      <AnimatedSectionTitle>
        Featured Projects
      </AnimatedSectionTitle>
      <ProjectCards projects={projects} />
    </section>
  );
};

export default ProjectSection;
