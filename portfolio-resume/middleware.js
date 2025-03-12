import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function middleware(request) {
  // Check if the request is for a file in the uploads directory or a specific public file
  if (request.nextUrl.pathname.startsWith('/uploads/') || 
      request.nextUrl.pathname === '/20241225_160255.jpg') {
    const filePath = path.join(process.cwd(), request.nextUrl.pathname);
    
    // Check if the file exists
    try {
      await fs.promises.access(filePath);
      
      // If the file exists, let the request continue
      return NextResponse.next();
    } catch (error) {
      // If the file doesn't exist, try to find it in the public directory first
      if (request.nextUrl.pathname === '/20241225_160255.jpg') {
        const publicFilePath = path.join(process.cwd(), 'public', '20241225_160255.jpg');
        try {
          await fs.promises.access(publicFilePath);
          // If the file exists in public, let the request continue
          return NextResponse.next();
        } catch (error) {
          console.error('Error accessing file in public directory:', error);
        }
      }
      
      // If not found in public, try to find a similar file in uploads
      const filename = path.basename(request.nextUrl.pathname);
      const uploadsDir = path.join(process.cwd(), 'uploads');
      
      try {
        const files = await fs.promises.readdir(uploadsDir);
        
        // Look for a file with a similar name
        const similarFile = files.find(file => file.includes(filename.split('.')[0]));
        
        if (similarFile) {
          // Redirect to the similar file
          return NextResponse.redirect(new URL(`/uploads/${similarFile}`, request.url));
        }
      } catch (error) {
        console.error('Error reading uploads directory:', error);
      }
      
      // If no similar file is found, redirect to a fallback
      return NextResponse.redirect(new URL('/placeholders/placeholder-project.jpg', request.url));
    }
  }
  
  // For all other requests, continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/uploads/:path*', '/20241225_160255.jpg'],
};
