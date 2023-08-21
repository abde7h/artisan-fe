import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookie } from "cookies-next";

// export const config = {
//   matcher: ["/"]
// };

export function middleware(request: NextRequest) {
  // let url = request.nextUrl.clone();

  // const userLogged = getCookie("userLogged");
  // console.log("Desde Middleware: " + userLogged)
  // console.log(url)
  // if (!userLogged && url.pathname === "/") {
  //   return NextResponse.rewrite(new URL('/login', request.url))
  // }

  // if (!userLogged && (url.pathname === "/login" || url.pathname === "/register")) {
  //   return NextResponse.next();
  // }

  // if (userLogged && (url.pathname === "/login" || url.pathname === "/register")) {
    // //return NextResponse.rewrite(new URL('/', request.url));
  //   url.pathname = "/"
  //   return NextResponse.redirect(url);
  // }

  // if (!userLogged && url.pathname.startsWith("/") ) {
  //   //return NextResponse.rewrite(new URL('/login', request.url));
  //   // url.href = "http://localhost:3000/login"
  //   // url.pathname = "/login"
  //   return NextResponse.rewrite(new URL('/login', request.url))
  // }

  return NextResponse.next();
  
}