import { getPayload } from "/src/app/lib/payload";
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";
import ImageWithFallback from "../../components/ImageWithFallback";

// Add cache control to prevent caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const { postId } = resolvedParams;
  const payload = await getPayload();
  
  try {
    console.log('Fetching post with ID/type:', postId);
    
    let type = null;
    let posts;
    
    // Check if postId is directly a type (about/contact)
    if (postId === "about" || postId === "contact") {
      type = postId;
      console.log('PostId is a type:', type);
    } 
    // Otherwise check if it's a numeric ID that maps to a type
    else if (postId === "1") {
      type = "about";
      console.log('PostId 1 maps to type: about');
    } 
    else if (postId === "2") {
      type = "contact";
      console.log('PostId 2 maps to type: contact');
    }
    
    // If we have a type, query by type
    if (type) {
      console.log('Querying by type:', type);
      posts = await payload.find({
        collection: "posts",
        where: {
          type: {
            equals: type
          }
        },
        depth: 2 // Increase depth to get related media and its fields
      });
      console.log(`Found ${posts?.docs?.length || 0} posts by type:`, type);
    } 
    // Otherwise try to find by ID
    else {
      console.log('Querying by ID:', postId);
      posts = await payload.find({
        collection: "posts",
        where: {
          id: {
            equals: postId
          }
        },
        depth: 2 // Increase depth to get related media and its fields
      });
      console.log(`Found ${posts?.docs?.length || 0} posts by ID:`, postId);
    }

    console.log("Posts query result:", posts);

    if (!posts?.docs?.length) {
      console.log("No post found for ID/type:", postId);
      return (
      <div className="w-full pt-16 md:pt-24">
        <div className="container mx-auto p-4 pb-12 sm:p-12">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-gray-200 shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
            <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Page not found</h1>
            <p className="text-center text-gray-500">The requested page could not be found.</p>
          </div>
        </div>
      </div>
      );
    }

    const post = posts.docs[0];
    console.log("Post data:", post);

    return (
      <div className="w-full pt-16 md:pt-24">
        <div className="container mx-auto p-4 pb-12 sm:p-12">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-gray-200 shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
            <h1 className="text-5xl font-bold mb-5 leading-normal text-center">{post.title}</h1>
            <div className="prose max-w-none">
            <SerializedRichText
              className="payload-richtext"
              data={post.content}
            />
          </div>
          
          {/* Display post image if available */}
          {post.image && post.image.url && (
            <div className="mt-8">
              <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-300">
                <ImageWithFallback
                  src={post.image.url}
                  alt={post.image.alt || post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover w-auto h-auto"
                  priority
                />
              </div>
            </div>
          )}
          
          {/* Display card images if available */}
          {post.cards && post.cards.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.cards.map((card, index) => (
                card.image && card.image.url && (
                  <div key={index} className="relative">
                    <div className="relative h-[300px] rounded-xl overflow-hidden border border-gray-300">
                      <ImageWithFallback
                        src={card.image.url}
                        alt={card.image.alt || card.title || `Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover w-auto h-auto"
                      />
                    </div>
                    {card.title && (
                      <h3 className="mt-3 text-lg font-medium text-foreground">{card.title}</h3>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="w-full pt-16 md:pt-24">
        <div className="container mx-auto p-4 pb-12 sm:p-12">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-gray-200 shadow-lg rounded-lg overflow-hidden p-4 sm:p-6 md:p-8">
            <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Error</h1>
            <p className="text-center text-gray-500">An error occurred while loading the page.</p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-4 p-4 bg-gray-100 rounded-lg overflow-auto text-gray-800">
                {JSON.stringify(error, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
