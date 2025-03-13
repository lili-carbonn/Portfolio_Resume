const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Helper function to serve image files
function serveImage(filePath, res) {
  // Determine the content type based on file extension
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'application/octet-stream';
  
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.webp':
      contentType = 'image/webp';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
  }

  // Stream the file
  res.setHeader('Content-Type', contentType);
  fs.createReadStream(filePath).pipe(res);
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Handle image requests
    if (pathname.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
      // Extract the filename from the path
      const filename = path.basename(pathname);
      console.log(`Processing image request for: ${filename}`);
      
      // Look for the image in the public directory
      const publicPath = path.join(__dirname, 'public', filename);
      
      fs.access(publicPath, fs.constants.F_OK, (publicErr) => {
        if (!publicErr) {
          // File exists in public, serve it
          console.log(`Serving image from public: ${publicPath}`);
          serveImage(publicPath, res);
          return;
        }
        
        // If not found, use the fallback
        console.log(`Image not found, using fallback`);
        // Try to find any of the available fallback images
        const fallbackOptions = [
          'Orb_Example_Image.webp',
          'Example_Image_OS_Project.webp',
          'embeddings_visualization.webp',
          'Yolov9segPred.webp'
        ];
        
        // Use the first fallback option
        const fallbackPath = path.join(__dirname, 'public', fallbackOptions[0]);
        
        fs.access(fallbackPath, fs.constants.F_OK, (fallbackErr) => {
          if (!fallbackErr) {
            // Fallback exists, serve it
            console.log(`Serving fallback image: ${fallbackPath}`);
            res.setHeader('Content-Type', 'image/webp');
            fs.createReadStream(fallbackPath).pipe(res);
          } else {
            // If even the fallback doesn't exist, let Next.js handle it
            console.log(`Fallback not found, using Next.js handler`);
            handle(req, res, parsedUrl);
          }
        });
      });
    } else {
      // For all other requests, let Next.js handle it
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
