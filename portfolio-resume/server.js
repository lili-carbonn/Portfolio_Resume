const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    // Handle requests to /uploads
    if (pathname.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, pathname);
      
      // Check if the file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          // If the file doesn't exist, let Next.js handle it
          handle(req, res, parsedUrl);
          return;
        }

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
