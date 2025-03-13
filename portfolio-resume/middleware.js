import { NextResponse } from 'next/server';

// Simplified middleware that just passes through all requests
export function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all image file extensions
    '/(.*)\\.(?:jpg|jpeg|png|webp|gif|svg)$',
    // Match uploads directory
    '/uploads/:path*'
  ],
};
