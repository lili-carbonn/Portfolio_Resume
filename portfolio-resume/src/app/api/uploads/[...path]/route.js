import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    // Get the file path from the URL
    const filePath = params.path.join('/');
    
    // Construct the full path to the file
    const fullPath = path.join(process.cwd(), 'public', filePath);
    
    try {
      // Try to read the file
      const fileBuffer = await fs.readFile(fullPath);
      
      // Determine the content type based on file extension
      const ext = path.extname(fullPath).toLowerCase();
      let contentType = getContentType(ext);
      
      // Return the file with the appropriate content type
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (error) {
      // If the file doesn't exist, try to find the original file without size suffix
      console.error('Error reading file:', error);
      
      // Check if the filename has a size suffix like -150x150
      const filename = path.basename(filePath);
      const dirname = path.dirname(filePath);
      
      // If the filename has a size suffix, try to find the original file
      if (filename.match(/-\d+x\d+\.\w+$/)) {
        const originalFilename = filename.replace(/-\d+x\d+(\.\w+)$/, '$1');
        const originalFilePath = path.join(dirname, originalFilename);
        const originalFullPath = path.join(process.cwd(), 'public', originalFilePath);
        
        try {
          // Try to read the original file
          const originalFileBuffer = await fs.readFile(originalFullPath);
          
          // Determine the content type based on file extension
          const ext = path.extname(originalFullPath).toLowerCase();
          let contentType = getContentType(ext);
          
          // Return the original file with the appropriate content type
          return new NextResponse(originalFileBuffer, {
            headers: {
              'Content-Type': contentType,
              'Cache-Control': 'public, max-age=31536000, immutable',
            },
          });
        } catch (originalError) {
          console.error('Error reading original file:', originalError);
        }
      }
      
      // If we still can't find the file, return a 404
      return new NextResponse('File not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error serving file:', error);
    
    // If the file doesn't exist, return a 404
    return new NextResponse('File not found', { status: 404 });
  }
}

// Helper function to determine content type based on file extension
function getContentType(ext) {
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}
