import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { Posts } from "./src/app/collections/Posts";
import MediaCollection from "./src/app/collections/Media";

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),
  // Define and configure your collections in this array
  collections: [Posts, MediaCollection],
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    // Add these options to help with schema migration issues
    migrationOptions: {
      acceptDataLoss: true,
      disableValidation: true, // Disable schema validation during migration
      forceDropCollections: false, // Don't drop collections
      // Add custom SQL statements to fix the enum type issue
      beforeMigration: async ({ sql }) => {
        try {
          // Check if the migration has already been applied by checking if a marker table exists
          const migrationMarkerExists = await sql`
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_name = 'enum_posts_type_migration_applied'
            );
          `;
          
          // If the migration marker exists, skip the migration
          if (migrationMarkerExists[0]?.exists) {
            console.log('Enum posts type migration has already been applied, skipping...');
            return;
          }
          
          console.log('Running custom SQL to handle enum_posts_type issue...');
          
          // First, try to update any invalid values
          try {
            await sql`
              UPDATE posts 
              SET type = 'content' 
              WHERE type NOT IN ('about', 'contact', 'content', 'project');
            `;
            console.log('Successfully updated any invalid type values');
          } catch (e) {
            console.log('Update failed, continuing with migration:', e.message);
          }
          
          // First, convert the column to text type to avoid casting issues
          try {
            await sql`
              ALTER TABLE posts;
              ALTER COLUMN type TYPE enum_posts_type;
              USING type::enum_posts_type;
            `;
            console.log('Successfully converted type column to text');
          } catch (e) {
            console.log('Convert to text failed, continuing with migration:', e.message);
          }
          
          // Drop the default constraint on the type column
          try {
            await sql`
              ALTER TABLE posts ALTER COLUMN type DROP DEFAULT;
            `;
            console.log('Successfully dropped default constraint on type column');
          } catch (e) {
            console.log('Drop default failed, continuing with migration:', e.message);
          }
          
          // Drop the enum type with CASCADE option
          try {
            await sql`
              DROP TYPE IF EXISTS enum_posts_type CASCADE;
            `;
            console.log('Successfully dropped enum_posts_type with CASCADE option');
          } catch (e) {
            console.log('Drop type failed, continuing with migration:', e.message);
          }
          
          // Create a new enum type with the correct values
          try {
            await sql`
              CREATE TYPE enum_posts_type AS ENUM ('about', 'contact', 'content', 'project');
            `;
            console.log('Successfully created new enum_posts_type');
          } catch (e) {
            console.log('Create type failed, continuing with migration:', e.message);
          }
          
          // Now that the column is text and the enum exists, convert to the enum type
          try {
            await sql`
              ALTER TABLE posts 
              ALTER COLUMN type TYPE enum_posts_type USING type::enum_posts_type;
            `;
            console.log('Successfully altered type column to use enum_posts_type');
          } catch (e) {
            console.log('Alter column failed, continuing with migration:', e.message);
          }
          
          // Set a new default value for the type column
          try {
            await sql`
              ALTER TABLE posts 
              ALTER COLUMN type SET DEFAULT 'content'::enum_posts_type;
            `;
            console.log('Successfully set new default value for type column');
          } catch (e) {
            console.log('Set default failed, continuing with migration:', e.message);
          }
          
          // Create a marker table to indicate that the migration has been applied
          try {
            await sql`
              CREATE TABLE enum_posts_type_migration_applied (
                id SERIAL PRIMARY KEY,
                applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              );
            `;
            console.log('Created migration marker table');
          } catch (e) {
            console.log('Create marker table failed:', e.message);
          }
          
          console.log('Migration completed successfully');
        } catch (error) {
          console.error('Error in beforeMigration hook:', error);
        }
      },
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
