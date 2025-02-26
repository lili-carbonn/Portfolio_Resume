import { getPayload } from "/src/app/lib/payload";
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";

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
        }
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
        }
      });
      console.log(`Found ${posts?.docs?.length || 0} posts by ID:`, postId);
    }

    console.log("Posts query result:", posts);

    if (!posts?.docs?.length) {
      console.log("No post found for ID/type:", postId);
      return (
        <div className="container mx-auto p-8 pb-20 sm:p-20">
          <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Page not found</h1>
          <p className="text-center text-gray-400">The requested page could not be found.</p>
        </div>
      );
    }

    const post = posts.docs[0];
    console.log("Post data:", post);

    return (
      <div className="container mx-auto p-8 pb-20 sm:p-20">
        <h1 className="text-5xl font-bold mb-5 leading-normal text-center">{post.title}</h1>
        <div className="prose prose-invert max-w-none">
          <SerializedRichText
            className="payload-richtext"
            data={post.content}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="container mx-auto p-8 pb-20 sm:p-20">
        <h1 className="text-5xl font-bold mb-5 leading-normal text-center">Error</h1>
        <p className="text-center text-gray-400">An error occurred while loading the page.</p>
        {process.env.NODE_ENV === 'development' && (
          <pre className="mt-4 p-4 bg-gray-800 rounded-lg overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    );
  }
};

export default Page;
