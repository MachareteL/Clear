// middleware.ts
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request, response) {
  // console.log(request.nextUrl.pathname.replace('/produtos/', ''));
  let teste = request.nextUrl.pathname.replace('/produtos', '')
  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/produtos/:path*',
}