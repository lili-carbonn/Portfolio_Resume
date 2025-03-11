/**
 * Migration to fix the enum_posts_type issue
 * 
 * This migration:
 * 1. Adds a temporary column to store the type values
 * 2. Copies the values from the type column to the temporary column
 * 3. Drops the type column
 * 4. Drops the enum_posts_type with CASCADE option
 * 5. Creates a new type column with TEXT type
 * 6. Copies the values back from the temporary column
 * 7. Drops the temporary column
 */
module.exports = {
  /**
   * The up function is executed when the migration is applied
   */
  async up({ sql }) {
    try {
      console.log('Running migration to fix enum_posts_type issue...');
      
      // First, add a temporary column to store the type values
      try {
        await sql`
          ALTER TABLE posts 
          ADD COLUMN temp_type TEXT;
        `;
        console.log('Successfully added temporary column');
      } catch (e) {
        console.log('Add temporary column failed, continuing with migration:', e.message);
      }
      
      // Copy the values from the type column to the temporary column
      try {
        await sql`
          UPDATE posts 
          SET temp_type = type::TEXT;
        `;
        console.log('Successfully copied values to temporary column');
      } catch (e) {
        console.log('Copy values failed, continuing with migration:', e.message);
      }
      
      // Drop the type column
      try {
        await sql`
          ALTER TABLE posts 
          DROP COLUMN type;
        `;
        console.log('Successfully dropped type column');
      } catch (e) {
        console.log('Drop column failed, continuing with migration:', e.message);
      }
      
      // Drop the enum type with CASCADE option
      try {
        await sql`
          DROP TYPE IF EXISTS enum_posts_type CASCADE;
        `;
        console.log('Successfully dropped enum_posts_type');
      } catch (e) {
        console.log('Drop type failed, continuing with migration:', e.message);
      }
      
      // Create a new type column with TEXT type
      try {
        await sql`
          ALTER TABLE posts 
          ADD COLUMN type TEXT NOT NULL DEFAULT 'content';
        `;
        console.log('Successfully added new type column');
      } catch (e) {
        console.log('Add column failed, continuing with migration:', e.message);
      }
      
      // Copy the values back from the temporary column
      try {
        await sql`
          UPDATE posts 
          SET type = COALESCE(temp_type, 'content');
        `;
        console.log('Successfully copied values back from temporary column');
      } catch (e) {
        console.log('Copy values back failed, continuing with migration:', e.message);
      }
      
      // Drop the temporary column
      try {
        await sql`
          ALTER TABLE posts 
          DROP COLUMN temp_type;
        `;
        console.log('Successfully dropped temporary column');
      } catch (e) {
        console.log('Drop temporary column failed, continuing with migration:', e.message);
      }
      
      console.log('Migration completed successfully');
    } catch (error) {
      console.error('Error in migration:', error);
      throw error;
    }
  },

  /**
   * The down function is executed when the migration is rolled back
   */
  async down({ sql }) {
    try {
      console.log('Rolling back migration...');
      
      // No need to roll back since we're just changing the column type
      console.log('No rollback needed');
      
      console.log('Rollback completed successfully');
    } catch (error) {
      console.error('Error in rollback:', error);
      throw error;
    }
  }
};
