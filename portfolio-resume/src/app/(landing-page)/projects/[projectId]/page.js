import Link from "next/link";
import { getPayload } from "/src/app/lib/payload";
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";
import ImageWithFallback from "../../components/ImageWithFallback";

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
      },
      depth: 2 // Increase depth to get related media and its fields
    });

    console.log("Project query result:", posts);

    if (!posts?.docs?.length) {
      console.log("No project found for ID:", projectId);
      return (
      <div className="w-full pt-8 md:pt-12">
        <div className="container mx-auto p-4 pb-6 sm:p-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-gray-200 shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
              <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Project not found</h1>
              <p className="text-center text-gray-500">The requested project could not be found.</p>
            <div className="mt-8 text-center">
              <Link href="/#projects" className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-50 text-primary-700 border border-primary-200 rounded-lg shadow-md hover:bg-primary-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                <span className="mr-1">←</span>
                <span>Back to Projects</span>
              </Link>
            </div>
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
      console.log("Extracting tags from media:", media);
      if (!media || !media.tags || !media.tags.length) {
        console.log("No tags found in media");
        return [];
      }
      const tags = media.tags.map(tagObj => {
        console.log("Tag object:", tagObj);
        return tagObj.tag || tagObj;
      }).filter(Boolean);
      console.log("Extracted tags:", tags);
      return tags;
    };

    // Fallback projects with known image paths
    const fallbackProjects = [
      {
        "id": "yelp-dataset-challenge",
        "title": "Yelp Dataset Challenge: Identifying Influential Users",
        "tags": ["Graph Neural Networks", "Machine Learning", "Social Network Analysis", "Python", "PyTorch Geometric", "Sentence-BERT"],
        "description": "This project implements a graph-based machine learning approach to identify influential users on Yelp.",
        "fullDescription": "This project implements a graph-based machine learning approach to identify influential users on Yelp. Users and businesses are represented as nodes, with reviews forming edges in a heterogeneous graph. The model leverages Sentence-BERT embeddings for text analysis, network centrality metrics, and sentiment features. A Graph Convolutional Network (GCN) serves as a baseline, while an enhanced Graph Attention Network (GAT) improves accuracy by incorporating multi-head attention. The study demonstrates that integrating multiple feature types significantly enhances prediction accuracy, reaching 81% in classifying influential users.",
        "image": "/embeddings_visualization.webp",
        "techStack": ["Python", "PyTorch", "PyTorch Geometric", "Sentence-BERT", "NetworkX", "Scikit-learn"],
        "link": "https://github.com/lili-carbonn/yelp-dataset-challenge"
      },
      {
        "id": "fallback1",
        "title": "Multithreaded Concurrency Examples",
        "tags": ["C", "Multithreading", "Concurrency", "POSIX", "Synchronization"],
        "description": "Demonstrates advanced multithreaded programming concepts in C with two simulations that showcase thread synchronization and deadlock prevention.",
        "fullDescription": "This project contains two C programs that demonstrate advanced multithreaded programming concepts. The first program (shoeElection.c) simulates different types of shoes taking turns on a stage in a round-robin fashion, using mutexes and condition variables for synchronization. The second program (FedOops.c) simulates a package processing system with colored teams of workers processing packages through various stations, using semaphores to prevent deadlocks by implementing an all-or-nothing resource acquisition strategy.",
        "image": "/Example_Image_OS_Project.webp",
        "techStack": ["C", "POSIX Threads", "POSIX Semaphores", "Mutexes", "Condition Variables"],
        "link": "https://github.com/lili-carbonn/OS_Simulation_Project_Public"
      },
      {
        "id": "fallback2",
        "title": "NSF REU: Materials Research with Data Science",
        "tags": ["Machine Learning", "Computer Vision", "Materials Science", "Data Science", "Microscopy"],
        "description": "Used machine learning and computer vision to analyze Transmission Electron Microscopy (TEM) scans of plant cellulose synthesis complex (CSC).",
        "fullDescription": "Participated in an NSF REU program focused on applying data science to materials research. Implemented YOLO (You Only Look Once) to detect and classify structural components in microscopic images. Developed skills in data preprocessing, model optimization, and scientific communication. Presented findings at a research symposium.",
        "image": "/Yolov9segPred.webp",
        "techStack": ["Python", "YOLO", "RoboFlow", "OpenCV", "MATLAB"],
        "link": "https://mse.ncsu.edu/reu/past/"
      },
      {
        "id": "fallback3",
        "title": "Interactive Qualifying Project (IQP) – Mental Health in Emergency Services",
        "tags": ["Mental Health", "Data Analysis", "Interdisciplinary Research", "Public Health", "Emergency Services"],
        "description": "Analyzed mental health programs for emergency service workers in Victoria, Australia, through interdisciplinary research and data analysis.",
        "fullDescription": "Worked with an interdisciplinary team to evaluate mental health programs for emergency service workers in Victoria, Australia. Collaborated with students from biology, psychology, and engineering, as well as faculty from sociology, chemistry, and management. Conducted interviews and performed data analysis to identify patterns and gaps in support services. Provided recommendations for improving mental health resources in emergency service organizations.",
        "image": "/ESF-WPI-Project-2024-GR-Final.webp",
        "techStack": ["Python", "R", "Qualtrics"],
        "link": "https://digital.wpi.edu/concern/student_works/sq87c0237?locale=en"
      },
      {
        "id": "fallback4",
        "title": "3D Sphere Animation with WebGL",
        "tags": ["WebGL", "JavaScript", "3D Graphics", "Animation"],
        "description": "A 3D sphere that animates along a curve path using WebGL.",
        "fullDescription": "This project demonstrates a 3D sphere that can animate along a curve path using WebGL. It features multiple lighting modes (lit or wireframe), shading modes (flat or Phong), and interactive camera controls. The curve path is generated using Chaikin's corner cutting algorithm with adjustable subdivision levels.",
        "image": "/Orb_Example_Image.webp",
        "techStack": ["JavaScript", "WebGL", "GLSL", "HTML5", "CSS3"],
        "link": "https://github.com/lili-carbonn/Render_Orb_Spinning_Public"
      }
    ];
    
    // Try to find a matching fallback project by title
    console.log("Project title:", project.title);
    
    // Find a fallback project that matches the title
    const fallbackProject = fallbackProjects.find(fallback => {
      if (!project.title || !fallback.title) return false;
      
      const projectTitle = project.title.toLowerCase();
      const fallbackTitle = fallback.title.toLowerCase();
      
      return projectTitle.includes(fallbackTitle) || fallbackTitle.includes(projectTitle);
    }) || fallbackProjects[4]; // Default to the last fallback project
    
    // Extract tags from project image or card image
    let tags = fallbackProject.tags || ['Project']; // Use fallback tags if available
    
    // Add tags from card image if available
    if (project.cards && project.cards.length > 0 && project.cards[0].image) {
      const cardImageTags = extractTags(project.cards[0].image);
      if (cardImageTags.length > 0) {
        // Add unique tags only
        cardImageTags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
    } 
    // Otherwise add tags from project image if available
    else if (project.image) {
      const projectImageTags = extractTags(project.image);
      if (projectImageTags.length > 0) {
        // Add unique tags only
        projectImageTags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
    }
    
    // Get the image URL
    let imageUrl = '/Orb_Example_Image.webp'; // Default fallback
    
    // If we found a matching fallback, use its image
    if (fallbackProject) {
      imageUrl = fallbackProject.image;
    }
    // Otherwise try to get the image from the project data
    else {
      // First try to get the image from the card
      if (project.cards && project.cards.length > 0 && project.cards[0].image) {
        if (project.cards[0].image.url) {
          // Extract the filename from the URL
          const urlParts = project.cards[0].image.url.split('/');
          const filename = urlParts[urlParts.length - 1];
          
          // Use the direct path to the public directory
          imageUrl = `/${filename}`;
        }
      } 
      // If no card image, try the post image
      else if (project.image) {
        if (project.image.url) {
          // Extract the filename from the URL
          const urlParts = project.image.url.split('/');
          const filename = urlParts[urlParts.length - 1];
          
          // Use the direct path to the public directory
          imageUrl = `/${filename}`;
        }
      }
    }
    
    console.log("Using image URL:", imageUrl);
    console.log("Project cards:", project.cards);
    console.log("Project image:", project.image);

    // Determine special styling based on project type
    const projectType = project.title ? project.title.toLowerCase() : '';
    const isYelp = projectType.includes('yelp');
    const isConcurrency = projectType.includes('concurrency') || projectType.includes('thread');
    const isResearch = projectType.includes('research') || projectType.includes('reu');
    const isIQP = projectType.includes('iqp') || projectType.includes('qualifying');
    const isWebGL = projectType.includes('webgl') || projectType.includes('3d');
    
    // Special styling classes based on project type
    const pageBgClass = isYelp 
      ? "bg-gradient-to-br from-purple-50 via-primary-50 to-amber-50" 
      : isConcurrency 
        ? "bg-gradient-to-br from-blue-50 via-primary-50 to-purple-50"
        : isResearch
          ? "bg-gradient-to-br from-green-50 via-primary-50 to-blue-50"
          : isIQP
            ? "bg-gradient-to-br from-amber-50 via-primary-50 to-red-50"
            : isWebGL
              ? "bg-gradient-to-br from-indigo-50 via-primary-50 to-purple-50"
              : "bg-gradient-to-br from-primary-50 to-primary-100";
    
    // Animation classes
    const titleAnimClass = "animate-fade-in-down";
    const contentAnimClass = "animate-fade-in";
    const imageAnimClass = "animate-scale-in";
    
    return (
      <div className="w-full pt-8 md:pt-12">
        <div className="container mx-auto p-4 pb-6 sm:p-6">
          <div className={`${pageBgClass} border border-gray-200 shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 transition-all duration-500 hover:shadow-xl`}>
            <div className="mb-4">
              <Link href="/#projects" className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-50 text-primary-700 border border-primary-200 rounded-lg shadow-md hover:bg-primary-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="mr-1">←</span>
                <span>Back to Projects</span>
              </Link>
            </div>
            
            <h1 className={`text-2xl font-bold mb-6 leading-tight text-foreground ${titleAnimClass}`}>{project.title}</h1>
            
            {/* Decorative element */}
            <div className="relative h-1 w-32 mx-auto mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-primary-400 to-amber-300 animate-gradient-x"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
              {/* Project image */}
              <div className={`relative h-[200px] sm:h-[300px] transform transition-all duration-500 hover:scale-[1.02] ${imageAnimClass}`}>
                <ImageWithFallback
                  src={imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain w-auto h-auto"
                  priority
                  unoptimized={true}
                />
              </div>
              
              <div>
                {/* Tags */}
                <div className={`flex flex-wrap gap-2 mb-4 ${contentAnimClass}`}>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm rounded-full bg-primary-50 text-primary-700 border border-primary-200 backdrop-blur-sm shadow-sm transform transition-all duration-300 hover:scale-110 hover:shadow-md"
                      style={{ animationDelay: `${index * 100 + 300}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Full content */}
                <div className={`prose max-w-none text-l flex flex-wrap gap-2 mb-4 ${contentAnimClass}`}>
                  <SerializedRichText data={project.content} />
                </div>
                {/* Project link and Additional Information Link */}
                <div className={`flex flex-wrap gap-4 mb-4 ${contentAnimClass}`} style={{ animationDelay: '800ms' }}>
                  {projectLink && (
                    <a
                      href={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-700 border border-primary-200 rounded-xl shadow-md hover:bg-primary-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
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
                      className="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-700 border border-gray-300 rounded-xl shadow-md hover:bg-gray-200 hover:text-gray-800 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <span>Additional Information</span>
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching project:", error);
    return (
      <div className="w-full pt-8 md:pt-12">
        <div className="container mx-auto p-4 pb-6 sm:p-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-gray-200 shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
            <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Error</h1>
            <p className="text-center text-gray-500">An error occurred while loading the project.</p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto text-gray-800">
                {JSON.stringify(error, null, 2)}
              </pre>
            )}
            <div className="mt-8 text-center">
              <Link href="/#projects" className="inline-flex items-center px-3 py-1.5 text-sm bg-primary-50 text-primary-700 border border-primary-200 rounded-lg shadow-md hover:bg-primary-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300">
                <span className="mr-1">←</span>
                <span>Back to Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProjectPage;
