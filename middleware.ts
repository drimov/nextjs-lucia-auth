import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { verifyRequestOrigin } from "lucia"

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    return NextResponse.next()
  }
  const originHeader = request.headers.get("Origin")
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get("X-Forwarded-Host")
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(undefined, {
      status: 403,
    })
  }
  return NextResponse.next()
}
