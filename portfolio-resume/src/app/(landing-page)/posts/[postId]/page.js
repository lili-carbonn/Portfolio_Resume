import { getPayload } from "/src/app/lib/payload";
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";

const Page = async ({ params }) => {
  const { postId } = params;
  const payload = await getPayload();
  
  try {
    console.log('Fetching post with ID/type:', postId);
    
    // Try to find by ID first
    let posts = await payload.find({
      collection: "posts",
      where: {
        id: {
          equals: postId
        }
      }
    });

    // If not found by ID, try to find by type
    if (!posts?.docs?.length) {
      const type = postId === "1" ? "about" : postId === "2" ? "contact" : null;
      if (type) {
        posts = await payload.find({
          collection: "posts",
          where: {
            type: {
              equals: type
            }
          }
        });
      }
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
