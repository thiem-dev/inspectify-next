import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  console.log('middleware');

  console.log(request.method);
  console.log(request.url);
}
