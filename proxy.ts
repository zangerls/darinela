import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const PASSWORD = "darinela";
const COOKIE = "auth";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname === "/login") return NextResponse.next();

    if (req.cookies.get(COOKIE)?.value !== PASSWORD) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return intlMiddleware(req);
}

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
