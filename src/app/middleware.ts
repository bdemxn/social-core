import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request, {
		cookieName: "session_token",
		cookiePrefix: "better-auth",
	})

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/feed", "/settings"],
}
