import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

interface AuthenticatedRequest extends NextRequest {
    user: {
      id: string;
    };
  }

let redirectToLogin = false;
export async function middleware(req: NextRequest) {
    let loggedIn: string | undefined;

    if (req.cookies.has("userLogged")) {
        loggedIn = req.cookies.get("userLogged")?.value;
    }

    if (req.cookies.has("artisanLogged")) {
        loggedIn = req.cookies.get("artisanLogged")?.value;
    }

    const response = NextResponse.next();

    if ((req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")) && (!loggedIn || redirectToLogin))
        return;

    // if (!loggedIn) {
    //     return NextResponse.redirect(new URL("/login", new URL(req.url)));
    // }

    if ((req.url.includes("/login") || req.url.includes("/register")) && loggedIn) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return response;
}

// export const config = {
//   matcher: ["/profile", "/login", "/api/users/:path*", "/api/auth/logout"],
// };
