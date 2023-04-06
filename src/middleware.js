// middleware.ts
import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react';
// This function can be marked `async` if using `await` inside
export async function middleware(request, response) {
  const batida = await fetch('http://localhost:3000/api/firebase/getUser')
  const { user } = await batida.json()
  console.log('MIDDLEWARE');
  if (!user) {
    console.log("NÃO ESTÁ LOGADO MIDDLEWARE");
  }
  // console.log(user);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/firebase/firestore/:path*',
}